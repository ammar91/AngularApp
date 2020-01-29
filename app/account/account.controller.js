(function () {
    'use strict';
    angular
        .module("cfvApp")
        .controller("Account", Account);
    Account.$inject = ["$scope", "accountHandler"];

    function Account($scope, accountHandler) {
        var account = this;
        account.user = {
            email: "",
            password: ""
        };

        account.loginUser = loginUser;

        function loginUser() {
            var loginModel = {
                email: account.user.email,
                password: account.user.password
            }
            accountHandler.authenticateUser("api/auth", loginModel);
        };


    };
})();