(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('appHandler', appHandler);

    appHandler.$inject = ["$location", "$interval", "config", "commonHandler", "commonApiHandler", "lodash", "messageHandler"];

    function appHandler($location, $interval, config, commonHandler, commonApiHandler, lodash, messageHandler) {
        var basePath = "cfv/app/templates/";
        var tmplFormat = ".tmpl.html";
        var service = {
            initializeSetting: initializeSetting
        };
        return service;

        function initializeSetting() {
            loadTemplates();
            checkUserSession();
        }

        function loadTemplates() {
            commonHandler.saveTemplateInCache(config.templateIds.langValueTmpl, basePath + "accounts/lang.value" + tmplFormat);
            commonHandler.saveTemplateInCache(config.templateIds.langItemTmpl, basePath + "accounts/lang.item" + tmplFormat);

            //Admin/Company
            commonHandler.saveTemplateInCache(config.templateIds.admin.companyListTmpl, basePath + "admin/company/company-list" + tmplFormat);
            commonHandler.saveTemplateInCache(config.templateIds.admin.addNewCompany, basePath + "admin/company/add-company" + tmplFormat);

            //Admin/Users
            commonHandler.saveTemplateInCache(config.templateIds.admin.userListTmpl, basePath + "admin/user/user-list" + tmplFormat);
            commonHandler.saveTemplateInCache(config.templateIds.admin.licenseListTmpl, basePath + "admin/license/license-list" + tmplFormat);

            //Users/Company
            commonHandler.saveTemplateInCache(config.templateIds.user.companyFiles, basePath + "users/company/company-files" + tmplFormat);
            commonHandler.saveTemplateInCache(config.templateIds.user.companyFileList, basePath + "users/company/company-file-list" + tmplFormat);
            commonHandler.saveTemplateInCache(config.templateIds.user.companyFolders, basePath + "users/company/company-folders" + tmplFormat);

        }

        function checkUserSession() {
            $interval(function() {
                var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
                if (!lodash.isEmpty(session)) {
                    commonApiHandler
                        .getRequest("api/sessions/current")
                        .then(success, failed);
                }

                function success(result) {
                    console.log(result.data);
                }

                function failed(error) {
                    if (!lodash.isEmpty($location.search().returnUrl) &&
                        lodash.contains($location.search().returnUrl, config.stateEnums.login)) {
                        commonHandler.clearUrlParams();
                    } else {
                        messageHandler.showErrorMessage(config.apiEndPoints.session, error);
                    }

                }
            }, 30 * 60 * 1000);

        }
    }
})();