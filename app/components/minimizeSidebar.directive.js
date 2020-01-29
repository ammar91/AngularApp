(function () {
    'use strict';

    angular
        .module('cfvApp')
        .directive('minimizeSidebar', minimizeSidebar);

    minimizeSidebar.$inject = ['$timeout', "commonHandler", "config"];

    function minimizeSidebar($timeout, commonHandler, config) {
        var directive = {
            restrict: "A",
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: controller
        };

        return directive;

        function controller($scope, $element) {
            $scope.minimalize = function () {
               var maxDelay = 400; 
               angular.element("body").toggleClass("mini-navbar");
               if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                   angular.element('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            angular.element('#side-menu').fadeIn(500);
                        }, 100);
                        maxDelay = 600;
               } else if (angular.element('body').hasClass('fixed-sidebar')) {
                   angular.element('#side-menu').hide();
                    setTimeout(
                        function () {
                            angular.element('#side-menu').fadeIn(500);
                        }, 300);
                        maxDelay = 800;
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                   angular.element('#side-menu').removeAttr('style');
                }
                //final size is only set after maxDelay
                setTimeout(function(){commonHandler.broadcastEvent(config.events.resize);}, maxDelay);
            }
        };
    }

})();