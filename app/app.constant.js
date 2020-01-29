(function () {
    var appLanguage = {
        preferedLanguage: "en-US",
        fallbackLanguage: "en-US"
    };
    var appStoragekeys = {
        token: "token",
        userInfo: "userInfo",
        userSessionHeaders: "userSessionHeaders",
        userLanguage: "userLanguage"
    };
    var defaultRoutes = {
        admin: "/companies",
        user: "/mycompany"
    }

    var appConstant = {
        appLanguage: appLanguage,
        appStoragekeys: appStoragekeys,
        defaultRoutes: defaultRoutes
    };
    angular
        .module("cfvApp")
        .constant("appConstant", appConstant);
})();