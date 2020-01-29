(function () {
    "use strict";

    angular
        .module("cfvApp")
        .controller("AddCompany", AddCompany);

    AddCompany.$inject = ["$scope", "config", "$modalInstance", "companyHandler"];

    function AddCompany($scope, config, $modalInstance, companyHandler) {
        var addCompany = this;
        addCompany.companyModel = {
            name: ""
        }

        addCompany.close = close;
        addCompany.createCompany = createCompany;
        function close() {
            $modalInstance.close();
        }

        function createCompany() {
            var createModel = {
                name: addCompany.companyModel.name
            }
            companyHandler
                    .createCompany("api/companies", createModel)
                    .then(function (result) {
                        if (result != undefined)
                            $modalInstance.close();
                    });
        }
    }
})();
