(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('UserDetail', UserDetail);

    UserDetail.$inject = ['$scope', "$stateParams", "config", "$modalInstance", "commonHandler", "userHandler", "licenseHandler", "kendoHelper", "lodash", "user"];

    function UserDetail($scope, $stateParams, config, $modalInstance, commonHandler, userHandler, licenseHandler, kendoHelper, lodash, user) {
        var userDetail = this;
        userDetail.close = close;
        userDetail.deactivateUser = deactivateUser;
        userDetail.activateUser = activateUser;
        userDetail.sendPasswordRequest = sendPasswordRequest;
        userDetail.resendInvite = resendInvite;
        userDetail.editUserDetail = editUserDetail;
        userDetail.updateUserDetail = updateUserDetail;
        userDetail.onLicenseSelect = onLicenseSelect;

        activate();
        function activate() {
            initializeSetting();
        }

        function initializeSetting() {
            loadData();
            userDetail.isUserUpdated = false;
        }

        function close() {
            commonHandler.broadcastEvent(config.events.userUpdated, { update: userDetail.isUserUpdated });
            $modalInstance.close();
        }

        function loadData() {
            var functionList = [
                userHandler.getUserDetail("api/users/" + user.id + "/detailed"),
                licenseHandler.getAllLicenses("api/companies/" + $stateParams.id + "/licenses")
            ];

            commonHandler
                .getPromises(functionList)
                .then(success);

            function success(result) {
                var detail = result[0];
                var license = result[1];
                showUserDetail(detail);
                bindLicenseDropdown(license);
            };
        }

        function getUserDetail() {
            userHandler
                .getUserDetail("api/users/" + user.id + "/detailed")
                .then(showUserDetail);
        }

        function showUserDetail(result) {
            if (result != undefined) {
                userDetail.user = {
                    id: result.user.id,
                    firstName: result.user.firstName,
                    lastName: result.user.lastName,
                    phone: result.user.phone,
                    email: result.account.email,
                    languageCode: result.user.langCode,
                    isInvited: result.account.roles[0] == config.roles.JustInvited,
                    isActive: result.user.isActive,
                    license: result.license
                };
                userDetail.selectedLicense = lodash.isEmpty(result.license) ? "" : result.license.id;
                angular.element("#userPhone").intlTelInput("setNumber", result.user.phone);
            }
        }

        function bindLicenseDropdown(license) {
            var licenseList = [];
            angular.forEach(license.licenses, function (value, key) {
                if (value.isActive && lodash.isEmpty(value.user))
                    licenseList.push({ id: value.id, label: moment(value.startDate).format(config.dateFormats.momentFormat) })
            });

            userDetail.licenseOptions = kendoHelper.getDropdownOptions(licenseList, "label", "id", "--- Select License ---");
        }

        function onLicenseSelect() {
            if (!lodash.isEmpty(userDetail.user.license)) {
                unAssignLicense().then(success);
            } else {
                if (!lodash.isEmpty(userDetail.selectedLicense))
                    assignLicense();
            }

            function success(result) {
                if (!lodash.isEmpty(result)) {
                    loadData();
                    commonHandler.broadcastEvent(config.events.licenseUpdated);
                    if (!lodash.isEmpty(userDetail.selectedLicense))
                        assignLicense();
                }
            }
        }

        function assignLicense() {
            var assignModel = {
                licenseId: userDetail.selectedLicense
            };
            licenseHandler
                    .assignLicense("api/accounts/" + user.accountId + "/licenses", assignModel)
                    .then(success);

            function success(result) {
                if (!lodash.isEmpty(result)) {
                    loadData();
                    commonHandler.broadcastEvent(config.events.licenseUpdated);
                    userDetail.isUserUpdated = true;
                }
            }
        }

        function unAssignLicense() {
            return licenseHandler
                    .unAssignLicense("api/accounts/" + user.accountId + "/licenses");

        }

        function activateUser() {
            var userModel = {
                isActive: true
            }
            userHandler
                  .activateUser("api/users/" + user.id + "/activation", userModel)
                  .then(success);
            function success(result) {
                if (result != undefined) {
                    userDetail.user.isActive = true;
                    userDetail.isUserUpdated = true;
                }
            }
        }

        function deactivateUser() {
            var modalOptions = {
                templateUrl: "cfv/app/common/modal/confirm.html",
                size: "sm",
                controller: "ConfirmDialog",
                controllerAs: "confirmDialog"
            };
            var confirm = commonHandler.initializePopup(modalOptions)
            confirm.result.then(function (result) {
                var userModel = {
                    isActive: false
                }
                userHandler
                    .deactivateUser("api/users/" + user.id + "/activation", userModel)
                    .then(success);
            });

            function success(result) {
                if (result != undefined) {
                    userDetail.user.isActive = false;
                    userDetail.isUserUpdated = true;
                }
            }
        }

        function sendPasswordRequest() {
            userHandler.sendPasswordRequest("api/accounts/" + user.accountId + "/credentials/reset");
        }

        function resendInvite() {
            userHandler.resendInvite("api/users/" + user.id + "/invitations");
        }

        function editUserDetail($event) {
            $event.currentTarget.readOnly = false;
        };

        function updateUserDetail($event) {
            if (!$event.currentTarget.readOnly) {
                $event.currentTarget.readOnly = true;
                var editModel = {
                    firstName: userDetail.user.firstName,
                    lastName: userDetail.user.lastName,
                    phone: userDetail.user.phone,
                    langCode: userDetail.user.languageCode
                };
                userHandler
                    .updateUserDetail("api/users/" + user.id, editModel)
                    .then(success);
            }
            function success(result) {
                if (result != undefined)
                    userDetail.isUserUpdated = true;
            }
        };

        //event listner
        $scope.$on(config.updatePhoneNumber, function (events, args) {
            updateUserDetail(args.$event)
        })
    }
})();
