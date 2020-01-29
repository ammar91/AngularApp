(function () {
    'use strict';
    angular
        .module("cfvApp")
        .factory("commonHandler", commonHandler);
    commonHandler.$inject = ["$http", "$q", "$translate", "$modal", "$location", "$timeout", "$rootScope",
                             "$state", "$templateCache", "localStorageService", "config", "toaster", "lodash"];

    function commonHandler($http, $q, $translate, $modal, $location, $timeout, $rootScope, $state, $templateCache, localStorageService, config, toaster, lodash) {
        var service = {
            fixPageHeight: fixPageHeight,
            attachEvents: attachEvents,
            notifyUser: notifyUser,
            clearAppStorage: clearAppStorage,
            saveDataInLocalStorage: saveDataInLocalStorage,
            getLocalStorageData: getLocalStorageData,
            getStateName: getStateName,
            saveTemplateInCache: saveTemplateInCache,
            getTemplateById: getTemplateById,
            broadcastEvent: broadcastEvent,
            redirectToRoute: redirectToRoute,
            clearUrlParams: clearUrlParams,
            getPromises: getPromises,
            initializePopup: initializePopup,
            translateVariable: translateVariable,
            getReturnUrl: getReturnUrl

        };
        return service;

        function attachEvents() {
            angular.element(window).bind("load resize click scroll", function () {
                if (!angular.element("body").hasClass("body-small")) {
                    $timeout(fixPageHeight, 100)
                }
            })

            angular.element(window).bind("load resize", function () {
                if (angular.element(this).width() < 769) {
                    angular.element('body').addClass('body-small')
                } else {
                    angular.element('body').removeClass('body-small')
                }
            })
        }

        function fixPageHeight() {
            console.log("Height");
            var heightWithoutNavbar = $("body > #wrapper").height() - 61;
            angular.element(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
            var windowHeight = angular.element(window).height();
            angular.element("#page-wrapper").css("min-height", windowHeight + "px");
        }

        function clearAppStorage() {
            angular.forEach(config.appSotragekeys, function (value, key) {
                localStorageService.remove(key);
            });
        }

        function notifyUser(message, messageType) {
            var data = "{template: '" + config.notifySetting.templatePath + "', data: '" + message + "'}";
            $timeout(function () {
                toaster.clear();
                toaster.pop({
                    type: messageType,
                    title: "",
                    body: data,
                    timeout: 15000,
                    bodyOutputType: "templateWithData",
                    showCloseButton: true
                });
            }, 500);

        }

        function saveDataInLocalStorage(key, value) {
            localStorageService.set(key, value);
        }

        function getLocalStorageData(key) {
            return localStorageService.get(key);
        }

        function getStateName() {
            return $state.current.name;
        }

        function saveTemplateInCache(templateId, templatePath) {
            $templateCache.put(templateId, $http.get(templatePath));
        }

        function getTemplateById(templateId) {
            return $templateCache.get(templateId);
        }

        function broadcastEvent(eventName, data) {
            $rootScope.$broadcast(eventName, data);
        }

        function redirectToRoute(routeToGo, data) {
            var returnUrl = "";
            if (data != undefined && data.state == config.stateEnums.login) {
                $location.path(routeToGo).search(config.queryParams.returnUrl, data.returnUrl);
            } else {

                if (!lodash.isEmpty(data)) {
                    $location.path(routeToGo).search(data.paramName, data.paramValue);
                } else {
                    $location.path(routeToGo);
                }

            }
        }

        function clearUrlParams() {
            angular.forEach(config.queryParams, function (value, key) {
                $location.search(value, null);
            });

        }

        function getPromises(functionList) {
            return $q.all(functionList);
        }

        function initializePopup(modalOptions) {
            return $modal.open({
                templateUrl: modalOptions.templateUrl,
                size: modalOptions.size,
                controller: modalOptions.controller,
                controllerAs: modalOptions.controllerAs,
                keyboard: false,
                backdrop: "static",
                resolve: modalOptions.resolve
            });
        }

        function translateVariable(textId) {
            return $translate(textId)
        }

        function getReturnUrl() {
            return $location.url();
        }
    };


})();