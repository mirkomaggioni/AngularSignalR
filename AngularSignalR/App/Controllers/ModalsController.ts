/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

module AngularSignalRApp.Controllers {

    export class ModalsController {
        private modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        constructor($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
            this.modalInstance = $uibModalInstance;
        }

        public Ok() {
            this.modalInstance.close();
        }

        public Cancel() {
            this.modalInstance.dismiss("cancel");
        }
    }

    AngularSignalR.module.controller('ModalsController', ModalsController);
}