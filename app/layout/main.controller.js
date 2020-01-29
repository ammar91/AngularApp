(function () {
    angular
        .module("cfvApp")
        .controller("Main", Main);

    Main.$inject = ["$scope", "$state", "$stateParams", "config", "accountHandler", "commonHandler", "appTranslateHandler"];

    function Main($scope, $state, $stateParams, config, accountHandler, commonHandler, appTranslateHandler) {
        var main = this;

        main.logoutUser = logoutUser;
        main.onLanguageChange = onLanguageChange;
        main.isSecure = isSecure;
        main.getClass = getClass;
        main.enableMinimizeSlider = false;
        activate();

        function activate() {
            appTranslateHandler.translatingApplication(main);
        }

        function isSecure() {
            main.pageId = $state.current.secure ?
                            "page-wrapper" : "";
            return $state.current.secure;
        }

        function getClass() {
            return $state.current.secure == false ? "gray-bg" : "";
        }

        function logoutUser() {
            accountHandler.logoutUser();
        };

        function setUserView() {
            var user = commonHandler.getLocalStorageData(config.appSotragekeys.userInfo);
            main.userInfo = {
                role: user.roles[0],
                name: "Admin",
                image: "img/admin.png"
            };
            main.enableMinimizeSlider = (main.userInfo.role == config.appRole.regularUser);
        }
        function onLanguageChange() {
            appTranslateHandler.setUserLanguage(main.selectedLanguage);
        }

        //Event Listner
        $scope.$on(config.events.onLoginSuccess, function (events, args) {
            console.log("On login Success")
            setUserView();
            $stateParams.returnUrl != undefined ?
                commonHandler.redirectToRoute($stateParams.returnUrl) :
                commonHandler.redirectToRoute(config.stateEnums.home);
        });

        $scope.$on(config.events.isUserLoggedIn, function (events, args) {
            setUserView();
        });

        $scope.$on(config.events.redirectToLogin, function (events, args) {
            commonHandler.clearAppStorage();
            commonHandler.redirectToRoute(config.stateEnums.login, args);
        });

    }
})();