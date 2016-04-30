/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

module AngularSignalRApp.Directives {

    export class DecimalNumber implements ng.IDirective {

        restrict = 'A';
        require = '?ngModel';

        public link($scope: ng.IScope, element: JQuery, attributes: ng.IAttributes, modelController: ng.INgModelController) {

            modelController.$parsers.push((value) => {
                if (value == undefined) return '';
                var replacedValue: string = value.replace(/[^-0-9\.]/g, '');

                if (replacedValue.split('.').length > 2) {
                    replacedValue = replacedValue.substring(0, replacedValue.length - 1);
                }

                if (replacedValue !== value) {
                    modelController.$setViewValue(replacedValue);
                    modelController.$render();
                }
                return replacedValue;
            });

        }

        static factory(): ng.IDirectiveFactory {
            return () => new DecimalNumber();
        }
    }

    AngularSignalR.module.directive('decimalNumber', DecimalNumber.factory());
}
