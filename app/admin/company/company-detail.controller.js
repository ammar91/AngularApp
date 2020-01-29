(function () {
    "use strict";

    angular
        .module("cfvApp")
        .controller("CompanyDetail", CompanyDetail);

    CompanyDetail.$inject = ["$scope", "$stateParams", "config", "companyHandler", "licenseHandler", "commonHandler", "kendoHelper", "lodash"];

    function CompanyDetail($scope, $stateParams, config, companyHandler, licenseHandler, commonHandler, kendoHelper, lodash) {
        var companyDetail = this;

        companyDetail.getCompanyDetail = getCompanyDetail;
        companyDetail.deactivateCompany = deactivateCompany,
        companyDetail.activateCompany = activateCompany,
        companyDetail.editCompanyDetail = editCompanyDetail;
        companyDetail.updateCompanyDetail = updateCompanyDetail;
        companyDetail.editLogo = editLogo;
        companyDetail.cancelEditLogo = cancelEditLogo;

        activate();
        function activate() {
            initializeSetting();
            getCompanyDetail();
            getCompanyFiles();
        }

        function initializeSetting() {
            companyDetail.isEditLogo = false;
            activateFileUpload();
            activateAddLicenseWindow();
        }

        function activateFileUpload() {
            commonHandler.translateVariable("ADMIN.COMPANY_DETAIL.BUTTONS.UPLOAD").then(function (translatedText) {
                companyDetail.UploadOptions = {
                    async: {
                        saveUrl: config.apiPaths.basePath + "api/companies/" + $stateParams.id + "/logo",
                    },
                    multiple: false,
                    showFileList: false,
                    localization: {
                        select: translatedText,
                    },
                    upload: function (e) {
                        var session = commonHandler.getLocalStorageData(config.appSotragekeys.userSessionHeaders);
                        var xhr = e.XMLHttpRequest;
                        if (xhr) {
                            xhr.addEventListener("readystatechange", function (e) {
                                if (xhr.readyState == 1 /* OPENED */) {
                                    xhr.setRequestHeader("X-CVD-Session", session["x-cvd-session"]);
                                }
                            });
                        }
                    },
                    success: function (e) {
                        companyDetail.isEditLogo = false;
                        angular.element(".k-upload-status").remove();
                        getCompanyDetail();
                    }
                };
            });

        }

        function activateAddLicenseWindow() {
            commonHandler.translateVariable('ADMIN.LICENSE.MODAL.ADD.HEADING').then(function (title) {
                companyDetail.addLicenseWindowOptions = {
                    title: title,
                    width: 600,
                    height: 600,
                    visible: false,
                    resizable: false,
                    content: {
                        url: "cfv/app/admin/license/modal/add-license.html"
                    }
                };
            });
        }

        //Company Detail

        function getCompanyFiles() {
            config.appVariable.count = 0;
            var filesTemplate = commonHandler.getTemplateById(config.templateIds.user.companyFiles);
            filesTemplate.then(function (markup) {
                companyDetail.filesFolderOptions = {
                    template: markup.data,
                    loadOnDemand: true,
                    dataSource: companyHandler.getFilesDataSource("api/fs/companies/" + $stateParams.id + "/", $stateParams.id),
                    expand: function () {
                        config.appVariable.count = 1;
                    }
                };
            });
        }
        function getCompanyDetail() {
            companyHandler
                .getCompanyDetail("api/companies/" + $stateParams.id)
                .then(showDetail);
        }

        function showDetail(detail) {
            if (detail != undefined)
                companyDetail.companyInfo = {
                    id: detail.company.id,
                    name: detail.company.name,
                    license: detail.company.licensesAvailable,
                    isActive: detail.company.isActive,
                    address: detail.company.address,
                    website: detail.company.website,
                    contact: detail.company.contact,
                    phone: detail.company.phone,
                    logoFile: !lodash.isEmpty(detail.company.logoFile) ?
                                    config.apiPaths.basePath + "api/assets" + detail.company.logoFile + "?" + moment().unix() :
                                    undefined
                };
            angular.element("#companyPhone").intlTelInput("setNumber", detail.company.phone);
        }

        function activateCompany() {
            var companyModel = {
                isActive: true
            };
            companyHandler
                .activateCompany("api/companies/" + $stateParams.id + "/activation", companyModel)
                .then(success);

            function success(result) {
                if (result != undefined)
                    getCompanyDetail();
            }
        }

        function deactivateCompany() {
            var companyModel = {
                isActive: false
            };
            companyHandler
                .deactivateCompany("api/companies/" + $stateParams.id + "/activation", companyModel)
                .then(success);

            function success(result) {
                if (result != undefined)
                    getCompanyDetail();
            }
        }

        function editCompanyDetail($event) {
            $event.currentTarget.readOnly = false;
        }

        function updateCompanyDetail($event) {
            if (!(angular.element($event.currentTarget.form).hasClass("ng-invalid"))) {
                if (!$event.currentTarget.readOnly) {
                    $event.currentTarget.readOnly = true;
                    var editModel = {
                        name: companyDetail.companyInfo.name,
                        isActive: companyDetail.companyInfo.isActive,
                        address: companyDetail.companyInfo.address,
                        website: companyDetail.companyInfo.website,
                        contact: companyDetail.companyInfo.contact,
                        phone: companyDetail.companyInfo.phone
                    };
                    companyHandler.updateCompanyDetail("api/companies/" + $stateParams.id, editModel);
                }
            }
        }

        function editLogo() {
            companyDetail.isEditLogo = true;
        }

        function cancelEditLogo() {
            companyDetail.isEditLogo = false;
        }

        //event listner

        $scope.$on(config.events.companyUpdated, function (events, args) {
            getCompanyDetail();
        });

        $scope.$on(config.events.licenseUpdated, function (events, args) {
            getCompanyDetail();
        });

        $scope.$on(config.updatePhoneNumber, function (events, args) {
            updateCompanyDetail(args.$event)
        })
    }
})();
