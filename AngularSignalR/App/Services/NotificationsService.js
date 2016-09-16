/// <reference path="../../scripts/typings/signalr/signalr.d.ts" />
var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Services;
    (function (Services) {
        var NotificationsService = (function () {
            function NotificationsService() {
                var _this = this;
                this.connection = $.hubConnection();
                this.proxy = this.connection.createHubProxy("NotificationsHub");
                this.proxy.on("NotifyOrderChanges", function () {
                    _this.callback();
                });
                this.connection.start();
            }
            NotificationsService.factory = function () {
                return function () { return new NotificationsService(); };
            };
            NotificationsService.prototype.NotifyOrderChanges = function () {
                this.proxy.invoke("OrderChanges");
            };
            NotificationsService.prototype.OnOrderChanges = function (callback) {
                if (callback) {
                    this.callback = callback;
                }
            };
            return NotificationsService;
        }());
        Services.NotificationsService = NotificationsService;
        AngularSignalRApp.AngularSignalR.module.factory("NotificationsService", [NotificationsService.factory()]);
    })(Services = AngularSignalRApp.Services || (AngularSignalRApp.Services = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));

//# sourceMappingURL=NotificationsService.js.map
