(function () {
    'use strict';

    angular
        .module('cfvApp')
        .controller('Password', password);

    password.$inject = ['$scope', "$stateParams", "accountHandler"];

    function password($scope, $stateParams, accountHandler) {
        var password = this;

        password.user = {
            email: "",
            password: "",
            confirmPassword: ""
        };

        password.sendResetPasowrdLink = sendResetPasowrdLink;
        password.resetPassword = resetPassword;

        activate();

        function activate() {
            if ($stateParams.id && $stateParams.token) {
                authenticateRestPasswordToken();
            }
        }

        function authenticateRestPasswordToken() {
            var authTokens = {
                token: $stateParams.token
            };
            accountHandler
                .authenticateRestPasswordToken("api/auth/" + $stateParams.id, authTokens)
                .then(success);

            function success(result) {
                if (result != undefined) {
                    password.authSuccess = result;
                }
            }
        }

        function sendResetPasowrdLink() {
            var sendPasswordLinkModel = {
                email: password.user.email
            }
            accountHandler.sendResetPasowrdLink("api/credentials/reset", sendPasswordLinkModel);
        }

        function resetPassword() {
            var xCvdSessionHeader = password.authSuccess.sessionId + "-" + password.authSuccess.token;
            var resetPasswordModel = {
                password: password.user.password
            }
            accountHandler
                .resetPssword("api/accounts/" + password.authSuccess.accountId + "/credentials ",
                               resetPasswordModel, xCvdSessionHeader);
        }
    }
})();
