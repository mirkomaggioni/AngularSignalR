/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

namespace AngularSignalRApp.Directives {
    "use strict";

    export class DecimalNumber implements ng.IDirective {

        public restrict: string = "A";
        public require: string = "?ngModel";
        public static factory(): ng.IDirectiveFactory {
            return () => new DecimalNumber();
        }

        public link($scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController): void {

            modelController.$parsers.push((value: any): string => {
                if (value === undefined) {
                    return "";
                }

                let replacedValue: string = value.replace(/[^-0-9\.]/g, "");

                if (replacedValue.split(".").length > 2) {
                    replacedValue = replacedValue.substring(0, replacedValue.length - 1);
                }

                if (replacedValue !== value) {
                    modelController.$setViewValue(replacedValue);
                    modelController.$render();
                }
                return replacedValue;
            });

        }
    }

    AngularSignalR.module.directive("decimalNumber", DecimalNumber.factory());
}
