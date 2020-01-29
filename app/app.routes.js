(function () {
    angular
        .module("cfvApp")
        .config(routeConfiguration);

    routeConfiguration.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider"];

    function routeConfiguration($locationProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/companies");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: false
        });

        $stateProvider
            //Account Routes
            .state('register', {
                url: "/register",
                secure: false,
                templateUrl: "cfv/app/account/register.html"
            })
            .state('login', {
                url: "/login?returnUrl",
                secure: false,
                controller: "Account",
                controllerAs: "account",
                templateUrl: "cfv/app/account/login.html"
            })
              .state('forgot-password', {
                  url: "/forgot-password",
                  secure: false,
                  controller: "Password",
                  controllerAs: "password",
                  templateUrl: "cfv/app/account/forgot-password.html"
              })
             .state('credentials/reset', {
                 url: "/credentials/reset/:id?token",
                 secure: false,
                 controller: "Password",
                 controllerAs: "password",
                 templateUrl: "cfv/app/account/reset-password.html"
             })

            //Main Routes
            //.state('index', {
            //    //abstract: true,users
            //    url: "/",
            //    templateUrl: "cfv/app/layout/shell.html"
            //})
            //.state('main', {
            //    url: "/main",
            //    secure: true,
            //    templateUrl: "cfv/app/dashboard/main.html",
            //    data: { pageTitle: 'Example view' }
            //})

              //Invitation Routes
             .state('invitations', {
                 url: "/invitations/:id?token",
                 secure: false,
                 controller: "Invitation",
                 controllerAs: "invitation",
                 templateUrl: "cfv/app/invitation/invitation.html"
             })

            //Company Routes
            .state('companies', {
                secure: true,
                url: "/companies",
                roles: ["Administrator"],
                controller: "Company",
                controllerAs: "company",
                templateUrl: "cfv/app/admin/company/companies.html",
            })
             .state('companyDetail', {
                 secure: true,
                 url: "/companies/:id",
                 roles: ["Administrator"],
                 controller: "CompanyDetail",
                 controllerAs: "companyDetail",
                 templateUrl: "cfv/app/admin/company/company-info.html",
             })

            //User Company Routes

            .state("mycompany", {
                secure: true,
                url: "/mycompany",
                roles: ["RegularUser"],
                controller: "UserCompany",
                controllerAs: "userCompany",
                templateUrl: "cfv/app/users/company/company.html"
            })
            .state('editor', {
                url: "/editor",
                secure: true,
                templateUrl: "cfv/app/editor/editor.html"
                //,data: { pageTitle: 'Editor' }
            })

    }

})();

