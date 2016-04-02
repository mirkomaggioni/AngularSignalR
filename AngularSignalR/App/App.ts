module AngularSignalRApp {
    export class AngularSignalR {
        static module = angular.module('angularSignalR', ['ngResource', 'ui.bootstrap', 'ui.router', 'toaster', 'angular-loading-bar']);
    }

    AngularSignalR.module.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise("/orders");

        $stateProvider
            .state('Orders', {
                url: '/orders',
                templateUrl: '/app/views/orders.html',
                controller: 'OrdersController as vm'
            });
    }]);
}

