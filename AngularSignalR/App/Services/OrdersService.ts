﻿/// <reference path="../models/order.ts" />
/// <reference path="../commons.ts" />

namespace AngularSignalRApp.Services {

    import ngr = ng.resource;
    import constants = AngularSignalRApp.Commons.Constants;

    export interface IOrdersResourceClass extends ngr.IResourceClass<ngr.IResource<AngularSignalRApp.Models.IOrder>> {
        create(order: AngularSignalRApp.Models.IOrder): ngr.IResource<AngularSignalRApp.Models.IOrder>;
    }

    export class OrdersService {
        private resource: IOrdersResourceClass;

        constructor($resource: ngr.IResourceService) {
            this.resource = <IOrdersResourceClass>$resource("/api/orders/:id", { id: "@Id" }, {
                get: { method: "GET" },
                create: { method: "POST" },
                save: { method: "PUT" },
                query: { method: "GET", isArray: true },
                delete: { method: "DELETE" }
            });
        }

        public static factory() {
            return (r: ngr.IResourceService) => new OrdersService(r);
        }

        public create(order: AngularSignalRApp.Models.IOrder) {
            return this.resource.create(order);
        }

        public save(order: AngularSignalRApp.Models.IOrder) {
            if (order.Id === constants.guidEmpty) {
                return this.resource.create(order);
            }

            return this.resource.save(order);
        }

        public delete(order: AngularSignalRApp.Models.IOrder) {
            return this.resource.remove(order);
        }

        public getAll() {
            return this.resource.query();
        }
    }

    AngularSignalR.module.factory("OrdersService", ["$resource", OrdersService.factory()]);
}
