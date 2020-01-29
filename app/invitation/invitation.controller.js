(function () {
    'use strict';
    angular
        .module('cfvApp')
        .controller('Invitation', invitation);

    invitation.$inject = ['$scope', "$stateParams", "invitationHandler", "commonHandler"];

    function invitation($scope, $stateParams, invitationHandler, commonHandler) {
        var invitation = this;

        invitation.acceptInviteModel = {
            token: $stateParams.token,
            firstName: "",
            lastName: "",
            phone: "",
            password: ""

        };

        invitation.acceptInvitation = acceptInvitation;

        activate();

        function activate() {
            authenticateUserToken();
        }

        function authenticateUserToken() {
            if (commonHandler.getStateName() == "invitations") {
                var authTokens = {
                    token: $stateParams.token
                }
                invitationHandler
                        .authenticateInvitation("api/auth/" + $stateParams.id, authTokens)
                        .then(authSuccess);
            }
            function authSuccess(result) {
                if (result != undefined)
                    invitation.authSuccess = result;
            }
        }

        function acceptInvitation() {
            var xCvdSessionHeader = invitation.authSuccess.sessionId + "-" + invitation.authSuccess.token;
            var acceptInviteModel = {
                token: invitation.acceptInviteModel.token,
                password: invitation.acceptInviteModel.password,
                userDetails: {
                    firstName: invitation.acceptInviteModel.firstName,
                    lastName: invitation.acceptInviteModel.lastName,
                    phone: invitation.acceptInviteModel.phone
                }
            };
            invitationHandler
                .acceptInvitation("api/invitations/" + $stateParams.id + "/accept",
                                   acceptInviteModel,
                                   xCvdSessionHeader);
        }



    }
})();
