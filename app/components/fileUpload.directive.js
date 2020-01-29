(function () {
    'use strict';

    angular
        .module('cfvApp')
        .directive('fileUpload', fileUpload);

    fileUpload.$inject = [];

    function fileUpload() {
        var directive = {
            restrict: "A",
            link: link
        };
        return directive;

        function link(scope, element, attr) {
           
        }
    }

})();