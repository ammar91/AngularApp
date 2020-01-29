(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('fileStorageHandler', fileStorageHandler);

    fileStorageHandler.$inject = ["$http", "config", "appConstant", "commonHandler", "messageHandler", "commonApiHandler", "kendoHelper", "lodash"];

    function fileStorageHandler($http, config, appConstant, commonHandler, messageHandler, commonApiHandler, kendoHelper, lodash) {
        var service = {
            deleteNode: deleteNode,
            createFolder: createFolder
        };
        return service;

        function deleteNode(nodePath) {
            return commonApiHandler
                .deleteRequest(nodePath)
                .then(success, failed);

            function success(result) {
                return result.data;
            }

            function failed(error) {

            }
        }

        function createFolder(apiPath) {
            return commonApiHandler
                    .putRequest(apiPath)
                    .then(success, failed);
            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.createFolder, result);
                return result.data
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.createFolder, error);
            }
        }
    }
})();