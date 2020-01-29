(function () {
    'use strict';

    angular
        .module('cfvApp')
        .directive('checkBox', checkBox);

    checkBox.$inject = [];

    function checkBox() {
        var directive = {
            require: "ngModel",
            link: link,
            restrict: "A"
        }
        return directive;

        function link(scope, element, attr, ngModel) {
            scope.$watch(attr['ngModel'], function (newValue) {
                angular.element(element).iCheck("update");
            })
            angular.element(element).iCheck({
                checkboxClass: "icheckbox_square-green"
            }).on('ifChanged', function (event) {
                if (angular.element(element).attr('type') === 'checkbox' && attr['ngModel']) {
                    scope.$apply(function () {
                        return ngModel.$setViewValue(event.target.checked);
                    });
                }
            });
        }
    }

})();