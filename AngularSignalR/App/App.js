/// <reference path="../scripts/typings/angular-ui/angular-ui-router.d.ts" />
var AngularSignalRApp;
(function (AngularSignalRApp) {
    var AngularSignalR = (function () {
        function AngularSignalR() {
        }
        AngularSignalR.module = angular.module('angularSignalR', ['ngResource', 'ui.bootstrap', 'ui.router', 'toaster', 'angular-loading-bar']);
        return AngularSignalR;
    }());
    AngularSignalRApp.AngularSignalR = AngularSignalR;
    AngularSignalR.module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/orders");
            $stateProvider
                .state('Orders', {
                url: '/orders',
                templateUrl: '/app/views/orders.html',
                controller: 'OrdersController as vm'
            });
        }]);
})(AngularSignalRApp || (AngularSignalRApp = {}));

//# sourceMappingURL=App.js.map
