(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('UpdateLicense', UpdateLicense);

    UpdateLicense.$inject = ['$scope', "config", "commonHandler", "lodash", "kendoHelper", "licenseHandler", "$timeout"];

    function UpdateLicense($scope, config, commonHandler, lodash, kendoHelper, licenseHandler, $timeout) {
        var updateLicense = this;

        updateLicense.updateLicenseTerms = updateLicenseTerms;

        updateLicense.kendoSetting = {
            format: config.dateFormats.kendoFormat,
            minDate: moment().format(config.dateFormats.momentFormat)
        }

        updateLicense.license = {
            expiryDate: "",
            isActive: "",
            payment: {
                value: "",
                paymentMethod: "",
                paymentDetail: ""
            }
        };

        activate();

        function activate() {
            bindDropdown();
        }


        $scope.$on(config.events.onLicenseSelect, function (evetns, args) {
            var license = args.license;
            initializeSetting(license);

        });

        function initializeSetting(license) {
            updateLicense.license = {
                id: license.id,
                expiryDate: moment(license.expirationDate).format(config.dateFormats.momentFormat),
                isActive: license.isActive,
                payment: {
                    value: "",
                    paymentMethod: "",
                    paymentDetail: ""
                }
            };
        }

        function bindDropdown() {
            var paymentMethods = [];
            angular.forEach(config.paymentMethod, function (value, key) {
                paymentMethods.push({ id: value, label: value });
            });
            updateLicense.options = kendoHelper.getDropdownOptions(paymentMethods, "label", "id");
        }

        function updateLicenseTerms(updateLicenseWindow) {
            var updateLicenseModel = getModel();
            licenseHandler
                 .updateLicenseTerms("api/licenses/" + updateLicense.license.id, updateLicenseModel)
                 .then(success);

            function success(result) {
                if (result != undefined) {
                    updateLicenseWindow.close();
                    commonHandler.broadcastEvent(config.events.licenseUpdated);
                }
            }

            function getModel() {
                var model = {
                    expirationDate: updateLicense.license.expiryDate,
                    isActive: updateLicense.license.isActive
                };
                if (!lodash.isEmpty(updateLicense.license.payment.value) &&
               !lodash.isEmpty(updateLicense.license.payment.paymentMethod) &&
               !lodash.isEmpty(updateLicense.license.payment.paymentDetail)) {

                    model['payment'] = {
                        amount: parseFloat(updateLicense.license.payment.value),
                        paymentType: updateLicense.license.payment.paymentMethod,
                        description: updateLicense.license.payment.paymentDetail
                    }
                }
                return model;
            }
        }
    }
})();
