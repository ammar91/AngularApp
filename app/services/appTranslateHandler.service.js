(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('appTranslateHandler', appTranslateHandler);

    appTranslateHandler.$inject = ["$translate", "$q", "config", "lodash", "commonHandler"];

    function appTranslateHandler($translate, $q, config, lodash, commonHandler) {
        var service = {
            translatingApplication: translatingApplication,
            setUserLanguage: setUserLanguage
        };
        return service;

        function translatingApplication(scope) {
            bindLanguageDropdown(scope);
            translateApplication();
        }

        function setUserLanguage(userLanguage) {
            config.applicationLanguage.selectedLanguage = userLanguage;
            commonHandler.saveDataInLocalStorage(config.appSotragekeys.userLanguage, userLanguage);
            translateApplication();
        }

        function translateApplication() {
            var userLanguage = commonHandler.getLocalStorageData(config.appSotragekeys.userLanguage);
            $translate.use(userLanguage != null ? userLanguage : config.applicationLanguage.selectedLanguage);
        }

        function bindLanguageDropdown(scope) {
            var userLanguage = commonHandler.getLocalStorageData(config.appSotragekeys.userLanguage);

            var langValueTmpl = commonHandler.getTemplateById(config.templateIds.langValueTmpl);
            var langItemTmpl = commonHandler.getTemplateById(config.templateIds.langItemTmpl);

            $q.all([langValueTmpl, langItemTmpl]).then(function (results) {
                scope.languageOptions = {
                    dataSource: languages,
                    dataTextField: "name",
                    dataValueField: "prefix",
                    valueTemplate: results[0].data,

                    template: results[1].data
                };
                scope.selectedLanguage = userLanguage;

            });
        }
    }
})();