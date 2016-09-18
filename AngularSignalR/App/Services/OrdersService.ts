/// <reference path="../models/order.ts" />
/// <reference path="../commons.ts" />
/// <reference path="../../scripts/typings/angularjs/angular-resource.d.ts" />

namespace AngularSignalRApp.Services {
    "use strict";

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

        public static factory(): any {
            return (r: ngr.IResourceService) => new OrdersService(r);
        }

        public create(order: AngularSignalRApp.Models.IOrder): ngr.IResource<Models.IOrder> {
            return this.resource.create(order);
        }

        public save(order: AngularSignalRApp.Models.IOrder): ngr.IResource<Models.IOrder> {
            if (order.Id === constants.guidEmpty) {
                return this.resource.create(order);
            }

            return this.resource.save(order);
        }

        public delete(order: AngularSignalRApp.Models.IOrder): any {
            return this.resource.remove(order);
        }

        public getAll(): ngr.IResourceArray<ngr.IResource<Models.IOrder>> {
            return this.resource.query();
        }
    }

    AngularSignalR.module.factory("OrdersService", ["$resource", OrdersService.factory()]);
}
