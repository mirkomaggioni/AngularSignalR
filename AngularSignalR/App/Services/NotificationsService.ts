/// <reference path="../../scripts/typings/signalr/signalr.d.ts" />

namespace AngularSignalRApp.Services {
    "use strict";

    export class NotificationsService {

        private connection: HubConnection;
        private proxy: HubProxy;
        private callback: () => void;

        constructor() {
            this.connection = $.hubConnection();
            this.proxy = this.connection.createHubProxy("NotificationsHub");

            this.proxy.on("NotifyOrderChanges", () => {
                this.callback();
            });

            this.connection.start();
        }

        public static factory(): any {
            return () => new NotificationsService();
        }

        public NotifyOrderChanges(): void {
            this.proxy.invoke("OrderChanges");
        }

        public OnOrderChanges(callback: () => void): void {
            if (callback) {
                this.callback = callback;
            }
        }
    }

    AngularSignalR.module.factory("NotificationsService", [NotificationsService.factory()]);
}
