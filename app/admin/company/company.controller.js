(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('Company', Company);

    Company.$inject = ["$scope", "config", "$modal", "companyHandler", "commonHandler", "kendoHelper"];

    function Company($scope, config, $modal, companyHandler, commonHandler, kendoHelper) {

        var company = this;

        company.addCompany = addCompany;
        company.onCompanySelect = onCompanySelect;

        activate();

        function activate() {
            getCompanies();
        }

        function addCompany() {
            var modalOptions = {
                templateUrl: "cfv/app/admin/company/modal/add-company.html",
                size: "sm",
                controller: "AddCompany",
                controllerAs: "addCompany"
            };
            commonHandler.initializePopup(modalOptions);
        }

        function getCompanies() {
            var companyListTmpl = commonHandler.getTemplateById(config.templateIds.admin.companyListTmpl);
            var addCompanyTmpl = commonHandler.getTemplateById(config.templateIds.admin.addNewCompany);
            commonHandler.getPromises([companyListTmpl, addCompanyTmpl]).then(function (templates) {
                company.companiesGridoptions = companyHandler
                                                    .getCompanies("api/companies", templates[0].data, templates[1].data);
            });

        }

        function onCompanySelect(kendoEvent) {
            var grid = kendoEvent.sender;
            var selectedRow = grid.dataItem(grid.select());
            commonHandler.redirectToRoute("/companies/" + selectedRow.id);
        }

        //Event Listner
        $scope.$on(config.events.addCompany, function (events, args) {
            getCompanies();
        });

    }
})();
