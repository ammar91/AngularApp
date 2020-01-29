(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('PageSetup', ['$scope', "$modalInstance", "pageInfo", PageSetup]);

    function PageSetup($scope , $modalInstance, pageInfo) {

        $scope.pageInfo = pageInfo;
        
        $scope.visibility = {
            custom: pageInfo.pageSize == "Custom"? "": "none",
            predef: pageInfo.pageSize == "Custom" || pageInfo.pageSize == "GraphBounds"? "none": "",
            graphBounds: pageInfo.pageSize == "GraphBounds"? "": "none"
        };
        
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        }

        $scope.save = function () {
            //console.log($scope.pageInfo);
            $modalInstance.close($scope.pageInfo);
        }

    }
})();