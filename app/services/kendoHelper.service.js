(function () {
    'use strict';

    angular
        .module('cfvApp')
        .service('kendoHelper', kendoHelper);

    kendoHelper.$inject = ["$location", "config", "commonHandler", "messageHandler", "lodash"];

    function kendoHelper($location, config, commonHandler, messageHandler, lodash) {
        var service = {
            onKendoError: onKendoError,
            getGridSearchParams: getGridSearchParams,
            getGridOptions: getGridOptions,
            getDropdownOptions: getDropdownOptions
        };
        return service;

        function getGridOptions(settings) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            var options = {
                dataSource: {
                    type: "json",
                    transport: {
                        read: {

                            url: config.apiPaths.basePath + settings.apiPath,
                            type: "GET",
                            beforeSend: function (req) {
                                req.setRequestHeader('Content-Type', "application/json");
                                req.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                            }
                        },
                        parameterMap: function (data, type) {
                            return getGridSearchParams(data, type);
                        }
                    },
                    error: function (error) {
                        onKendoError(error.xhr.status);
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    schema: {
                        data: function (res) {
                            return angular.fromJson(res)[settings.collectionName];
                        },
                        total: function (res) {
                            return angular.fromJson(res).totalCount;
                        }
                    }
                },
                //dataBinding: function gridDataBound(e) {
                //    var grid = e.sender;
                //    if (grid.dataSource.total() == 0) {
                //        var colCount = grid.columns.length;
                //        angular.element(e.sender.wrapper)
                //            .find('tbody')
                //            .append('<tr class="kendo-data-row"><td colspan="' + colCount + '" class="no-data">There is no data to show in the grid.</td></tr>');
                //    }
                //},
                sortable: false,
                selectable: true,
                scrollable: true,
                pageable: true,
                columns: settings.columns,
                rowTemplate: settings.rowTemplate
            };
            return options;
        }

        function getDropdownOptions(data, textField, valueField, optionLabel) {
            var options = {
                optionLabel: lodash.isEmpty(optionLabel) ? "--- Select ---" : optionLabel,
                dataTextField: textField,
                dataValueField: valueField,
                dataSource: {
                    data: data
                }
            };
            return options;
        }

        function onKendoError(status, apiEndPoint) {
            if (status == config.apiErrorCodes.unAuthorized) {
                if (!lodash.contains($location.url(), config.queryParams.returnUrl))
                    commonHandler.broadcastEvent(config.events.redirectToLogin, { state: config.stateEnums.login, returnUrl: commonHandler.getReturnUrl() })
            }
            if (status == config.apiErrorCodes.conflict) {
                var apiResponse = {
                    status: status
                }
                messageHandler.showErrorMessage(apiEndPoint, apiResponse);
            }
        }

        function getGridSearchParams(data, type) {
            var params = {
                offset: data.skip,
                limit: 20
            };
            if (data.filter != undefined) {
                lodash.assign(params, { search: data.filter.filters[0].value })
            };
            return params;
        }
    }
})();