(function () {
    'use strict';

    angular
        .module('cfvApp')
        .directive('gridDropZone', gridDropZone);

    gridDropZone.$inject = [];

    function gridDropZone() {
        var directive = {
            restrict: "EA",
            link: link
        };
        return directive;

        function link(scope, element, attr) {

            element.on('dragover', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var height = angular.element("div.grid-file-upload-container").height();
                angular.element(this).children("form").height(height);
                angular.element(this).children("form").show();
                angular.element(this).find("div.k-dropzone").height(height - 22);
                angular.element(this).find("div.k-dropzone strong.k-upload-status").remove(); 
                angular.element(this).find("div.k-upload ul.k-upload-files").remove()
                angular.element("div.grid-file-upload-container div.k-dropzone").on('dragleave', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    angular.element("div.grid-file-upload-container").children("form").hide();
                });
            });
            element.on("drop", function () {
                e.stopPropagation();
                e.preventDefault();
                $(this).children("form").show();
            });
        }
    }

})();