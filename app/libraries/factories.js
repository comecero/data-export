app.factory('appCache', ['$cacheFactory', function ($cacheFactory) {
  return $cacheFactory('appCache');
}]);

app.factory('fetchData', function (ApiService, $q, buildRootUrl) {
  var _cancel = function(scope) {
    if (angular.isFunction(scope.cancelFunc)) {
      scope.cancelFunc();
      scope.cancelFunc = undefined;
      return true;
    }
    return false;
  }

  return function(scope, options, datepicker) {
      var deferred = $q.defer();
      var url = buildRootUrl(options, datepicker);
      var success = null;
      if ( angular.isDefined(options.success) && options.success.length) {
        success = options.success == 'true';
      }
      var data = [];
      scope.cancelFunc = scope.$watch(function() {
        return url;
      }, function(next) {
        if (angular.isUndefined(next) || next == null) return;
        ApiService.getList(next).then(
          function(response) {
            var d = response.data;
            var next_page = d.next_page_url;
            if (angular.isArray(d.data)) {
              for (var i in d.data) {
                var row = d.data[i];
                if (typeof success == 'boolean') {
                  if (success != row.success) continue;
                }

                data.push(row);
              }
            }
            if (angular.isUndefined(next_page) || next_page == null) {
              deferred.resolve(data);
              _cancel(scope);
              return;
            }
            url = next_page;
          }, function(error) {
            _cancel(scope);
            deferred.reject(error);
          }
        );
      });
      return deferred.promise;
    };
  });

app.factory('buildRootUrl', function($httpParamSerializer) {
  return function(options, datepicker) {
    var query = {
      date_start: options.dates,
      date_end: options.dates,
      timezone: options.timezone
    };

    if (angular.isDefined(options.statusField) && options.statusField.length && angular.isDefined(options.status)) {
      query[options.statusField] = options.status;
    }

    if (angular.isDefined(options.currency_type) && angular.isDefined(options.currency_type)) {
      query['currency_type'] = options.currency_type;
    }

    if (angular.isArray(options.expand) && options.expand.length) {
      query['expand'] = options.expand.join(',');
    } else if (angular.isString(options.expand) && options.expand.length) {
      query['expand'] = options.expand;
    }

    // Override if necessary
    switch(options.dates) {
      case "last_30":
        query.date_start = -29;
        query.date_end = 0;
        break;
      case "last_7":
        query.date_start = -6;
        query.date_end = 0;
        break;
      case "custom":

        if (!datepicker.date_end) datepicker.date_end = new Date();
        if (!datepicker.date_start) datepicker.date_start = datepicker.date_end;

        query.date_start = datepicker.date_start.toISOString().substring(0, 10);
        query.date_end = datepicker.date_end.toISOString().substring(0, 10);
        break;
    }

    return '/' + options.dataset + '?' + $httpParamSerializer(query);
  };
});


app.factory('saveFile', function(FileSaver, Blob) {
  return function(name, type, text) {
    var data = new Blob([text], { type: type });
    FileSaver.saveAs(data, name);
  };
});

