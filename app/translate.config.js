(function () {
    angular
        .module("cfvApp")
        .config(languageConfiguration);

    languageConfiguration.$inject = ["$translateProvider", "appConstant"];

    function languageConfiguration($translateProvider, appConstant) {
        $translateProvider.preferredLanguage(appConstant.appLanguage.preferedLanguage);
        $translateProvider.fallbackLanguage(appConstant.appLanguage.fallbackLanguage);
    }
})();