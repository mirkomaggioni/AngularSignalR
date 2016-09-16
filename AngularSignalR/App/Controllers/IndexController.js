/// <reference path="../app.ts" />
var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Controllers;
    (function (Controllers) {
        var IndexController = (function () {
            function IndexController($state) {
                $state.go("index.detail");
            }
            return IndexController;
        }());
        Controllers.IndexController = IndexController;
        AngularSignalRApp.AngularSignalR.module.controller("IndexController", IndexController);
    })(Controllers = AngularSignalRApp.Controllers || (AngularSignalRApp.Controllers = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));

//# sourceMappingURL=IndexController.js.map
