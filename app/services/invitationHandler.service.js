(function () {
    'use strict';

    angular
        .module('cfvApp')
        .factory('invitationHandler', invitationHandler);

    invitationHandler.$inject = ['$http', "config", "messageHandler", "commonHandler", "commonApiHandler"];

    function invitationHandler($http, config, messageHandler, commonHandler, commonApiHandler) {
        var service = {
            sendInvitation: sendInvitation,
            authenticateInvitation: authenticateInvitation,
            acceptInvitation: acceptInvitation

        };
        return service;

        function sendInvitation(apiPath, data) {
            return commonApiHandler
                        .postRequest(apiPath, data)
                        .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.inviteUser, result);
                return result;
            }
            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.inviteUser, error);
            }
        }

        function authenticateInvitation(apiPath, data) {
            return commonApiHandler
                         .postRequestWithOutHeader(apiPath, data)
                         .then(success, failed);

            function success(result) {
                return result.data;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.authToken, error);
                commonHandler.broadcastEvent(config.events.redirectToLogin, { state: config.stateEnums.login });
            }
        }

        function acceptInvitation(apiPath, data, xCvdSessionHeader) {
            return commonApiHandler
                .postRequest(apiPath, data, xCvdSessionHeader)
                .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.acceptInvite, result);
                commonHandler.broadcastEvent(config.events.redirectToLogin, { state: config.stateEnums.login });
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.acceptInvite, error);
            }
        }
    }
})();