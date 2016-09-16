/// <reference path="../models/order.ts" />
/// <reference path="../commons.ts" />
var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Services;
    (function (Services) {
        var constants = AngularSignalRApp.Commons.Constants;
        var OrdersService = (function () {
            function OrdersService($resource) {
                this.resource = $resource("/api/orders/:id", { id: "@Id" }, {
                    get: { method: "GET" },
                    create: { method: "POST" },
                    save: { method: "PUT" },
                    query: { method: "GET", isArray: true },
                    delete: { method: "DELETE" }
                });
            }
            OrdersService.factory = function () {
                return function (r) { return new OrdersService(r); };
            };
            OrdersService.prototype.create = function (order) {
                return this.resource.create(order);
            };
            OrdersService.prototype.save = function (order) {
                if (order.Id === constants.guidEmpty) {
                    return this.resource.create(order);
                }
                return this.resource.save(order);
            };
            OrdersService.prototype.delete = function (order) {
                return this.resource.remove(order);
            };
            OrdersService.prototype.getAll = function () {
                return this.resource.query();
            };
            return OrdersService;
        }());
        Services.OrdersService = OrdersService;
        AngularSignalRApp.AngularSignalR.module.factory("OrdersService", ["$resource", OrdersService.factory()]);
    })(Services = AngularSignalRApp.Services || (AngularSignalRApp.Services = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));

//# sourceMappingURL=OrdersService.js.map
