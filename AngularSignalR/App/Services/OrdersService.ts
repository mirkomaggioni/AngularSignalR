
module AngularSignalRApp.Services {

    import ngr = ng.resource;

    export interface IOrdersResourceClass extends ngr.IResourceClass<ngr.IResource<AngularSignalRApp.Models.IOrder>> {
        create(order: AngularSignalRApp.Models.IOrder);
    }

    export class OrdersService {
        private resource: IOrdersResourceClass;

        constructor($resource: ngr.IResourceService) {
            this.resource = <IOrdersResourceClass> $resource('/api/orders/:id', { id: '@Id' }, {
                get: { method: "GET" },
                create: { method: "POST" },
                save: { method: "PUT" },
                query: { method: "GET", isArray: true },
                delete: { method: "DELETE" }
            });
        }

        public create(order: AngularSignalRApp.Models.IOrder) {
            return this.resource.create(order);
        }

        public save(order: AngularSignalRApp.Models.IOrder) {
            if (order.Id == GuidEmpty) {
                return this.resource.create(order);
            }
            else {
                return this.resource.save(order);
            }
        }

        public delete(order: AngularSignalRApp.Models.IOrder) {
            return this.resource.remove(order);
        }

        public getAll() {
            return this.resource.query();
        }

        static factory() {
            return (r) => new OrdersService(r);
        }
    }

    AngularSignalR.module.factory('OrdersService', ['$resource', OrdersService.factory()]);
}
