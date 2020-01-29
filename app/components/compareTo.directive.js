(function () {
    'use strict';

    angular
        .module('cfvApp')
        .directive('compareTo', compareTo);

    compareTo.$inject = [];

    function compareTo() {
        var directive = {
            require: "ngModel",
            link: link,
            scope: {
                otherModelValue: "=compareTo",
            },
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            }
            scope.$watch("otherModelValue", function () {
                console.log("hello update")
                ngModel.$validate();
            });
        }
    }

})();