(function () {
    'use strict';
    angular
        .module('cfvApp')
        .controller("EditorController", EditorController);

    EditorController.$inject = ['$scope', "$modal", "$compile", "$http", "config", "$location", 'commonApiHandler', 'commonHandler', "lodash"];

    function EditorController($scope, $modal, $compile, $http, config, $location, commonApiHandler, commonHandler, lodash) {
        function doAction(e) {
            $scope.editor.getEditor().execute(e.id);
        };

        function gotoPage(e) {
            var dropdownlist = $("#editorPages").data("kendoDropDownList");
            var curr = dropdownlist.select();
            if (e.id === 'prevPage') {
                dropdownlist.select(curr - 1);
            } else {
                dropdownlist.select(curr + 1);
            }
        };

        function doExport(e) {
            // var exportIframe = $('#exportIframe');
            // if (!exportIframe) {
            // exportIframe = document.createElement('iframe');
            // exportIframe.id = 'exportIframe';
            // exportIframe.style.display = 'none';
            // document.body.appendChild(exportIframe);
            // }
            var type;            switch (e.id) {
                case 'expPDFAll':
                case 'expPDF':
                    type = 'pdf';
                    break;
                case 'expPNG':
                    type = 'png';
                    break;
                case 'expJPG':
                    type = 'jpg';
                    break;
            }
            var pageId = $("#editorPages").val();
            commonApiHandler
                        .requestFile("api/fs" + $scope.filePath + '?processAs=mxGraph&exportTo=' + type + (e.id == 'expPDFAll' ? '' : '&pageId=' + pageId),
                        function () {
                            commonHandler.notifyUser("Export completed successfully.", "info");
                        },
                        function (response) {
                            commonHandler.notifyUser("Export failed, please try again later.", "error");
                        }
                    );
        };

        function toggleCells(e) {
            var isLabel = e.id == 'toggleLbl';
            $scope.editor.setVisibilityCellOfType(isLabel ? Label : CVDAnnotation, !e.checked, isLabel ? 'isLabel' : null);
        };

        $("#editorToolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    buttons: [
                        { spriteCssClass: "fa fa-step-backward", id: 'prevPage', click: gotoPage, text: "Previous Page", showText: "overflow" },
                        { spriteCssClass: "fa fa-step-forward", id: "nextPage", click: gotoPage, text: "Next Page", showText: "overflow" },
                    ]
                },
                { type: "button", spriteCssClass: "fa fa-arrow-up", id: 'parentDiagram', click: doAction, text: "Go to Parent Diagram", showText: "overflow"  },
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "Page Setup", id: 'pageSetup', click: showPageSetup },
                        { spriteCssClass: "fa fa-print", id: "print", click: doAction, text: "Print", showText: "overflow"  },
                        { spriteCssClass: "fa fa-save", id: "save", click: doAction , text: "Save", showText: "overflow" }
                    ]
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { spriteCssClass: "fa fa-undo", id: "undo", click: doAction, text: "Undo", showText: "overflow" },
                        { spriteCssClass: "fa fa-repeat", id: "redo", click: doAction, text: "Redo", showText: "overflow"  },
                        { spriteCssClass: "fa fa-copy", id: "copy", click: doAction, text: "Copy", showText: "overflow"  },
                        { spriteCssClass: "fa fa-cut", id: "cut", click: doAction, text: "Cut", showText: "overflow"  },
                        { spriteCssClass: "fa fa-paste", id: "paste", click: doAction, text: "Paste", showText: "overflow"  }
                    ]
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { imageUrl: 'images/zoom_in.png', id: "zoomIn", click: doAction, text: "Zoom In", showText: "overflow"  },
                        { imageUrl: 'images/zoom_out.png', id: "zoomOut", click: doAction, text: "Zoom Out", showText: "overflow"  },
                        { imageUrl: 'images/view_1_1.png', id: "actualSize", click: doAction, text: "Actual Size", showText: "overflow"  },
                        { imageUrl: 'images/fit_to_size.png', id: "fit", click: doAction, text: "Fit", showText: "overflow"  }
                    ]
                },
                { type: "button", spriteCssClass: "fa fa-magic", id: "layout", click: doAction, text: "Layout", showText: "overflow"  },
                { type: "separator" },
                { template: "<label>Pages:</label>" },
                {
                    template: "<input id='editorPages' style='width: 200px;' />",
                    overflow: "never"
                },
                { type: "separator" },
                { type: "button", spriteCssClass: "fa fa-comment", id: "addAnnotation", click: doAction, text: "Add Annotations", showText: "overflow"  },
                { type: "separator" },
                { type: "button", spriteCssClass: "fa fa-list-alt", id: "fileVariablesBtn", click: showFileVariables, text: "Variables", showText: "overflow"  },
                { type: "separator" },
                {
                    type: "splitButton",
                    text: "Export All to PDF",
                    click: doExport,
                    id: "expPDFAll",
                    menuButtons: [
                        { text: "Export Page to PDF", id: "expPDF", click: doExport },
                        { text: "Export Page to PNG", id: "expPNG", click: doExport },
                        { text: "Export Page to JPG", id: "expJPG", click: doExport }
                    ]
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { spriteCssClass: "fa fa-circle-thin", id: "toggleLbl", togglable: true, toggle: toggleCells, text: "Show/Hide labels", showText: "overflow"  },
                        { spriteCssClass: "fa fa-comments-o", id: "toggleAnnot", togglable: true, toggle: toggleCells, text: "Show/Hide Annotations", showText: "overflow"  }
                    ]
                }
            ]
        });


        $("#editorPages").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "value",
            dataSource: [],
            cascade: changeEditorPage
        });

        var ignorePageSelect = true;
        function changeEditorPage() {
            if (ignorePageSelect) return;

            var value = $("#editorPages").val();

            var dropdownlist = $("#editorPages").data("kendoDropDownList");
            var toolbar = $("#editorToolbar").data("kendoToolBar");
            var curr = dropdownlist.select();

            $scope.editor.openPage(value, dropdownlist.dataSource.at(curr).name);


            var limit = dropdownlist.dataSource.total();
            if (curr <= 0) {
                toolbar.enable("#prevPage", false);
                toolbar.enable("#nextPage");
            } else if (curr >= limit - 1) {
                toolbar.enable("#nextPage", false);
                toolbar.enable("#prevPage");
            } else {
                toolbar.enable("#nextPage");
                toolbar.enable("#prevPage");
            }
        };

        $scope.editor = new FlowEditor(commonApiHandler, commonHandler);

        $scope.filePath = $location.$$search["path"];
        $scope.fileName = lodash.isEmpty($scope.filePath) ? "" :
                            $scope.filePath.substring($scope.filePath.lastIndexOf('/') + 1);

        if ($scope.filePath) {
            //give the page sometime to render then create the editor
            var timer = setInterval(function () {
                if ($("#mxGraphDiv").length && $("#mainFooter").length) { //to cover view load and direct page load 

                    $scope.editor.createEditor($scope.filePath);
                    commonApiHandler
                        .getRequest("api/fs" + $scope.filePath + '?processAs=mxGraph&pages')
                        .then(function (result) {
                            var pages = result.data.pages;
                            var startPageIndex = 0;
                            for (var i = 0; i < pages.length; i++) {
                                if (pages[i].name == "Start") {
                                    startPageIndex = i;
                                }
                            }
                            var dropdownlist = $("#editorPages").data("kendoDropDownList");
                            dropdownlist.dataSource.data(pages);
                            dropdownlist.dataSource.query();
                            dropdownlist.select(startPageIndex);
                            ignorePageSelect = false;
                            //we have to explicitly call it since if dropdown index is still zero the event is not fired
                            changeEditorPage();

                            $scope.editor.setPages(pages);
                            $scope.$broadcast("graphBackgroundClick");
                        }, function (error) {
                            switch (error.status) {
                                case 404:
                                    commonHandler.notifyUser("File not found.", "error");
                                    break;
                                case 422:
                                    commonHandler.notifyUser("Incorrect file format.", "error");
                                    break;
                            }
                        });

                    clearInterval(timer);
                }
            }, 50);
        } else {
            commonHandler.notifyUser("Please provide a file to open.", "error");
        }



        setEditorPrintTemplate();

        $scope.company = "CTI Logic";
        $scope.username = "Tanner";
        $scope.imgURL = "https://www.google.com/images/srpr/logo11w.png";
        $scope.printHeaderHeight = 60;
        function setEditorPrintTemplate() {
            $http.get('cfv/app/editor/printHeader/pageHeader.html').success(function (data) {
                $scope.editor.setPrintTemplate($compile(data)($scope)[0], $scope.printHeaderHeight);
            });
        };

        $scope.editor.addRootsChangeListener(function (pages, pageIndex, newPageName) {
            var dropdownlist = $("#editorPages").data("kendoDropDownList");
            if (pageIndex >= 0) {
                if (newPageName) {
                    //TODO find a way to change only a sinle entry
                    //console.log(dropdownlist.dataSource.get(pageIndex));
                    dropdownlist.dataSource.data(pages);
                    dropdownlist.dataSource.query();
                    dropdownlist.select(pageIndex);
                } else {
                    ignorePageSelect = true;
                    dropdownlist.select(pageIndex);
                    ignorePageSelect = false;
                    //we have to explicitly call it to handle groups referring to parent
                    changeEditorPage();
                }
            } else {
                dropdownlist.dataSource.data(pages);
                dropdownlist.dataSource.query();
            }
        });

        function addBreadcrumbClick(li, id, name, hasParent, path) {
            li.click(function () { $scope.editor.openPage(id, name, hasParent, path); });
        };

        $scope.editor.addNavigationListener(function (path) {
            var breadcrumb = $('.breadcrumb');
            var items = breadcrumb.find('li');
            var i;
            for (i = 2; i < items.length; i++) {
                items[i].parentNode.removeChild(items[i]);
            }
            for (i = 0; i < path.length - 1; i++) {
                var li = $('<li>');
                li.html('<a data-ui-sref="">' + path[i].name + '</a>');
                addBreadcrumbClick(li, path[i].id, path[i].name, i > 0, path.slice(0, i + 1));
                breadcrumb.append(li);
            }
            var li = $('<li>');
            li.html('<strong>' + path[i].name + '</strong>');
            breadcrumb.append(li);
        });

        function showPageSetup() {
            var pageInfo = $scope.editor.diagramDesc.pageInfo;
            var graphBounds = $scope.editor.getEditor().graph.getGraphBounds();
            if (pageInfo && pageInfo.pageSize == 'GraphBounds') {
                pageInfo.width = Math.ceil(graphBounds.width);
                pageInfo.height = Math.ceil(graphBounds.height + $scope.printHeaderHeight);
            }
            var modalInstance = $modal.open({
                templateUrl: 'cfv/app/editor/modals/page_setup.html',
                controller: "PageSetup",
                resolve: {
                    pageInfo: function () {
                        return pageInfo ? pageInfo : {
                            pageSize: "Letter",
                            layout: 'p',
                            width: Math.ceil(graphBounds.width),
                            height: Math.ceil(graphBounds.height + $scope.printHeaderHeight)
                        };
                    }
                }
            });

            modalInstance.result.then(function (pageInfo) {
                var isPortrait = pageInfo.layout == 'p';
                var selection = pageInfo.pageSize;
                var pageSetup;
                switch (selection) {
                    case 'A3': pageSetup = isPortrait ? new mxRectangle(0, 0, 1169, 1652) : new mxRectangle(0, 0, 1652, 1169); break;
                    case 'A4': pageSetup = isPortrait ? mxConstants.PAGE_FORMAT_A4_PORTRAIT : mxConstants.PAGE_FORMAT_A4_LANDSCAPE; break;
                    case 'A5': pageSetup = isPortrait ? new mxRectangle(0, 0, 584, 826) : new mxRectangle(0, 0, 826, 584); break;
                    case 'Letter': pageSetup = isPortrait ? mxConstants.PAGE_FORMAT_LETTER_PORTRAIT : mxConstants.PAGE_FORMAT_LETTER_LANDSCAPE; break;
                    case 'Tabloid': pageSetup = isPortrait ? new mxRectangle(0, 0, 1100, 1700) : new mxRectangle(0, 0, 1700, 1100); break;
                    case 'Custom': pageSetup = new mxRectangle(0, 0, pageInfo.width, pageInfo.height); break;
                    case 'GraphBounds': pageSetup = new mxRectangle(0, 0, 20, 20); break;
                }
                $scope.editor.diagramDesc.pageSetup = pageSetup;
                $scope.editor.diagramDesc.pageInfo = pageInfo;
                $scope.editor.updatePageSetup();
                $scope.editor.setDirty(true);
            });
        };


        commonApiHandler
            .getRequest("api/fs" + $scope.filePath + '?variables')
            .then(function (result) {
                $scope.fileVariables = result.data.vars;
            }, function (error) {
                switch (error.status) {
                    case 404:
                        commonHandler.notifyUser("File not found.", "error");
                        break;
                    case 400:
                        commonHandler.notifyUser("Incorrect file format.", "error");
                        break;
                }
            });
        function showFileVariables() {
            var win = $("#fileVariablesWin");
            var winObj = win.data("kendoWindow");
            var varGrid = $('#fileVariablesGrid').data('kendoGrid');
            if (!winObj) {
                win.kendoWindow({
                    width: "800px",
                    height: "700px",
                    title: "File Variables",
                    modal: true,
                    visible: false,
                    actions: [
                        "Close"
                    ]
                });

                $("#fileVariablesGrid").kendoGrid({
                    dataSource: {
                        data: $scope.fileVariables,
                        schema: {
                            model: {
                                fields: {
                                    name: { type: "string" },
                                    varType: { type: "string" },
                                    value: { type: "string" },
                                    parameter: { type: "boolean" }
                                }
                            }
                        },
                        pageSize: 20
                    },
                    height: 682,
                    sortable: true,
                    filterable: true,
                    resizable: true,
                    pageable: {
                        input: true,
                        numeric: false
                    },
                    columns: [
                        { field: "name", title: "Name" },
                        { field: "varType", title: "Type" },
                        { field: "value", title: "Value" },
                        { field: "parameter", title: "Is Parameter?", width: "130px" }
                    ]
                });
                winObj = win.data("kendoWindow");
                varGrid = $('#fileVariablesGrid').data('kendoGrid');
            }

            winObj.center();
            winObj.open();
        }

        $scope.$on(config.events.editorClosed, function (events, args) {
            $scope.editor.saveDiagram();
            $('#mxGraphOutline').remove();
        });

        $scope.$on(config.events.resize, function (events, args) {
            $scope.editor.resizeEditor();
        });

        //--------------Side bar attribute panel show hide------------------
        $scope.showSiderbarAttribPanel = true;
        $scope.graphNode = {
            options: { height: '270px' },
            attrData: [{ Key: "", Value: "" }],
            attrColumns: [
                { field: "Key", title: "Key" },
                { field: "Value", title: "Value" }],
            onNodeSelect: function (cell, value, attrib) {
                $scope.showSiderbarAttribPanel = true;
                $scope.graphNode.attrData = convertAttrToDataSource(attrib);
            },
            onGraphBackgroundClick: function (sender, evt) {
                var cell = evt.getProperty('cell'); // cell may be null
                if (cell == null) {
                    $scope.showSiderbarAttribPanel = false;
                    //evt.consume();
                }
            }
        };
        $scope.editor.addNodeSelectedListener($scope.graphNode.onNodeSelect);
        $scope.$on("graphBackgroundClick", function () {
            $scope.showSiderbarAttribPanel = false;
            var _graph = $scope.editor.getEditor().graph;
            _graph.addListener(mxEvent.CLICK, $scope.graphNode.onGraphBackgroundClick);
        });
        function convertAttrToDataSource(attributes) {
            var keys = Object.keys(attributes);
            var source = [];
            if (keys.length > 0) {
                angular.forEach(keys, function (value, k) {
                    source.push({ Key: value, Value: attributes[value] });
                });
                return source;
            }
            return [];
        }
        //--------------------End-------------------------------------------------
    };
})();