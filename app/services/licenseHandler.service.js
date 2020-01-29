(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('licenseHandler', licenseHandler);

    licenseHandler.$inject = ["config", "commonApiHandler", "messageHandler", "kendoHelper"];

    function licenseHandler(config, commonApiHandler, messageHandler, kendoHelper) {
        var service = {
            addLicenseToCompany: addLicenseToCompany,
            updateLicenseTerms: updateLicenseTerms,
            getAllLicenses: getAllLicenses,
            assignLicense: assignLicense,
            unAssignLicense: unAssignLicense
        };
        return service;

        function addLicenseToCompany(apiPath, data) {
            return commonApiHandler
                 .postRequest(apiPath, data)
                 .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.addLicenseToCompany, result);
                return result.data;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.addLicenseToCompany, error);
            }
        }

        function updateLicenseTerms(apiPath, data) {
            return commonApiHandler
                    .patchRequest(apiPath, data)
                    .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.updateLicenseTerms, result);
                return result.data;
            };

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.updateLicenseTerms, error);
            }
        }

        function getAllLicenses(apiPath) {
            return commonApiHandler
                        .getRequest(apiPath)
                        .then(success);
            function success(result) {
                return result.data
            }
        }

        function assignLicense(apiPath, data) {
            return commonApiHandler
                .postRequest(apiPath, data)
                .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.assignLicense, result);
                return result.data;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.assignLicense, error);
            }
        }
        function unAssignLicense(apiPath) {
            return commonApiHandler
                .deleteRequest(apiPath)
                .then(success, failed);

            function success(result) {
                return result.data;
            }

            function failed(error) {

            }
        }

    }
})();