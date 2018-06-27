
app.directive('updateIncludeFields', function () {
  var linkFn = function (scope, element, attrs) {
    var availableIncludes =  {
      payments: [
        {'value': '', 'label': 'None'},
        {'value': 'fee_summary', 'label': 'Fee Summary'},
      ],
      refunds: [
        {'value': '', 'label': 'None'},
        {'value': 'fee_summary', 'label': 'Fee Summary'},
      ],
      orders: [
        {'value': '', 'label': 'None'},
        {'value': 'customer', 'label': 'Customer'},
      ],
      invoices: [
        {'value': '', 'label': 'None'},
        {'value': 'customer', 'label': 'Customer'},
      ]
    };

    scope.$watch(function() {
      return scope.options.dataset;
    },function(newValue) {
      scope.includes = [];
      scope.options.expand = '';
      if (angular.isDefined(availableIncludes[newValue])) {
        scope.includes = availableIncludes[newValue];
      }
    });
  };

  return {
    restrict: 'A',
    scope: true,
    link: linkFn
  }
});

app.directive('updateStatusFields', function () {
  var linkFn = function (scope, element, attrs) {
    var defaultStatuses =  [
      {'value': '', 'label': 'Any'},                // Export all
      {'value': 'unpaid', 'label': 'Unpaid'},       // Used with Carts, Invoices
      {'value': 'scheduled', 'label': 'scheduled'}, // Used with Invoices
      {'value': 'initiated', 'label': 'initiated'}, // Used on Payments which are created but not authorized yet.
      {'value': 'pending', 'label': 'pending'},     // Used with Payments, Carts, Invoices, Refunds, Orders
      {'value': 'completed', 'label': 'completed'}, // Used with Payments, Carts, Invoices, Refunds, Orders
      {'value': 'failed', 'label': 'failed'},       // Used with Payments, Carts, Invoices, Refunds
      {'value': 'cancelled', 'label': 'cancelled'}, // Used with Payments, Carts, Invoices, Orders
      {'value': 'refunded', 'label': 'refunded'},   // Used with Payments, Carts, Invoices, Orders
      {'value': 'retry', 'label': 'retry'}          // Used with Payments, Invoices
    ];

    scope.$watch(function() {
      return scope.options.dataset;
    },function(newValue) {
      switch(newValue) {
        case 'orders':
          scope.options.statusField = 'payment_status';
          scope.options.status = 'completed';
          scope.statusesLabel = 'Payment Status';
          scope.statuses = [
            {'value': '', 'label': 'Any'},                // Export all
            {'value': 'pending', 'label': 'pending'},     // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'completed', 'label': 'completed'}, // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'cancelled', 'label': 'cancelled'}, // Used with Payments, Carts, Invoices, Orders
            {'value': 'refunded', 'label': 'refunded'}    // Used with Payments, Carts, Invoices, Orders
          ];
          break;
        case 'invoices':
          scope.options.statusField = 'payment_status';
          scope.options.status = 'completed';
          scope.statusesLabel = 'Payment Status';
          scope.statuses = [
            {'value': '', 'label': 'Any'},                // Export all
            {'value': 'unpaid', 'label': 'Unpaid'},       // Used with Carts, Invoices
            {'value': 'scheduled', 'label': 'scheduled'}, // Used with Invoices
            {'value': 'pending', 'label': 'pending'},     // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'completed', 'label': 'completed'}, // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'failed', 'label': 'failed'},       // Used with Payments, Carts, Invoices, Refunds
            {'value': 'cancelled', 'label': 'cancelled'}, // Used with Payments, Carts, Invoices, Orders
            {'value': 'refunded', 'label': 'refunded'},   // Used with Payments, Carts, Invoices, Orders
            {'value': 'retry', 'label': 'retry'}          // Used with Payments, Invoices
          ];
          break;
        case 'payments':
          scope.options.statusField = 'status';
          scope.options.status = 'completed';
          scope.statusesLabel = 'Status';
          scope.statuses = [
            {'value': '', 'label': 'Any'},                // Export all
            {'value': 'initiated', 'label': 'initiated'}, // Used on Payments which are created but not authorized yet.
            {'value': 'pending', 'label': 'pending'},     // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'completed', 'label': 'completed'}, // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'failed', 'label': 'failed'},       // Used with Payments, Carts, Invoices, Refunds
            {'value': 'cancelled', 'label': 'cancelled'}, // Used with Payments, Carts, Invoices, Orders
            {'value': 'refunded', 'label': 'refunded'},   // Used with Payments, Carts, Invoices, Orders
            {'value': 'retry', 'label': 'retry'}          // Used with Payments, Invoices
          ];
          break;
        case 'refunds':
          scope.options.statusField = 'status';
          scope.options.status = 'completed';
          scope.statusesLabel = 'Status';
          scope.statuses = [
            {'value': '', 'label': 'Any'},                // Export all
            {'value': 'pending', 'label': 'pending'},     // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'completed', 'label': 'completed'}, // Used with Payments, Carts, Invoices, Refunds, Orders
            {'value': 'failed', 'label': 'failed'},       // Used with Payments, Carts, Invoices, Refunds
          ];
          break;
        default:
          scope.options.statusField = '';
          scope.options.status = '';
          scope.statusLabel = '';
          scope.statuses = [];
      };
    });
  };

  return {
    restrict: 'A',
    scope: true,
    link: linkFn
  }
});

