(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('UserCompany', UserCompany);

    UserCompany.$inject = ["$rootScope", "$location", "$scope", "config", "commonHandler", "lodash", "messageHandler", "companyHandler", "fileStorageHandler"];

    function UserCompany($rootScope, $location, $scope, config, commonHandler, lodash, messageHandler, companyHandler, fileStorageHandler) {
        var userCompany = this;


        userCompany.breadCrumbs = [];


        userCompany.openUploadFilesWindow = openUploadFilesWindow;
        userCompany.createFolder = createFolder;
        userCompany.onFileSelect = onFileSelect;
        userCompany.isTreeviewHasFolder = false;//Hide add new folder option for treeview
        userCompany.createFolderAtRoot = function () {
            folderMenuActions(config.contextMenu.folderMenu.newFolder);
        };
        activate();

        function activate() {
            userCompany.userDetail = commonHandler.getLocalStorageData(config.appSotragekeys.userInfo).user;
            userCompany.companyLogo = config.apiPaths.basePath + "api/assets/companies/" + userCompany.userDetail.companyId + "/logo";
            config.appVariable.count = 0;

            config.appVariable.folderPath = "";


            //Add event for create and deleting folder in selected node
            // userCompany.addNewFolder = addNewFolder;
            //userCompany.deleteFolder = deleteFolder;
            //userCompany.deleteSelectedFile = deleteSelectedFile;
            //bindFilesAndFolderTreeView();
            initializeUploader();
            activateUploadWindow();
            //New mockup treeview left side
            bindFolderTreeView();
            bindFilesGrid();
            initializeMenu();
            //boradcast event for disappear the drop zone from grid after file upload
            $rootScope.$on("droppedFileStatus", function () {
                angular.element("#gridDragDropUpload").hide();
                if (userCompany.selectedNode != undefined)
                    getFilesOfFolder(userCompany.selectedNode)
            });

        }

        function activateUploadWindow() {
            commonHandler.translateVariable('USER.COMPANY_FILES.MODAL.UPLOAD_FILES.HEADING').then(function (title) {
                userCompany.uploadFilesWindowOptions = {
                    title: title,
                    width: 600,
                    //height: 450,
                    visible: false,
                    resizable: false,
                    content: {
                        url: "cfv/app/users/company/modal/upload-files.html"
                    }
                };
            });

        }

        function openUploadFilesWindow(uploadFilesWindow) {
            uploadFilesWindow.center().open();
            config.appVariable.count = 0;
            var treeview = angular.element("#folderTreeView").data('kendoTreeView');
            lodash.isEmpty(treeview) ? bindFolderTreeView() : treeview.dataSource.read();
            userCompany.selectedNode = '';

        }

        function bindFilesAndFolderTreeView() {
            var filesTemplate = commonHandler.getTemplateById(config.templateIds.user.companyFiles);
            filesTemplate.then(function (markup) {
                userCompany.treeListViewOptions =
                        companyHandler.getFilesAndFolderList("api/fs/companies/" + userCompany.userDetail.companyId + "/", markup.data);
            });
        }

        function bindFolderTreeView() {
            config.appVariable.count = 0;
            var folderTemplate = commonHandler.getTemplateById(config.templateIds.user.companyFolders);
            folderTemplate.then(function (markup) {
                userCompany.folderOptions = {
                    template: markup.data,
                    loadOnDemand: true,
                    dataSource: companyHandler.getFolderDataSource("api/fs/companies/" + userCompany.userDetail.companyId + "/", userCompany.userDetail.companyId),
                    expand: function (e) {
                        var currentPath = getNodePath(e);
                        config.appVariable.folderPath = currentPath;
                    },
                    dataTextField: "name",
                    select: function (e) {
                        var folderPath = getNodePath(e);
                        getFilesOfFolder(folderPath);
                        setBreadCrumbs(e);
                        userCompany.selectedFolderPath = folderPath;
                        userCompany.selectedFolder = angular.element("#folderTreeView").data('kendoTreeView').dataItem(e.node);
                        //var selectedFolder = angular.element("#folderTreeView").data('kendoTreeView').dataItem(e.node);
                        //getFilesOfFolder(selectedFolder);
                        userCompany.selectedNode = angular.element("#folderTreeView").data('kendoTreeView').dataItem(e.node);
                        //Refresh grid on select files treeview
                        //getFilesOfFolder(userCompany.selectedNode);
                    },
                    dataBound: function (e) {
                        //Show the add new folder option if compnay hasn't a folder in their directory.
                        if (this.dataSource.data().length == 0)
                            userCompany.isTreeviewHasFolder = true;
                    }
                };
            });

        }

        function initializeUploader() {
            commonHandler.translateVariable("USER.COMPANY_FILES.MODAL.BUTTONS.UPLOAD_LOGO").then(function (text) {
                userCompany.uploaderOptions = {
                    async: {
                        saveUrl: config.apiPaths.basePath
                    },
                    multiple: false,
                    showFileList: false,
                    localization: {
                        select: text,
                    },
                    upload: onUpload,
                    success: function (e) {
                        var apiResponse = {
                            status: e.XMLHttpRequest.status
                        };
                        //broadcast the droopedFileStatus event
                        $rootScope.$broadcast("droppedFileStatus");
                        messageHandler.showSuccessMessage(config.apiEndPoints.fileUpload, apiResponse);
                    },
                    error: function (e) {
                        //broadcast the droopedFileStatus event
                        $rootScope.$broadcast("droppedFileStatus");
                        var apiResponse = {
                            status: e.XMLHttpRequest.status
                        };
                        messageHandler.showErrorMessage(config.apiEndPoints.fileUpload, apiResponse);
                    }
                };
            });

        }

        function onUpload(e) {
            var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
            var xhr = e.XMLHttpRequest;
            var isAllowed = isUploadAllowed();
            if (xhr && isAllowed) {
                e.sender.options.async.saveUrl = getUrl();
                xhr.addEventListener("readystatechange", function (e) {
                    if (xhr.readyState == 1 /* OPENED */) {
                        xhr.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                    }
                });
            } else {
                e.preventDefault();
            }

            function getUrl() {
                var companyId = userCompany.userDetail.companyId;
                var saveUrl = config.apiPaths.basePath + "api/fs/companies/" + companyId + "/" + lodash.first(e.files).name + "?uploadFile";
                if (userCompany.selectedNode.name != companyId) {
                    saveUrl = config.apiPaths.basePath + "api/fs/companies/" + companyId + "/" + userCompany.selectedNode.name + "/" + lodash.first(e.files).name + "?uploadFile";
                }
                return saveUrl;
            }

            function isUploadAllowed() {
                var success = false;
                if (lodash.isEmpty(userCompany.selectedNode)) {
                    //broadcast the droopedFileStatus event
                    $rootScope.$broadcast("droppedFileStatus");
                    //Raised the message if folder not selected from tree view and prevent to do upload action.
                    messageHandler.showMessage("USER.COMPANY_FILES.ERRORS.SELECT_FOLDER", config.messageType.error);
                } else {
                    lodash.forEach(e.files, function (value, key) {
                        if (lodash.contains(config.fileTypes, value.extension.toLowerCase())) {
                            success = true;
                        } else {
                            //broadcast the droopedFileStatus event
                            $rootScope.$broadcast("droppedFileStatus");
                            messageHandler.showMessage("USER.COMPANY_FILES.ERRORS.UPLOAD_ERROR", config.messageType.error);
                        }
                    });
                }
                return success;
            }
        }

        function getFilesOfFolder(folderPath) {
            companyHandler
                .getFilesOfFolder("api/fs/companies/" + userCompany.userDetail.companyId + "/" + folderPath + "?maxRecursion=1&withVersionHistory=true")
                .then(success);

            function success(result) {
                var files = companyHandler.extractData(result, "File");
                var grid = angular.element("#filesGrid").data("kendoGrid");
                grid.dataSource.data(files);
            }
        }
        //set grid options
        function bindFilesGrid() {
            var companyFileListTmpl = commonHandler.getTemplateById(config.templateIds.user.companyFileList);
            companyFileListTmpl.then(function (markup) {
                userCompany.filesGridOptions = companyHandler.getCompanyFiles(markup.data);
            });
        }

        function onFileSelect(kendoEvent) {
            var grid = kendoEvent.sender;
            userCompany.selectedFile = grid.dataItem(grid.select());
            setMenuItem();

            function setMenuItem() {
                var subMenuItem = [];
                lodash.forEach(userCompany.selectedFile.revisions, function (value, key) {
                    subMenuItem.push(
                    {
                        value: value.id,
                        text: '<span data-id="' + value.id + '">' + moment(value.timeStamp).format("YYYY-MM-DD hh:mm A") + '</span>',
                        encoded: false,
                    });
                })
                var menuItem = [{ text: "new file" }, { text: "open file" }, { text: "delete file" }, { text: "revisions", items: subMenuItem }];
                var contextMenu = angular.element("#filesMenu").data("kendoContextMenu");
                contextMenu.setOptions({
                    dataSource: menuItem
                })
            }

        }

        function initializeMenu() {
            activateFolderPopup();
            activateFolderMenu();
            activateFilesMenu();
        }

        function activateFolderPopup() {
            commonHandler.translateVariable('USER.COMPANY_FILES.MODAL.CREATE_FOLDER.HEADING').then(function (title) {
                userCompany.folderWindowOptions = {
                    title: title,
                    width: 350,
                    height: 100,
                    visible: false,
                    resizable: false,
                    content: {
                        url: "cfv/app/users/company/modal/create-folder.html"
                    }
                };
            });

        }
        function activateFolderMenu() {
            userCompany.folderMenuOptions = {
                target: "#folderTreeView",
                alignToAnchor: false,
                filter: "li",
                open: function (e) {
                    lodash.isEmpty(userCompany.selectedFolder) ?
                        e.preventDefault() : "";
                },
                select: function (e) {
                    var selectedMenuText = angular.element(e.item).text();
                    folderMenuActions(selectedMenuText);
                }
            }
        }
        function folderMenuActions(action) {
            var folderPath = lodash.trim(userCompany.selectedFolderPath, "/");
            switch (action) {
                case config.contextMenu.folderMenu.newFolder:
                    userCompany.createFolderWindow.center().open();
                    break;
                case config.contextMenu.folderMenu.deleteFolder:
                    deleteFolder();
                    break;

                default:
            }

            function deleteFolder() {
                fileStorageHandler
                .deleteNode("api/fs/companies/" + userCompany.userDetail.companyId + "/" + folderPath)
                .then(function (result) {
                    console.log(result);
                });

            }
        }
        function createFolder() {
            var _selectedFolderPath = userCompany.selectedFolderPath == undefined ? "" : userCompany.selectedFolderPath;
            fileStorageHandler
                   .createFolder("api/fs/companies/" + userCompany.userDetail.companyId + "/" + _selectedFolderPath + userCompany.folderName + "?createFolder")
                   .then(function (result) {
                       if (!lodash.isEmpty(result)) {
                           var treeview = angular.element("#folderTreeView").data('kendoTreeView');
                           userCompany.createFolderWindow.close();
                           userCompany.folderName = "";
                           config.appVariable.folderPath = "",
                           treeview.dataSource.read();
                       }
                   });
        }

        function activateFilesMenu(menuItems) {
            userCompany.filesMenuOptions = {
                target: "#filesGrid",
                alignToAnchor: true,
                filter: "tr",
                open: onOpen,
                select: function (e) {
                    var selectedMenuText = angular.element(e.item).text();
                    var selectedMenuId = angular.element(angular.element(angular.element(e.item).children()[0]).children()[0]).attr("data-id");
                    filesMenuActions(selectedMenuText, selectedMenuId);
                }

            }

            function onOpen(e) {
                if (!lodash.isEmpty(userCompany.selectedFile)) {
                } else {
                    e.preventDefault();
                }

            }
        }
        function filesMenuActions(action, selectedMenuId) {
            switch (action) {
                case config.contextMenu.filesMenu.openFile:
                    openFile(selectedMenuId);
                    break;
                default:
                    openFile(selectedMenuId);
            }

            function openFile(selectedMenuId) {
                if (userCompany.selectedFile.type == "File" && lodash.contains(userCompany.selectedFile.name, config.fileTypes.aef)) {
                    //var data = {
                    // paramName: config.queryParams.version,
                    //    paramValue: lodash.isEmpty(selectedMenuId) ? userCompany.selectedFile.path : selectedMenuId
                    //}
                    $location.path(config.stateEnums.editor).search({ path: userCompany.selectedFile.path, version: selectedMenuId })
                }
            }
        }



        function setBreadCrumbs(e) {
            userCompany.breadCrumbs = [];
            var treeview = angular.element("#folderTreeView").data('kendoTreeView');
            var selectedNode = treeview.dataItem(e.node);
            var parent = treeview.parent(treeview.findByUid(selectedNode.uid));
            var nodes = getAllParentNodes(treeview, parent);
            lodash.forEach(nodes, function (value, key) {
                userCompany.breadCrumbs.push({ name: nodes.pop() });
            });
            userCompany.breadCrumbs.push({ name: selectedNode.name });
        }

        function getNodePath(e) {
            var path = "";
            var nodes = [];
            var treeview = angular.element("#folderTreeView").data('kendoTreeView');

            var selectedNode = treeview.dataItem(e.node);
            var parent = treeview.parent(treeview.findByUid(selectedNode.uid));
            var nodes = getAllParentNodes(treeview, parent);

            if (!lodash.isEmpty(nodes)) {
                lodash.forEach(nodes, function (value, key) {
                    path += nodes.pop() + "/";
                });
                path += selectedNode.name + "/"
            }
            else {
                path += selectedNode.name + "/";
            }
            return path
        }

        function getAllParentNodes(treeview, parent) {
            var parentNodes = [];
            if (parent.length > 0) {
                while (parent.length > 0) {
                    parentNodes.push(treeview.text(parent));
                    var node = treeview.dataItem(parent);
                    parent = treeview.parent(treeview.findByUid(node.uid));
                }
            };
            return parentNodes;
        }


        //function addNewFolder() {
        //    //alert("Add new folder");
        //    return;
        //    //Create folder
        //    var apipath = "api/fs/companies/" + userCompany.userDetail.companyId + "/myfolder";
        //    console.log(apipath);
        //    companyHandler.handleFileStorageFolder(apipath, config.fileStorageFolderOptions.createFolder);
        //}

        //function deleteFolder() {
        //    alert("delete folder");
        //}

        //function deleteSelectedFile() {
        //    alert("delete selected");
        //}
    }
})();
