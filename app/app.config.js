(function () {
    var events = {
        redirectToLogin: "redirectToLogin",
        onLoginSuccess: "onLoginSuccess",
        isUserLoggedIn: "isUserLoggedIn",
        addCompany: "addCompany",
        userUpdated: "userUpdated",
        companyUpdated: "companyUpdated",
        onLicenseSelect: "onLicenseSelect",
        licenseUpdated: "licenseUpdated",
        editorClosed: "editorClosed",
        resize: "resize",
        updatePhoneNumber: "updatePhoneNumber"

    };
    var host = {
        dev: "localhost",
        staging: "dev.callviewvisualizer.com",
        production: ""
    };
    var apiSuccessCodes = {
        created: 201,
        success: 200
    };
    var apiErrorCodes = {
        badRequest: 400,
        unAuthorized: 401,
        forbidden: 403,
        notFound: 404,
        conflict: 409,
    };
    var apiPaths = {
        basePath: "",
        devPath: "http://127.0.0.1:9292/dev.callviewvisualizer.com/",
        stagingPath: "http://dev.callviewvisualizer.com/",
        productionPath: "",
    };
    var appSotragekeys = {
        token: "token",
        userInfo: "userInfo",
        userSessionHeaders: "userSessionHeaders",
        userLanguage: "userLanguage"
    };
    var stateEnums = {
        login: "login",
        home: "main",
        editor: "editor",
        register: "register",
        invitations: "invitations",
        forgotPassword: "forgot-password",
        resetPassword: "credentials/reset",
        companies: "companies",
        myCompany: "mycompany"
    };
    var messageType = {
        error: "error",
        success: "success",
        info: "info",
        warning: "warning"
    };
    var notifySetting = {
        templatePath: "cfv/app/common/notify.html"
    };
    var apiEndPoints = {
        //login API
        login: "login",

        //Session API
        session: "session",

        //Invites API
        inviteUser: "inviteUser",
        acceptInvite: "acceptInvite",

        //token authentication API
        authToken: "authToken",

        //password API
        resetPasswordToken: "resetPasswordToken",
        resetPassword: "resetPassword",

        //Company API
        addCompany: "addCompany",
        getCompanies: "getCompanies",
        getCompanyUsers: "getCompanyUsers",
        getCompanyDetail: "getCompanyDetail",
        activateCompany: "activateCompany",
        deactivateCompany: "deactivateCompany",
        updateCompanyDetail: "updateCompanyDetail",
        getCompanyFiles: "getCompanyFiles",

        //User API
        activateUser: "activateUser",
        deactivateUser: "deactivateUser",
        sendPasswordRequest: "sendPasswordRequest",
        resendInvite: "resendInvite",
        getUserDetail: "getUserDetail",
        updateUserDetail: "updateUserDetail",

        //License API
        addLicenseToCompany: "addLicenseToCompany",
        updateLicenseTerms: "updateLicenseTerms",
        assignLicense: "assignLicense",
        unAssignLicense: "unAssignLicense",

        //File Upload
        fileUpload: "fileUpload",

        //file storage API
        createFolder: "createFolder",
        deleteNode: "deleteNode"
    };
    var queryParams = {
        tokenParam: "token",
        returnUrl: "returnUrl",
        filePath: "path",
        version: "version"
    };
    var urlParams = {
        id: "id"
    };
    var applicationLanguage = {
        selectedLanguage: "en-US",
        fallBackLanguage: "en-US",
    };
    var templateIds = {

        //Language templates
        langValueTmpl: "langValueTmpl",
        langItemTmpl: "langItemTmpl",
        admin: {
            // admin/companies template
            companyListTmpl: "companiesListTmpl",
            addNewCompany: "addNewCompany",

            // admin/user list template
            userListTmpl: "userListTmpl",

            //license list template
            licenseListTmpl: "licenseListTmpl",
        },
        user: {
            // Users/company template
            companyFiles: "companyFiles",
            companyFileList: "companyFileList",
            companyFolders: "companyFolders"
        }
    };
    var paymentMethod = {
        Check: "Check",
        Cash: "Cash",
        WireTransfer: "WireTransfer",
        BankDeposit: "BankDeposit",
        CreditCard: "CreditCard",
        ACHTransfer: "ACHTransfer"
    };
    var roles = {
        //Application user role
        Administrator: "Administrator",
        RegularUser: "RegularUser",
        JustInvited: "JustInvited"
    };

    var dateFormats = {
        momentFormat: "YYYY-M-D",
        kendoFormat: "yyyy-MM-dd"
    };
    var kendoOperations = {
        read: "read"
    };
    var fileTypes = {
        jpeg: ".jpeg",
        jpg: ".jpg",
        aef: ".aef"
    };

    var appVariable = {
        count: 0,
        folderPath: ""
    };
    var appRole = {
        regularUser: "RegularUser",
        adminUser: "Admin"
    };
    var fileStorageFolderOptions = {
        createFolder: "createFolder",
        deleteFolder: "deleteFolder"
    };
    var contextMenu = {
        filesMenu: {
            newFile: "new file",
            openFile: "open file",
            deleteFile: "delete file"
        },
        folderMenu: {
            newFolder: "new folder",
            deleteFolder: "delete folder"
        }

    };
    var config = {
        events: events,
        apiPaths: apiPaths,
        appSotragekeys: appSotragekeys,
        stateEnums: stateEnums,
        host: host,
        apiSuccessCodes: apiSuccessCodes,
        apiErrorCodes: apiErrorCodes,
        messageType: messageType,
        notifySetting: notifySetting,
        apiEndPoints: apiEndPoints,
        queryParams: queryParams,
        urlParams: urlParams,
        applicationLanguage: applicationLanguage,
        templateIds: templateIds,
        paymentMethod: paymentMethod,
        roles: roles,
        dateFormats: dateFormats,
        kendoOperations: kendoOperations,
        fileTypes: fileTypes,
        appVariable: appVariable,
        appRole: appRole,
        fileStorageFolderOptions: fileStorageFolderOptions,
        contextMenu: contextMenu
    };


    angular
        .module('cfvApp')
        .value('config', config);

})();
