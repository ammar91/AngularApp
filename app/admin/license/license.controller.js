(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('License', License);

    License.$inject = ["$scope", "$stateParams", "config", "licenseHandler", "commonHandler", "kendoHelper"];

    function License($scope, $stateParams, config, licenseHandler, commonHandler, kendoHelper) {
        var license = this;

        license.getCompanyLicenses = getCompanyLicenses;
        license.onLicenseSelect = onLicenseSelect;

        activate();

        function activate() {
            getCompanyLicenses();
            activateUpdateLicenseWindow();
        }


        function activateUpdateLicenseWindow() {
            commonHandler.translateVariable('ADMIN.LICENSE.MODAL.UPDATE.HEADING').then(function (title) {
                license.updateLicenseWindowOptions = {
                    title: title,
                    width: 600,
                    height: 450,
                    visible: false,
                    resizable: false,
                    content: {
                        url: "cfv/app/admin/license/modal/update-license.html"
                    }
                };
            });
        }

        //Licenses belongs to company
        function getCompanyLicenses() {
            var licenseListemplate = commonHandler.getTemplateById(config.templateIds.admin.licenseListTmpl);
            var columns = [
                { field: "id", hidden: true },
                { field: "purchaseDate", title: "Purchase Date", filterable: false },
                { field: "startDate", title: "Start Date", filterable: false },
                { field: "expirationDate", title: "Expiration Date", filterable: false },
                { field: "firstName", title: "User", filterable: false },
                { field: "isActive", title: "Is Active", filterable: false }
            ];
            licenseListemplate.then(function (markup) {
                var settings = {
                    apiPath: "api/companies/" + $stateParams.id + "/licenses",
                    collectionName: "licenses",
                    columns: columns,
                    rowTemplate: markup.data
                };
                license.licenseGridOptions = kendoHelper.getGridOptions(settings);
            });
        }

        function onLicenseSelect(kendoEvent, updateLicenseWindow) {
            var grid = kendoEvent.sender;
            var selectedRow = grid.dataItem(grid.select());
            updateLicenseWindow.center().open();
            commonHandler.broadcastEvent(config.events.onLicenseSelect, { license: selectedRow });
        }

        //Event listner
        $scope.$on(config.events.companyUpdated, function (events, args) {
            getCompanyLicenses();
        });
        $scope.$on(config.events.licenseUpdated, function (events, args) {
            getCompanyLicenses();
        });
    }
})();
