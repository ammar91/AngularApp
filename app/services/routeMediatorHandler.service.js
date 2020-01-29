(function () {
    'use strict';

    // TODO: replace app with your module name
    angular
        .module('cfvApp')
        .factory("routeMediatorHandler", routeMediatorHandler);

    routeMediatorHandler.$inject = ["$timeout", '$rootScope', "$state", "config", "commonHandler", "$location", "lodash"];

    function routeMediatorHandler($timeout, $rootScope, $state, config, commonHandler, $location, lodash) {
        // Define the functions and properties to reveal.
        var service = {
            setRoutingHandlers: setRoutingHandlers
        };

        return service;

        function setRoutingHandlers() {
            handlingRoutes();
        }

        function handlingRoutes() {
            $rootScope.$on('$stateChangeStart', listener);
            function listener(event, toState, toParams, fromState, fromParams) {
                if (fromState.name == 'editor') { //hide editor outline
                    commonHandler.broadcastEvent(config.events.editorClosed);
                }
                setPageTitle(toState);
                if (toState.name == config.stateEnums.login &&
                    !toState.secure && lodash.contains($location.url(), config.queryParams.tokenParam)) {
                    clearUrlParams(toState);
                }
                else if (toState && toState.secure) {
                    if (!commonHandler.getLocalStorageData(config.appSotragekeys.userInfo)) {
                        commonHandler.broadcastEvent(config.events.redirectToLogin,
                                          { state: config.stateEnums.login, returnUrl: commonHandler.getReturnUrl() });
                    } else {
                        toState.name != config.stateEnums.editor ? clearUrlParams(toState) : null;
                        commonHandler.broadcastEvent(config.events.isUserLoggedIn, { state: toState.name });
                        var user = commonHandler.getLocalStorageData(config.appSotragekeys.userInfo);
                        if (!lodash.isEmpty(toState.roles) && !lodash.contains(toState.roles, user.roles[0]))
                            commonHandler.redirectToRoute(config.stateEnums.myCompany);
                    }
                    return false;
                }
                return false;

            }
        }

        function setPageTitle(toState) {
            var title = 'CFV';
            if (toState.data && toState.data.pageTitle) title = 'CFV | ' + toState.data.pageTitle;
            $timeout(function () {
                $rootScope.title = title;
            });

        }

        function clearUrlParams(toState) {
            if (toState.name == config.stateEnums.invitations || toState.name == config.stateEnums.resetPassword) {
            } else {
                commonHandler.clearUrlParams();
            }
        }
    }
})();