(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('AddLicense', AddLicense);

    AddLicense.$inject = ['$scope', "$stateParams", "config", "lodash", "licenseHandler", "commonHandler", "kendoHelper"];

    function AddLicense($scope, $stateParams, config, lodash, licenseHandler, commonHandler, kendoHelper) {
        var addLicense = this;

        addLicense.onStartDateChange = onStartDateChange;
        addLicense.addLicenseToCompany = addLicenseToCompany;

        activate();

        function activate() {
            initializeSetting();
        }

        function initializeSetting() {
            addLicense.license = {
                companyId: $stateParams.id,
                amount: 1,
                value: "",
                purchaseDate: moment().format(config.dateFormats.momentFormat),
                startDate: "",
                validUntil: "",
                paymentMethod: "",
                paymentDetail: ""
            };
            bindDropdown();
        }

        function bindDropdown() {
            var paymentMethods = [];
            angular.forEach(config.paymentMethod, function (value, key) {
                paymentMethods.push({ id: value, label: value });
            });
            addLicense.options = kendoHelper.getDropdownOptions(paymentMethods, "label", "id");
        }

        function onStartDateChange() {
            addLicense.license.validUntil = moment(addLicense.license.startDate, config.dateFormats.momentFormat)
                                                    .add(moment.duration(1, 'year'))
                                                    .format(config.dateFormats.momentFormat);
        }

        function addLicenseToCompany(addLicenseWindow) {
            var addLicenseModel = {
                startDate: addLicense.license.startDate,
                companyId: addLicense.license.companyId,
                count: parseInt(addLicense.license.amount),
            };
            if (!lodash.isEmpty(addLicense.license.value) &&
                !lodash.isEmpty(addLicense.license.paymentMethod) &&
                !lodash.isEmpty(addLicense.license.paymentDetail)) {

                addLicenseModel['payment'] = {
                    amount: parseFloat(addLicense.license.value),
                    paymentType: addLicense.license.paymentMethod,
                    description: addLicense.license.paymentDetail
                }
            }
            licenseHandler
                 .addLicenseToCompany("api/licenses", addLicenseModel)
                 .then(success);

            function success(result) {
                if (result != undefined) {
                    initializeSetting();
                    addLicenseWindow.close();
                    commonHandler.broadcastEvent(config.events.companyUpdated);
                }
            }
        }
    }
})();
