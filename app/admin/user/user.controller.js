(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('User', User);

    User.$inject = ["$scope", "$stateParams", "config", "commonHandler", "kendoHelper"];

    function User($scope, $stateParams, config, commonHandler, kendoHelper) {
        var user = this;
        user.openInviteWindow = openInviteWindow;
        user.onUserSelect = onUserSelect;

        activate();

        function activate() {
            getCompanyUsers();
        }

        function openInviteWindow() {
            var modalOptions = {
                templateUrl: "cfv/app/admin/user/modals/invite-user.html",
                size: "",
                controller: "InviteUser",
                controllerAs: "inviteUser",
            };
            commonHandler.initializePopup(modalOptions);
        }

        function getCompanyUsers() {
            var userListemplate = commonHandler.getTemplateById(config.templateIds.admin.userListTmpl);
            var columns = [
                { field: "id", hidden: true },
                { field: "firstName", title: "First Name", filterable: false },
                { field: "lastName", title: "Last Name", filterable: false },
                { field: "phone", title: "Phone", filterable: false },
                { field: "", title: "Start Date", filterable: false },
                { field: "", title: "Expiry Date", filterable: false },
                { field: "licenseValid", title: "License", filterable: false },
                { field: "isActive", title: "Is Active", filterable: false }
            ];
            userListemplate.then(function (markup) {
                var settings = {
                    apiPath: "api/companies/" + $stateParams.id + "/users",
                    collectionName: "users",
                    columns: columns,
                    rowTemplate: markup.data
                };
                user.userGridOptions = kendoHelper.getGridOptions(settings);
            });

        }

        function onUserSelect(kendoEvent) {
            var grid = kendoEvent.sender;
            var selectedRow = grid.dataItem(grid.select());
            var modalOptions = {
                templateUrl: "cfv/app/admin/user/modals/user-detail.html",
                size: "",
                controller: "UserDetail",
                controllerAs: "userDetail",
                resolve: {
                    user: function () {
                        return selectedRow;
                    }
                }
            };
            commonHandler.initializePopup(modalOptions);

        };

        //event listner
        $scope.$on(config.events.userUpdated, function (events, args) {
            if (args.update)
                getCompanyUsers();
        });
    }
})();
