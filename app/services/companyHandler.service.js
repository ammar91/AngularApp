(function () {
    "use strict";

    angular
        .module("cfvApp")
        .service("companyHandler", companyHandler);

    companyHandler.$inject = ["$http", "config", "appConstant", "commonHandler", "messageHandler", "commonApiHandler", "kendoHelper", "lodash"];

    function companyHandler($http, config, appConstant, commonHandler, messageHandler, commonApiHandler, kendoHelper, lodash) {
        var service = {
            createCompany: createCompany,
            getCompanies: getCompanies,
            getCompanyDetail: getCompanyDetail,
            activateCompany: activateCompany,
            deactivateCompany: deactivateCompany,
            updateCompanyDetail: updateCompanyDetail,
            getFilesDataSource: getFilesDataSource,
            getFilesAndFolderList: getFilesAndFolderList,
            getFilesOfFolder: getFilesOfFolder,
            extractData: extractData,
            getCompanyFiles: getCompanyFiles,
            handleFileStorageFolder: handleFileStorageFolder,
            getFolderDataSource: getFolderDataSource,
        }
        return service;

        function createCompany(apiPath, data) {
            return commonApiHandler
                    .postRequest(apiPath, data)
                    .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.addCompany, result);
                commonHandler.broadcastEvent(config.events.addCompany);
                return result.data;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.addCompany, error);
            }
        }

        function getCompanies(apiPath, listTemplate, addRecordTemplate) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            var options = {
                dataSource: getDataSource(),
                sortable: false,
                selectable: true,
                scrollable: true,
                pageable: true,
                editable: {
                    mode: "popup",
                    template: addRecordTemplate,
                    window: {
                        title: "Add Company"
                    }
                },
                edit: function (e) {

                },
                toolbar: [
                    { name: "create", text: "Add new company" }
                ],
                messages: {
                    commands: {
                        canceledit: "Cancel",
                        update: "Add"
                    }
                },
                filterable: {
                    extra: false,
                    messages: {
                        info: "Search Company",
                        filter: "Search",
                        clear: "Clear"
                    },
                    operators: {
                        string: {
                            eq: "Equal to"
                        }
                    }
                },
                columns: [
                    {
                        field: "name", title: "Company Name"
                    },
                    {
                        field: "isActive", title: "Is Active", filterable: false

                    },
                ],
                rowTemplate: listTemplate

            };
            return options;

            function getDataSource() {
                return {
                    type: "json",
                    transport: {
                        read: {
                            url: config.apiPaths.basePath + apiPath,
                            type: "GET",
                            beforeSend: function (req) {
                                req.setRequestHeader('Content-Type', "application/json");
                                req.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                            }
                        },
                        create: {
                            url: config.apiPaths.basePath + apiPath,
                            type: "POST",
                            beforeSend: function (req) {
                                req.setRequestHeader('Content-Type', "application/json");
                                req.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                            }
                        },
                        parameterMap: function (data, operation) {
                            if (operation !== config.kendoOperations.read) {
                                return kendo.stringify({ name: data.name });
                            } else {
                                return kendoHelper.getGridSearchParams(data, operation);
                            }
                        }
                    },
                    sync: function (e) {
                        if (e.type != config.kendoOperations.read)
                            commonHandler.broadcastEvent(config.events.addCompany);
                    },
                    error: function (error) {
                        kendoHelper.onKendoError(error.xhr.status, config.apiEndPoints.addCompany);
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                name: {
                                    editable: true,
                                    nullable: false,
                                    validation: { required: { message: "Company name is required" } }
                                },
                                isActive: {
                                    type: "boolean",
                                    editable: false,
                                    nullable: false,
                                    defaultValue: true,
                                },
                            }
                        },
                        data: function (res) {
                            return angular.fromJson(res)["companies"];
                        },
                        total: function (res) {
                            return angular.fromJson(res).totalCount;
                        }
                    }
                }

            };
        }

        function getCompanyDetail(apiPath) {
            return commonApiHandler
               .getRequest(apiPath)
               .then(success, failed);

            function success(result) {
                return result.data;
            }
            function failed(error) {

            }
        }

        function activateCompany(apiPath, data) {
            return commonApiHandler.putRequest(apiPath, data)
                         .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.activateCompany, result);
                return result;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.activateCompany, error);
            }
        }

        function deactivateCompany(apiPath, data) {
            return commonApiHandler.putRequest(apiPath, data)
                         .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.deactivateCompany, result);
                return result;
            }

            function failed(error) {
                messageHandler.showErrorMessage(config.apiEndPoints.deactivateCompany, error);
            }
        }

        function updateCompanyDetail(apiPath, data) {
            commonApiHandler
                .patchRequest(apiPath, data)
                .then(success, failed);

            function success(result) {
                messageHandler.showSuccessMessage(config.apiEndPoints.updateCompanyDetail, result);
            }

            function failed(error) {

            }
        }

        function getFilesDataSource(apiPath, companyId) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            return new kendo.data.HierarchicalDataSource({
                transport: {
                    read: {
                        cache: false,
                        url: function (options) {
                            var path = config.apiPaths.basePath + apiPath;
                            if (!lodash.isEmpty(options.name) && options.name != companyId) {
                                path = config.apiPaths.basePath + apiPath + options.name + "/";
                            }
                            return path;
                        },
                        dataType: "json",
                        type: "GET",
                        beforeSend: function (req) {
                            req.setRequestHeader('Content-Type', "application/json");
                            req.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                        }
                    },
                    parameterMap: function (data, operations) {
                        console.log(config.appVariable.count)
                        return {
                            maxRecursion: config.appVariable.count,
                            withVersionHistory: true
                        };
                    }
                },
                error: function (error) {
                    kendoHelper.onKendoError(error.xhr.status, config.apiEndPoints.getCompanyFiles);
                },
                requestEnd: function (e) {
                },
                schema: {
                    data: function (res) {
                        var data = [];
                        lodash.isEmpty(res.node.items) ?
                            data.push(res.node) :
                            data = res.node.items;
                        return data;
                    },
                    model: {
                        id: "name",
                        hasChildren: "hasItems"
                    }

                }
            });
        }

        function getFilesAndFolderList(apiPath, template) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            var loadingChild = "";
            return {
                dataSource: {
                    transport: {
                        read: {
                            url: function (options) {
                                var path = config.apiPaths.basePath + apiPath;
                                if (!lodash.isEmpty(options)) {
                                    path = config.apiPaths.basePath + apiPath + options.id + "/";
                                    loadingChild = options.id;
                                }
                                return path;
                            },
                            type: "GET",
                            dataType: "json",
                            beforeSend: function (req) {
                                req.setRequestHeader('Content-Type', "application/json");
                                req.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                            }

                        },
                        parameterMap: function (data, operations) {
                            return {
                                maxRecursion: 1,
                                withVersionHistory: true
                            };
                        }
                    },
                    error: function (error) {
                        kendoHelper.onKendoError(error.xhr.status, config.apiEndPoints.getCompanyFiles);
                    },
                    schema: {
                        model: {
                            id: "id",
                        },
                        data: function (res) {
                            var data = [];
                            return getFolderAndFiles(res, data, null, loadingChild);
                        },
                        total: function (res) {
                            //return angular.fromJson(res).totalCount;
                        },


                    }
                },
                expand: function (e) {
                    //config.appVariable.count = 1;
                },
                change: function (e) {
                    var selectedRow = this.select();
                    var dataItem = this.dataItem(selectedRow);
                    if (dataItem.type == "File" && lodash.contains(dataItem.name, "aef")) {
                        var data = {
                            paramName: config.queryParams.filePath,
                            paramValue: dataItem.path
                        }
                        commonHandler.redirectToRoute("editor", data)
                    }
                },
                selectable: "row",
                sortable: true,
                editable: false,
                columns: [
                    { field: "name", title: "Name", sortable: true },
                    { field: "type", title: "Type", sortable: false },
                    { field: "lastModified", title: "Modified Date", sortable: true },
                    { field: "lastModifiedBy", title: "Modified By", sortable: false }
                ]
            };

        }

        function getFolderAndFiles(res, data, parentId, loadingChild) {
            lodash.forEach(res, function (value, key) {
                var item = {
                    id: value.name,
                    name: parentId == null ? "/" : value.name,
                    lastModifiedBy: value.lastModifiedBy,
                    lastModified: moment(value.lastModified).format(config.dateFormats.momentFormat),
                    path: value.path,
                    type: value.type,
                    hasChildren: value.hasItems,
                    parentId: !lodash.isNull(parentId) ? parentId : null
                }
                data.push(item);
            });
            var folder = lodash.find(res, { type: "Folder" }, res);
            if (!lodash.isEmpty(folder) && !lodash.isEmpty(folder.items)) {
                getFolderAndFiles(folder.items, data, folder.name);
            }
            if (!lodash.isEmpty(loadingChild)) {
                data.shift();
            }
            return data;
        }

        function getFolderDataSource(apiPath, companyId) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            return new kendo.data.HierarchicalDataSource({
                transport: {
                    read: {
                        url: function (options) {
                            var path = config.apiPaths.basePath + apiPath + config.appVariable.folderPath;
                            return path;
                        },
                        dataType: "json",
                        type: "GET",
                        beforeSend: function (req) {
                            req.setRequestHeader('Content-Type', "application/json");
                            req.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                        }
                    },
                    parameterMap: function (data, operations) {
                        return {
                            maxRecursion: 1,
                            withVersionHistory: true
                        };
                    }
                },
                error: function (error) {
                    kendoHelper.onKendoError(error.xhr.status, config.apiEndPoints.getCompanyFiles);
                },
                requestEnd: function (e) {
                },
                schema: {
                    data: function (res) {
                        return extractData(res, "Folder");
                    },
                    model: {
                        id: "name",
                        hasChildren: "hasItems"
                    }

                }
            });
        }

        function extractData(res, type) {
            var data = [];
            if (!lodash.isEmpty(res)) {
                var parentItem = res.node;
                if (parentItem.hasItems) {
                    lodash.forEach(parentItem.items, function (value, key) {
                        if (value.type == type) {
                            var item = {
                                name: value.name,
                                type: value.type,
                                size: value.size,
                                totalRevisions: lodash.isEmpty(value.versions) ? 0 : value.versions.length,
                                lastModified: value.lastModified,
                                lastModifiedBy: value.lastModifiedBy,
                                revisions: value.versions,
                                path: value.path,
                                hasItems: value.hasItems
                            };
                            data.push(item);
                        }
                    });
                }
            }
            return data;
        }

        function getFilesOfFolder(apiPath) {
            return commonApiHandler
                            .getRequest(apiPath)
                            .then(success, failed);
            function success(result) {
                return result.data;
            }
            function failed(error) {

            }
        }

        function getCompanyFiles(rowTemplate) {
            return {
                autoBind: false,
                sortable: false,
                selectable: true,
                scrollable: true,
                pageable: false,
                editable: false,
                filterable: {
                    extra: false,
                    messages: {
                        info: "Search Files",
                        filter: "Search",
                        clear: "Clear"
                    },
                    operators: {
                        string: {
                            eq: "Equal to"
                        }
                    }
                },
                columns: [
                    {
                        field: "name", title: "Name", filterable: true
                    },
                    {
                        field: "", title: "File Size", filterable: false
                    },
                    {
                        field: "", title: "Revisions", filterable: false
                    },
                    {
                        field: "", title: "Last Modified", filterable: false
                    },
                    {
                        field: "", title: "Last Modified By", filterable: false
                    }
                ],
                rowTemplate: rowTemplate

            };
        }

        function handleFileStorageFolder(apiPath, option) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            if (option == config.fileStorageFolderOptions.createFolder) {
                apiPath = apiPath + "?" + config.fileStorageFolderOptions.createFolder
                var httpConfig = {
                    headers: {
                        "X-CVD-Session": session["x-cvd-session"]
                    }
                };
                commonApiHandler.putRequest(apiPath, {}, session["x-cvd-session"], "application/json").success(function (data, status) {
                    messageHandler.showMessage("data", "success");
                }).error(function (data, status) {
                    messageHandler.showMessage("data", "error");
                });
            }
        }
    }
})();