(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('userHandler', userHandler);

    userHandler.$inject = ["config", 'commonApiHandler', "messageHandler"];

    function userHandler(config, commonApiHandler, messageHandler) {
        var service = {
            getUserDetail: getUserDetail,
            activateUser: activateUser,
            deactivateUser: deactivateUser,
            sendPasswordRequest: sendPasswordRequest,
            resendInvite: resendInvite,
            updateUserDetail: updateUserDetail
        }
        return service;

        function getUserDetail(apiPath) {
            return commonApiHandler
                    .getRequest(apiPath)
                    .then(success, failed);

            function success(result) {
                return result.data;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.getUserDetail, error);
            }
        }
        function activateUser(apiPath, data) {
            return commonApiHandler
                        .patchRequest(apiPath, data)
                        .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.activateUser, result);
                return result;
            }
            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.activateUser, error);

            }
        }

        function deactivateUser(apiPath, data) {
            return commonApiHandler
                        .patchRequest(apiPath, data)
                        .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.deactivateUser, result);
                return result;
            }
            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.deactivateUser, error);
            }
        }

        function sendPasswordRequest(apiPath) {
            commonApiHandler
                    .postRequest(apiPath, "")
                    .then(success, failed)

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.sendPasswordRequest, result);
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.sendPasswordRequest, error);
            }
        }

        function resendInvite(apiPath) {
            return commonApiHandler
                            .postRequest(apiPath, "")
                            .then(success, failed);
            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.resendInvite, result);
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.resendInvite, error);
            }

        }

        function updateUserDetail(apiPath, data) {
            return commonApiHandler
                 .patchRequest(apiPath, data)
                 .then(success, failed);

            function success(result) {
                messageHandler
                    .showSuccessMessage(config.apiEndPoints.updateUserDetail, result);
                return result.data;

            };

            function failed(error) {

            };
        };


    }
})();