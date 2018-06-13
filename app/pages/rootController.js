
app.controller("SettingsController", function($scope, SettingsService) {
  $scope.settings = SettingsService.get();
});

app.controller("TimezonesController", function($scope, TimezonesService) {
  $scope.timezones = TimezonesService.getTimezones();
});

app.controller("RootController",
  function ($scope, ApiService, $q, toCSV, saveFile, buildRootUrl, fetchData) {
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

      var _cancel = function() {
        if (angular.isFunction($scope.cancelFunc)) {
          $scope.cancelFunc();
          $scope.cancelFunc = undefined;
          return true;
        }
        return false;
      }

      var _export = function(options, datepicker) {
        fetchData($scope, options, datepicker).then(function(data) {
          if (!angular.isArray(data) || data.length <= 0) {
            $scope.error = {message: 'No results found'};
            return;
          }

          var formatted;
          var type = 'text/' + options.format;
          switch (options.format) {
            case 'csv':
              formatted = toCSV(data, options);
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

          var fileName = options.dataset;
          if (angular.isDefined(options.status) && options.status.length > 0) fileName += '_' + options.status;
          fileName += '_' + date_range + '.' + options.format;
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
