/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />
var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Controllers;
    (function (Controllers) {
        var constans = AngularSignalRApp.Commons.Constants;
        var OrdersController = (function () {
            function OrdersController(filter, modalService, toaster, ordersService, notificationsService) {
                var _this = this;
                this.filter = filter;
                this.modalService = modalService;
                this.ordersService = ordersService;
                this.notificationsService = notificationsService;
                this.notificationsService.OnOrderChanges(function () {
                    _this.Load();
                });
                this.toaster = toaster;
                this.title = "Orders";
                this.Load();
            }
            OrdersController.prototype.New = function () {
                this.order = {
                    Id: constans.GuidEmpty,
                    Article: "",
                    Amount: 0,
                    CreationDate: new Date(),
                    Customer: "",
                    Notes: ""
                };
            };
            OrdersController.prototype.Edit = function (order) {
                this.order = order;
            };
            OrdersController.prototype.Delete = function () {
                var vm = this;
                var modalInstance = vm.modalService.open({
                    animation: true,
                    templateUrl: "/App/Views/Shared/ConfirmDeleteModal.html",
                    controller: "ModalsController as vm",
                    size: "modal-sm"
                });
                modalInstance.result.then(function () {
                    vm.ordersService.delete(vm.order).$promise.then(function (data) {
                        var orderToDelete = vm.filter('filter')(vm.orders, { Id: vm.order.Id })[0];
                        var index = vm.orders.indexOf(orderToDelete);
                        vm.orders.splice(index, 1);
                        vm.order = null;
                        vm.notificationsService.NotifyOrderChanges();
                        vm.toaster.success("Order deleted successfully.");
                    }, function (error) {
                        vm.toaster.error("Error deleting order.", error.data.message);
                    });
                });
            };
            OrdersController.prototype.Save = function () {
                var _this = this;
                this.ordersService.save(this.order).$promise.then(function (data) {
                    if (_this.order.Id == constans.GuidEmpty) {
                        _this.order = data;
                        _this.orders.push(data);
                    }
                    _this.notificationsService.NotifyOrderChanges();
                    _this.toaster.success("Order saved successfully.");
                }, function (error) {
                    _this.toaster.error("Error saving order", error.data.message);
                });
            };
            OrdersController.prototype.Close = function () {
                this.order = null;
            };
            OrdersController.prototype.Load = function () {
                var _this = this;
                this.ordersService.getAll().$promise.then(function (data) {
                    _this.orders = data;
                    _this.toaster.success("Orders loaded successfully.");
                    return;
                }, function (error) {
                    _this.toaster.error("Error loading orders", error.data.message);
                });
            };
            OrdersController.$inject = ['$filter', '$uibModal', 'toaster', 'OrdersService', 'NotificationsService'];
            return OrdersController;
        }());
        Controllers.OrdersController = OrdersController;
        AngularSignalRApp.AngularSignalR.module.controller('OrdersController', OrdersController);
    })(Controllers = AngularSignalRApp.Controllers || (AngularSignalRApp.Controllers = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));

//# sourceMappingURL=OrdersController.js.map
