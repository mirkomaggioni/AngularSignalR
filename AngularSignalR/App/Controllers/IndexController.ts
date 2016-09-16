/// <reference path="../app.ts" />

namespace AngularSignalRApp.Controllers {
    export class IndexController {
        constructor($state: ng.ui.IStateService) {
            $state.go("index.detail");
        }
    }
    AngularSignalR.module.controller("IndexController", IndexController);
}
