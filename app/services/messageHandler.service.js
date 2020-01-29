(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('messageHandler', messageHandler);

    messageHandler.$inject = ["config", "commonHandler", "lodash"];

    function messageHandler(config, commonHandler, lodash) {
        var service = {
            showMessage: showMessage,
            showSuccessMessage: showSuccessMessage,
            showErrorMessage: showErrorMessage
        };
        return service;

        function showSuccessMessage(apiType, apiResponse) {

            var message = lodash.find(apiSuccessMessages, { 'apiType': apiType, 'status': apiResponse.status }, 'success');
            if (message != undefined)
                commonHandler.notifyUser(message.message, message.notifyType);

        }

        function showErrorMessage(apiType, apiResponse) {
            var message = lodash.find(apiErrorMessages, { 'apiType': apiType, 'status': apiResponse.status }, 'error');
            if (message != undefined) {
                commonHandler.notifyUser(message.message, message.notifyType);
            }
        }

        function showMessage(message, messageType) {
            commonHandler.notifyUser(message, messageType);
        }
    }
})();