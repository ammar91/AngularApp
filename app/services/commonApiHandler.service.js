(function () {
    'use strict';
    angular
        .module('cfvApp')
        .service('commonApiHandler', commonApiHandler);

    commonApiHandler.$inject = ['$http', "$location", "config", "messageHandler", "commonHandler", "lodash"];

    function commonApiHandler($http, $location, config, messageHandler, commonHandler, lodash) {
        var maskNesting = 0;
        var service = {
            getRequest: getRequest,
            postRequest: postRequest,
            postRequestWithOutHeader: postRequestWithOutHeader,
            putRequest: putRequest,
            patchRequest: patchRequest,
            deleteRequest: deleteRequest,
            
            //xml response using jQuery as angular do not allow xml response
            requestXML: requestXML,
            
            //file download request
            requestFile: requestFile
                    
        }
        return service;

        function getRequest(apiPath) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);

            return $http
                .get(config.apiPaths.basePath + apiPath, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CVD-Session": session["x-cvd-session"]
                    }
                });

        }

        function requestXML(apiPath, success, error, maskElemId, method, data) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);

            $.ajax(config.apiPaths.basePath + apiPath, {
                    headers: {
                        "Content-Type": 'application/xml',
                        "X-CVD-Session": session["x-cvd-session"]
                    },
                    type: method? method : 'GET',
                    success: success,
                    error: error,
                    data: data
                    ,
                    beforeSend: function() {
                        if (maskElemId) {
                            maskNesting++;
                            $('#'+maskElemId).addClass("loading");
                        }
                    },
                    complete: function(){
                        if (maskElemId) {
                            maskNesting--;
                            if (maskNesting == 0)
                                $('#'+maskElemId).removeClass("loading");
                        }
                    }
                });

        }

        function setCookie(cname, cvalue, exMin, path) {
            var d = new Date();
            d.setTime(d.getTime() + (exMin*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + (path? path : "/");
        }

        function requestFile(apiPath, success, error) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            
            setCookie("session", session["x-cvd-session"], 5);
            Pace.restart();
            $.fileDownload(config.apiPaths.basePath + apiPath, {
                    successCallback: success,
                    failCallback: error
                });

        }
        
        function postRequest(apiPath, data, xCvdSessionHeader) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            return $http
                .post(config.apiPaths.basePath + apiPath, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CVD-Session": xCvdSessionHeader != undefined ? xCvdSessionHeader : session["x-cvd-session"]
                    },

                });
        }

        function putRequest(apiPath, data, xCvdSessionHeader, contentType) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            return $http
                .put(config.apiPaths.basePath + apiPath, data, {
                    headers: {
                        "Content-Type": contentType != undefined ? contentType : "application/json",
                        "X-CVD-Session": xCvdSessionHeader != undefined ? xCvdSessionHeader : session["x-cvd-session"]
                    },

                });
        };

        function patchRequest(apiPath, data) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            return $http
                       .patch(config.apiPaths.basePath + apiPath, data, {
                           headers: {
                               "Content-Type": "application/json",
                               "X-CVD-Session": session["x-cvd-session"]
                           }
                       });
        }

        function postRequestWithOutHeader(apiPath, data) {
            return $http
                    .post(config.apiPaths.basePath + apiPath, data,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
        }

        function deleteRequest(apiPath) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            return $http
                .delete(config.apiPaths.basePath + apiPath,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CVD-Session": session["x-cvd-session"]
                    }
                });
        }
    }
})();