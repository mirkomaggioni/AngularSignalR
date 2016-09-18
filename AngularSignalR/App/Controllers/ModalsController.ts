/// <reference path="../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

namespace AngularSignalRApp.Controllers {
    "use strict";

    export class ModalsController {
        private modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        constructor($uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
            this.modalInstance = $uibModalInstance;
        }

        public Ok(): void {
            this.modalInstance.close();
        }

        public Cancel(): void {
            this.modalInstance.dismiss("cancel");
        }
    }

    AngularSignalR.module.controller("ModalsController", ModalsController);
}
