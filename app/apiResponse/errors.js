//Notify Type: success,error,info,warning

var apiErrorMessages =
[
    //Login API
    {
        apiType: "login",
        status: 404,
        message: "API.LOGIN_404",
        notifyType: "error"
    },
    {
        apiType: "login",
        status: 403,
        message: "API.LOGIN_403",
        notifyType: "error"
    },

    //AUth token API
    {
        apiType: "authToken",
        status: 404,
        message: "API.AUTH_404",
        notifyType: "error"
    },

     {
         apiType: "session",
         status: 401,
         message: "API.SESSION_401",
         notifyType: "info"
     },

    //Invittation API
    {
        apiType: "inviteUser",
        status: 401,
        message: "API.ERROR_401",
        notifyType: "error"
    },
    {
        apiType: "inviteUser",
        status: 403,
        message: "API.ERROR_403",
        notifyType: "error"
    },
    {
        apiType: "inviteUser",
        status: 409,
        message: "API.INVITE_USER_409",
        notifyType: "error"
    },

    //Password API
     {
         apiType: "resetPasswordToken",
         status: 404,
         message: "API.PASSWORD_TOKEN_404",
         notifyType: "error"
     },
     {
         apiType: "resetPassword",
         status: 404,
         message: "API.RESET_PASSWORD_404",
         notifyType: "error"
     },

     //company API
     {
         apiType: "addCompany",
         status: 400,
         message: "API.Add_COMPANY_400",
         notifyType: "error"
     },
     {
         apiType: "addCompany",
         status: 401,
         message: "API.ERROR_401",
         notifyType: "error"
     },
     {
         apiType: "addCompany",
         status: 404,
         message: "API.Add_COMPANY_404",
         notifyType: "error"
     },
     {
         apiType: "addCompany",
         status: 409,
         message: "API.Add_COMPANY_409",
         notifyType: "error"
     },
     {
         apiType: "getCompanies",
         status: 401,
         message: "API.ERROR_401",
         notifyType: "error"
     },
     {
         apiType: "getCompanies",
         status: 403,
         message: "API.ERROR_403",
         notifyType: "error"
     },
     {
         apiType: "getCompanyDetail",
         status: 401,
         message: "API.ERROR_401",
         notifyType: "error"
     },
     {
         apiType: "activateCompany",
         status: 400,
         message: "API.ACTIVATE_COMPANY_400",
         notifyType: "error"
     },
     {
         apiType: "activateCompany",
         status: 401,
         message: "API.ERROR_401",
         notifyType: "error"
     },
     {
         apiType: "activateCompany",
         status: 404,
         message: "API.ACTIVATE_COMPANY_404",
         notifyType: "error"
     },
     {
         apiType: "deactivateCompany",
         status: 400,
         message: "API.DEACTIVATE_COMPANY_400",
         notifyType: "error"
     },
     {
         apiType: "deactivateCompany",
         status: 401,
         message: "API.ERROR_401",
         notifyType: "error"
     },
     {
         apiType: "deactivateCompany",
         status: 404,
         message: "API.DEACTIVATE_COMPANY_404",
         notifyType: "error"
     },

     //User API
     {
         apiType: "activateUser",
         status: 404,
         message: "API.ACTIVATE_USER_404",
         notifyType: "error"
     },
     {
         apiType: "deactivateUser",
         status: 404,
         message: "API.DEACTIVATE_USER_404",
         notifyType: "error"
     },
     {
         apiType: "sendPasswordRequest",
         status: 404,
         message: "API.SEND_PASSWORD_REQUEST_404",
         notifyType: "error"
     },
      {
          apiType: "resendInvite",
          status: 404,
          message: "API.RESEND_INVITE_404",
          notifyType: "error"
      },
        {
            apiType: "getUserDetail",
            status: 404,
            message: "API.GET_USER_DETAIL_404",
            notifyType: "error"
        },

        //License API
        {
            apiType: "addLicenseToCompany",
            status: 400,
            message: "API.ADD_LICENSE_TO_COMPANY_400",
            notifyType: "error"
        },
        {
            apiType: "updateLicenseTerms",
            status: 404,
            message: "API.UPDATE_LICENSE_TERMS_404",
            notifyType: "error"
        },
         {
             apiType: "assignLicense",
             status: 400,
             message: "API.ASSIGN_LICENSE_400",
             notifyType: "error"
         },
         {
             apiType: "fileUpload",
             status: 403,
             message: "API.FILE_UPLOAD_403",
             notifyType: "error"
         },

          //File storage API
          {
              apiType: "createFolder",
              status: 409,
              message: "API.CREATE_FOLDER_409",
              notifyType: "error"
          },
            {
                apiType: "deleteNode",
                status: 200,
                message: "API.DELETE_NODE_200",
                notifyType: "success"
            }

];