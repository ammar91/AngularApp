(function () {
    angular
        .module('cfvApp',
    [
        "ngResource",
        "ngSanitize",
        "ngCookies",
        "ngMessages",
        "ngAnimate",
        "pascalprecht.translate",
        "kendo.directives",
        "LocalStorageModule",
        "ui.router", // Routing
        "oc.lazyLoad", // ocLazyLoad
        "ui.bootstrap", // Ui Bootstrap
        "ngLodash",
        "ngplus",
        "toaster"
    ]);

    angular
        .module('cfvApp')
        .run(appRun);

    appRun.$inject = ["$rootScope", "$state", "$location", "$translate", "config", "routeMediatorHandler", "appHandler"];

    function appRun($rootScope, $state, $location, $translate, config, routeMediatorHandler, appHandler) {
        routeMediatorHandler.setRoutingHandlers();
        //$rootScope.$state = $state;
        if ($location.$$host == config.host.dev) {
            config.apiPaths.basePath = config.apiPaths.devPath;
        }
        else if ($location.$$host == config.host.staging) {
            config.apiPaths.basePath = config.apiPaths.stagingPath;
        }
        appHandler.initializeSetting();
        $translate.use(config.applicationLanguage.selectedLanguage);
    }

    angular
        .module('cfvApp')
        .config(appConfiguration);

    appConfiguration.$inject = ["$httpProvider", "localStorageServiceProvider"];

    function appConfiguration($httpProvider, localStorageServiceProvider) {
        localStorageServiceProvider
        .setPrefix('cfvApp');
        //$httpProvider.defaults.useXDomain = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
})();

