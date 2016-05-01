/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Controllers;
    (function (Controllers) {
        var ModalsController = (function () {
            function ModalsController($uibModalInstance) {
                this.modalInstance = $uibModalInstance;
            }
            ModalsController.prototype.Ok = function () {
                this.modalInstance.close();
            };
            ModalsController.prototype.Cancel = function () {
                this.modalInstance.dismiss("cancel");
            };
            return ModalsController;
        }());
        Controllers.ModalsController = ModalsController;
        AngularSignalRApp.AngularSignalR.module.controller('ModalsController', ModalsController);
    })(Controllers = AngularSignalRApp.Controllers || (AngularSignalRApp.Controllers = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));

//# sourceMappingURL=ModalsController.js.map
