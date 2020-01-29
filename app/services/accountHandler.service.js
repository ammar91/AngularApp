(function () {
    'use strict';
    angular
        .module("cfvApp")
        .service("accountHandler", accountHandler);

    accountHandler.$inject = ["$http", "config", "commonHandler", "messageHandler", "commonApiHandler"];

    function accountHandler($http, config, commonHandler, messageHandler, commonApiHandler) {
        var service = {
            authenticateUser: authenticateUser,
            sendResetPasowrdLink: sendResetPasowrdLink,
            logoutUser: logoutUser,
            authenticateRestPasswordToken: authenticateRestPasswordToken,
            resetPssword: resetPssword
        }
        return service;

        function authenticateUser(apiPath, data) {
            commonApiHandler
                .postRequestWithOutHeader(apiPath, data)
                .then(success, failed);


            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.login, result);
                commonHandler.saveDataInLocalStorage(config.appSotragekeys.userInfo, result.data);
                commonHandler.saveDataInLocalStorage(config.appSotragekeys.userSessionHeaders, result.headers());
                commonHandler.broadcastEvent(config.events.onLoginSuccess, { state: config.stateEnums.home })
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.login, error);
            }
        }

        function logoutUser() {
            commonApiHandler
                    .deleteRequest("api/auth")
                    .then(success, failed);
            function success() {
                commonHandler.broadcastEvent(config.events.redirectToLogin);
                commonHandler.clearUrlParams();
            }
            function failed() {
            }

        }

        function sendResetPasowrdLink(apiPath, data) {
            commonApiHandler
                      .postRequestWithOutHeader(apiPath, data)
                      .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.resetPasswordToken, result);
                commonHandler.broadcastEvent(config.events.redirectToLogin, { state: config.stateEnums.login });
            }
            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.resetPasswordToken, error);
            }
        }

        function authenticateRestPasswordToken(apiPath, data, scope) {
            return commonApiHandler
                    .postRequestWithOutHeader(apiPath, data)
                    .then(success, failed);

            function success(result) {
                return result.data
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.authToken, error);
                commonHandler.broadcastEvent(config.events.redirectToLogin, { state: config.stateEnums.login });
            }

        }

        function resetPssword(apiPath, data, xCvdSessionHeader) {
            commonApiHandler
                .putRequest(apiPath, data, xCvdSessionHeader)
                .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.resetPassword, result);
                commonHandler.broadcastEvent(config.events.redirectToLogin, { state: config.stateEnums.login });
            }
            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.resetPassword, error);
            }
        }
    }
})();