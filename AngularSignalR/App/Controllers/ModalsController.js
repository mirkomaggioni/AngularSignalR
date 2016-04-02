var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Controllers;
    (function (Controllers) {
        var ModalsController = (function () {
            function ModalsController(modalInstance) {
                this.modalInstance = modalInstance;
            }
            ModalsController.prototype.Ok = function () {
                this.modalInstance.close();
            };
            ModalsController.prototype.Cancel = function () {
                this.modalInstance.dismiss("cancel");
            };
            ModalsController.$inject = ['$uibModalInstance'];
            return ModalsController;
        })();
        Controllers.ModalsController = ModalsController;
        AngularSignalRApp.AngularSignalR.module.controller('ModalsController', ModalsController);
    })(Controllers = AngularSignalRApp.Controllers || (AngularSignalRApp.Controllers = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));
