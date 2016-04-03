var AngularSignalRApp;
(function (AngularSignalRApp) {
    var Directives;
    (function (Directives) {
        var DecimalNumber = (function () {
            function DecimalNumber() {
                this.restrict = 'A';
                this.require = '?ngModel';
            }
            DecimalNumber.prototype.link = function ($scope, element, attributes, modelController) {
                modelController.$parsers.push(function (value) {
                    if (value == undefined)
                        return '';
                    var replacedValue = value.replace(/[^-0-9\.]/g, '');
                    if (replacedValue.split('.').length > 2) {
                        replacedValue = replacedValue.substring(0, replacedValue.length - 1);
                    }
                    if (replacedValue !== value) {
                        modelController.$setViewValue(replacedValue);
                        modelController.$render();
                    }
                    return replacedValue;
                });
            };
            DecimalNumber.factory = function () {
                return function () { return new DecimalNumber(); };
            };
            return DecimalNumber;
        })();
        Directives.DecimalNumber = DecimalNumber;
        AngularSignalRApp.AngularSignalR.module.directive('decimalNumber', DecimalNumber.factory());
    })(Directives = AngularSignalRApp.Directives || (AngularSignalRApp.Directives = {}));
})(AngularSignalRApp || (AngularSignalRApp = {}));
//# sourceMappingURL=DecimalNumberValidationDirective.js.map