(function () {
    'use strict';
    angular
        .module('cfvApp')
        .directive('telephone', telephone);

    telephone.$inject = ["$timeout", "config", "lodash"];

    function telephone($timeout, config, lodash) {
        var directive = {
            require: "ngModel",
            link: link,
            restrict: "A"
        };
        return directive;

        function link(scope, element, attr, ngModel) {
            angular.element(element).intlTelInput({
                utilsScript: "js/plugins/intl-tel-input/utils.js"
            });


            element.bind("blur", function (e) {
                var isValid = angular.element(element).intlTelInput("isValidNumber");
                var $event = {
                    currentTarget: e.target
                };

                $timeout(function () {
                    if (isValid) {
                        ngModel.$setViewValue(angular.element(element).intlTelInput("getNumber"));
                        scope.$emit(config.updatePhoneNumber, { $event: $event });
                    }
                }, 3000);

            });

        }
    }

})();