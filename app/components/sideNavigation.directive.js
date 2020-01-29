(function () {
    'use strict';

    angular
        .module('cfvApp')
        .directive('sideNavigation', sideNavigation);

    sideNavigation.$inject = ['$timeout'];

    function sideNavigation($timeout) {
        var directive = {
            link: link,
            restrict: "A"
        };
        return directive;

        function link(scope, element, attr, ngModel) {
            $timeout(function () {
                element.metisMenu();
            });
        }

    }

})();