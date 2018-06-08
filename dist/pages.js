/*
Comecero Data Exporter version: 0.9.1
https://comecero.com
https://github.com/comecero/data-exporter
Copyright Comecero and other contributors. Released under MIT license. See LICENSE for details.
*/


app.controller("SettingsController", function($scope, SettingsService) {
    $scope.settings = SettingsService.get();
});

app.controller("TimezonesController", function($scope, TimezonesService) {
    $scope.timezones = TimezonesService.getTimezones();
});

app.controller("RootController", function ($scope, ApiService, $q, $httpParamSerializer) {
      // Set defaults
      $scope.options = {
        dataset: 'orders',
        format: 'csv',
        timezone: "UTC",
        dates: "last_30",
        unravelFields: [{id: 'items', name: 'Items'}],
        unravelField: 'items'
      };
      $scope.datepicker = {
        status: {
          date_start: {opened: false},
          date_end: {opened: false}
        },
        options: {
          startingDay: 1,
          showWeeks: false,
          initDate: new Date(),
          yearRange: 10
        },
        open: function ($event, which) {
          $scope.datepicker.status[which].opened = true;
        }
      };

      var buildRootUrl = function(options, datepicker) {
        var query = {
          date_start: $scope.options.dates,
          date_end: $scope.options.dates,
          timezone: options.timezone
        };

        // Override if necessary
        switch($scope.options.dates) {
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
            if (!$scope.datepicker.date_start) datepicker.date_start = $scope.datepicker.date_end;

            query.date_start = datepicker.date_start.toISOString().substring(0, 10);
            query.date_end = datepicker.date_end.toISOString().substring(0, 10);
            break;
        }

        return '/' + options.dataset + '?' + $httpParamSerializer(query);
      };

      var saveFile = function(name, type, data) {
        if (data != null && navigator.msSaveBlob)
          return navigator.msSaveBlob(new Blob([data], { type: type }), name);
        var a = angular.element("<a style='display: none;'/>");
        var url = window.URL.createObjectURL(new Blob([data], {type: type}));
        a.attr("href", url);
        a.attr("download", name);
        var body = angular.element(document).find('body').eq(0);
        body.append(a);
        a[0].click();
        window.URL.revokeObjectURL(url);
        a.remove();
      };

      var _cancel = function() {
        if (angular.isFunction($scope.cancelFunc)) {
          $scope.cancelFunc();
          $scope.cancelFunc = undefined;
          return true;
        }
        return false;
      }

      var fetchData = function(options, datepicker) {
        var deferred = $q.defer();
        var url = buildRootUrl(options, datepicker);
        var data = [];
        $scope.cancelFunc = $scope.$watch(function() {
          return url;
        }, function(next) {
          if (angular.isUndefined(next) || next == null) return;
          ApiService.getList(next).then(
            function(response) {
              var d = response.data;
              var next_page = d.next_page_url;
              if (angular.isArray(d.data)) {
                for (var i in d.data) {
                  data.push(d.data[i]);
                }
              }
              if (angular.isUndefined(next_page) || next_page == null) {
                deferred.resolve(data);
                _cancel();
                return;
              }
              url = next_page;
            }, function(error) {
              _cancel();
              reject(error);
            }
          );
        });
        return deferred.promise;
      };

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
        for (var i in data) {
          var row = angular.copy(data[i]);
          if (angular.isDefined(options.unravelField) && angular.isArray(row[options.unravelField])) {
            var items = row[options.unravelField];
            delete row[options.unravelField];
            for (var j in items) {
              var item = angular.copy(items[j]);
              var keys = Object.keys(item);
              for (var k in keys) {
                var key = keys[k];
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

        // Merge nested objects
        for (var i in unraveled) {
          mergeNestedObjects(unraveled[i]);
        }

        // Remove nested arrays and/or api urls.
        for (var i in unraveled) {
          var row = unraveled[i];
          var keys = Object.keys(row);
          for (var j in Object.keys(row)) {
            var key = keys[j];
            if (angular.isArray(row[key]) || key.match(/object$/)) {
              delete row[key];
              continue;
            }

            if (angular.isString(row[key]) && row[key].match(/\/api\/v1\//)) {
              delete row[key];
              continue;
            }
          }
        }

        return Papa.unparse(unraveled);
      };

      var _export = function(options, datepicker) {
        fetchData(options, datepicker).then(function(data) {
          if (!angular.isArray(data) || data.length <= 0) {
            $scope.error = {message: 'No results found'};
            return;
          }

          var formatted;
          var type = 'text/' + options.format;
          switch (options.format) {
            case 'csv':
              formatted = to_csv(data, options);
              break;
            case 'json':
              formatted = JSON.stringify(data, function(key, value) {return value;}, new Number(2));
              break;
            default:
              $scope.error = {message: 'Unknown export format'};
              return;
          };

          var date_range = options.dates;
          if (date_range == 'custom') {
            date_range = datepicker.date_start.toISOString().substring(0, 10) + '_to_' +
              datepicker.date_end.toISOString().substring(0, 10);
          }

          var fileName = options.dataset + '_' + date_range + '.' + options.format;
          saveFile(fileName, type, formatted);
          $scope.successMessage = 'Export successful';
        }, function(error) {
          $scope.error = error;
          _cancel();
        });
      };

      $scope.export = function() {
        $scope.clearMessages();
        _export(angular.copy($scope.options),angular.copy($scope.datepicker));
      };

      $scope.cancel = function() {
        if (_cancel()) {
          $scope.successMessage = 'Canceled export.';
        }
      }

      $scope.clearMessages = function() {
        $scope.successMessage = '';
        $scope.error = {};
      };
  });
