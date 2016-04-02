
module AngularSignalRApp.Services {

    export class NotificationsService {

        private connection: HubConnection;
        private proxy: HubProxy;
        private callback;

        constructor() {
            this.connection = $.hubConnection();
            this.proxy = this.connection.createHubProxy('NotificationsHub');

            this.proxy.on('NotifyOrderChanges', () => {
                this.callback();
            });

            this.connection.start();        
        }

        public NotifyOrderChanges() {
            this.proxy.invoke('OrderChanges');
        }

        public OnOrderChanges(callback) {
            if (callback) {
                this.callback = callback;
            }
        }

        static factory() {
            return () => new NotificationsService();
        }
    }

    AngularSignalR.module.factory('NotificationsService', [NotificationsService.factory()]);
}