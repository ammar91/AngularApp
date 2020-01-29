(function () {
    angular.module("cfvApp")
        .directive("pageSetting", pageSetting);
    pageSetting.$inject = ["$timeout"];

    function pageSetting($timeout) {
        var pageSetting = {
            restrict: "EA",
            link: link
        }
        return pageSetting;

        function link(scope, element) {
            angular.element(window).bind("load resize click scroll", function () {
                if (!angular.element("body").hasClass("body-small")) {
                    $timeout(fixPageHeight, 100)
                }
            })

            angular.element(window).bind("load resize", function () {
                if (angular.element(this).width() < 769) {
                    angular.element('body').addClass('body-small')
                } else {
                    angular.element('body').removeClass('body-small')
                }
            })
        }
        function fixPageHeight() {
            var heightWithoutNavbar = $("body > #wrapper").height() - 61;
            angular.element(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
            var windowHeight = angular.element(window).height();
            angular.element("#page-wrapper").css("min-height", windowHeight + "px");
        }
    }
})();