/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="../../scripts/typings/angularjs-toaster/angularjs-toaster.d.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

module AngularSignalRApp.Controllers {

    import ngr = ng.resource;
    import constant = AngularSignalRApp.Commons.Constants;

    export class OrdersController {
        orders: ngr.IResourceArray<ngr.IResource<AngularSignalRApp.Models.IOrder>>;
        order: AngularSignalRApp.Models.IOrder;
        title: string;
        toaster: ngtoaster.IToasterService;

        private filter: ng.IFilterService;
        private modalService: ng.ui.bootstrap.IModalService;
        private ordersService: AngularSignalRApp.Services.OrdersService;
        private notificationsService: AngularSignalRApp.Services.NotificationsService;
        private constant: AngularSignalRApp.Commons.Constants;

        constructor($filter: ng.IFilterService, $uibModal: ng.ui.bootstrap.IModalService, toaster: ngtoaster.IToasterService,
            OrdersService: AngularSignalRApp.Services.OrdersService, NotificationsService: AngularSignalRApp.Services.NotificationsService) {
            this.filter = $filter;
            this.modalService = $uibModal;
            this.ordersService = OrdersService;
            this.notificationsService = NotificationsService;
            this.constant = constant;

            this.notificationsService.OnOrderChanges(() => {
                this.Load();
            });

            this.toaster = toaster;
            this.title = "Orders";

            this.Load();
        }

        public New() {
            this.order = {
                Id: constant.GuidEmpty,
                Article: "",
                Amount: 0,
                CreationDate: new Date(),
                Customer: "",
                Notes: ""
            };
        }

        public Edit(order: AngularSignalRApp.Models.IOrder) {
            this.order = order;
        }

        public Delete() {

            var vm = this;
            var modalInstance = vm.modalService.open({
                animation: true,
                templateUrl: "/App/Views/Shared/ConfirmDeleteModal.html",
                controller: "ModalsController as vm",
                size: "modal-sm"
            });

            modalInstance.result.then(function () {
                vm.ordersService.delete(vm.order).$promise.then((data) => {
                    var orderToDelete = vm.filter('filter')(vm.orders, { Id: vm.order.Id })[0];
                    var index = vm.orders.indexOf(orderToDelete);
                    vm.orders.splice(index, 1);
                    vm.order = null;

                    vm.notificationsService.NotifyOrderChanges();
                    vm.toaster.success("Order deleted successfully.");
                }, (error) => {
                    vm.toaster.error("Error deleting order.", error.data.message);
                });
            });
        }

        public Save() {
            this.ordersService.save(this.order).$promise.then((data: any) => {
                if (this.order.Id == constant.GuidEmpty) {
                    this.order = data;
                    this.orders.push(data);
                }

                this.notificationsService.NotifyOrderChanges();
                this.toaster.success("Order saved successfully.");

            }, (error: any) => {
                this.toaster.error("Error saving order", error.data.message);
            });
        }

        public Close() {
            this.order = null;
        }

        private Load() {
            this.ordersService.getAll().$promise.then((data) => {
                this.orders = data;
                this.toaster.success("Orders loaded successfully.");
                return;
            }, (error) => {
                this.toaster.error("Error loading orders", error.data.message);
            });
        }
    }

    AngularSignalR.module.controller('OrdersController', OrdersController);
}