app.factory('toCSV', function() {
  var doOrderFeeSummary = function(row) {
    var items_count = row['items_count'];
    var item_subtotal = row['items.settlement_subtotal'];
    var subtotal = row['settlement_subtotal'];
    var fee_total = row['fee_summary.total']
    row['fees'] = subtotal != 0.00 ? fee_total*item_subtotal/subtotal : fee_total/items_count;
    row['fees_currency'] = row['fee_summary.currency'];
    for(var key in row) {
      if (key.match(/^fee_summary/)) delete row[key];
    }
  }
  var doOrderSplitOrderDiscount = function(row) {
    var fields = ['discount', 'settlement_discount'];
    var items_count = row['items_count'];
    var item_subtotal = row['items.settlement_subtotal'];
    var subtotal = row['settlement_subtotal'];
    var rate = subtotal != 0.00 ? item_subtotal/subtotal : 1/items_count;
    for (var idx in fields) {
      var field = fields[idx];
      var order_discount = row[field];
      var item_discount = row['items.' + field];
      row['adjusted_' + field] = item_discount + order_discount*rate;
    }
  }
  var doRebillInfo = function(row) {
    row['new_sub'] = row['subscription'] == null && row['items.subscription'] != null ? 'true' : 'false';
    row['rebill'] = row['subscription'] != null && row['items.subscription'] != null ? 'true' : 'false';
  }
  var doOrderCalcs = function(row, options) {
    if (options.expand.indexOf('fee_summary') >= 0) {
      doOrderFeeSummary(row);
    }
    doOrderSplitOrderDiscount(row);
    doRebillInfo(row);
  }

  var doCalcs = function(row, options) {
    if (options.dataset == 'orders')
      doOrderCalcs(row, options);
  }

  var mergeNestedObjects = function(parent) {
    if (angular.isArray(parent) || !angular.isObject(parent)) return;
    var keys = Object.keys(parent);
    for (var k in keys) {
      var key = keys[k];
      mergeNestedObjects(parent[key]);
    }

    var keys1 = Object.keys(parent);
    for (var k1 in keys1) {
      var key1 = keys1[k1];
      var value1 = parent[key1];
      if (angular.isArray(value1) || !angular.isObject(value1)) continue;
      var keys2 = Object.keys(value1);
      for (var k2 in keys2) {
        var key2 = keys2[k2];
        var value2 = value1[key2];
        parent[key1 + '.' + key2] = value2;
      }
      delete parent[key1];
    }
  };

  var to_csv = function(data, options) {
    var unraveled = [];
    // Unravel items if present, otherwise just push object on to unraveled.
    var commonFields = [];
    for (var i in data) {
      var row = angular.copy(data[i]);
      var rowKeys = Object.keys(row);
      if (angular.isDefined(options.unravelField) && angular.isArray(row[options.unravelField])) {
        var items = row[options.unravelField];
        delete row[options.unravelField];
        for (var j in items) {
          var item = angular.copy(items[j]);
          var keys = Object.keys(item);
          for (var k in keys) {
            var key = keys[k];
            if (rowKeys.includes(key) && !commonFields.includes(key)) commonFields.push(key);
            var value = item[key];
            delete item[key];
            item[ options.unravelField + '.' + key] = value;
          }
          unraveled.push(
            angular.merge(item, row)
          );
        }
      } else {
        unraveled.push(row);
      }
    }

    //console.log(commonFields);

    // Merge nested objects
    for (var i in unraveled) {
      mergeNestedObjects(unraveled[i]);
    }

    var excludeColumns = [];
    // Remove nested arrays and/or api urls.
    for (var i in unraveled) {
      var row = unraveled[i];
      doCalcs(row, options);
      var keys = Object.keys(row);
      for (var j in keys) {
        var key = keys[j];
        if (key == 'order') {
          if (row[key] && row[key].length) {
            row['has_order'] = true;
            row['order_id'] = row[key].replace(/.*\/api\/v1\/orders\//, '');
          } else {
            row['has_order'] = false;
            row['order_id'] = '';
          }
        }

        if (angular.isArray(row[key]) || key.match(/object$/)) {
          if ( excludeColumns.indexOf(key) < 0) excludeColumns.push(key);
          delete row[key];
          continue;
        }

        if (angular.isString(row[key]) && row[key].match(/\/api\/v1\//)) {
          if ( excludeColumns.indexOf(key) < 0) excludeColumns.push(key);
          delete row[key];
          continue;
        }

        // remove T and Z from dates so excel treats as dates
        if (key.match(/(_|\b)date(_|\b)/) && row[key]) {
          row[key] = row[key].replace('T', ' ').replace('Z', '');
        }

      }
    }

    // Everything is done. now figure out columns to display.
    var columns = [];
    for (var i in unraveled) {
      var row = unraveled[i];
      var keys = Object.keys(row);
      for (var j in keys) {
        var key = keys[j];
        if (excludeColumns.indexOf(key) >= 0) continue;
        if (columns.indexOf(key) >= 0) continue;
        columns.push(key);
      }
    }

    return Papa.unparse(unraveled, {columns: columns});
  };
  return to_csv;
});
