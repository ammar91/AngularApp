(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('InviteUser', InviteUser);

    InviteUser.$inject = ['$scope', "$modalInstance", "$stateParams", "invitationHandler"];

    function InviteUser($scope, $modalInstance, $stateParams, invitationHandler) {

        var inviteUser = this;
        inviteUser.user = {
            email: ""
        };

        inviteUser.close = close;
        inviteUser.sendInvite = sendInvite;

        console.log($stateParams);
        function close() {
            $modalInstance.close();
        }

        function sendInvite() {
            var inviteUserModel = {
                email: inviteUser.user.email,
                companyId: $stateParams.id
            };
            invitationHandler
                .sendInvitation("api/users", inviteUserModel)
                .then(success);

            function success(result) {
                if (result != undefined)
                    $modalInstance.close();
            }
        }

    }
})();
