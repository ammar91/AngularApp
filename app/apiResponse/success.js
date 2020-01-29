//Notify Type: success,error,info,warning

var apiSuccessMessages =
[
    //Login API
    {
        apiType: "login",
        status: 200,
        message: "API.LOGIN_200",
        notifyType: "success"
    },

    //Invitation API
     {
         apiType: "inviteUser",
         status: 200,
         message: "API.INVITE_USER_200",
         notifyType: "success"
     },
     {
         apiType: "acceptInvite",
         status: 200,
         message: "API.ACCEPT_INVITE_200",
         notifyType: "success"
     },

     //Password API
      {
          apiType: "resetPasswordToken",
          status: 200,
          message: "API.PASSWORD_TOKEN_200",
          notifyType: "info"
      },
      {
          apiType: "resetPassword",
          status: 200,
          message: "API.RESET_PASSWORD_200",
          notifyType: "success"
      },

      //Company API
       {
           apiType: "addCompany",
           status: 201,
           message: "API.Add_COMPANY_201",
           notifyType: "success"
       },
       {
           apiType: "activateCompany",
           status: 200,
           message: "API.ACTIVATE_COMPANY_200",
           notifyType: "success"
       },
        {
            apiType: "deactivateCompany",
            status: 200,
            message: "API.DEACTIVATE_COMPANY_200",
            notifyType: "success"
        },
        {
            apiType: "updateCompanyDetail",
            status: 200,
            message: "API.UPDATE_COMPANY_DETAIL_200",
            notifyType: "success"
        },

        //User API
        {
            apiType: "deactivateUser",
            status: 200,
            message: "API.DEACTIVATE_USER_200",
            notifyType: "success"
        },
        {
            apiType: "activateUser",
            status: 200,
            message: "API.ACTIVATE_USER_200",
            notifyType: "success"
        },
        {
            apiType: "sendPasswordRequest",
            status: 200,
            message: "API.SEND_PASSWORD_REQUEST_200",
            notifyType: "success"
        },
        {
            apiType: "resendInvite",
            status: 200,
            message: "API.RESEND_INVITE_200",
            notifyType: "success"
        },
         {
             apiType: "updateUserDetail",
             status: 200,
             message: "API.UPDATE_USER_DETAIL_200",
             notifyType: "success"
         },

        //License API
        {
            apiType: "addLicenseToCompany",
            status: 201,
            message: "API.ADD_LICENSE_TO_COMPANY_201",
            notifyType: "success"
        },
        {
            apiType: "updateLicenseTerms",
            status: 200,
            message: "API.UPDATE_LICENSE_TERMS_200",
            notifyType: "success"
        },
        {
            apiType: "assignLicense",
            status: 200,
            message: "API.ASSIGN_LICENSE_200",
            notifyType: "success"
        },
        {
            apiType: "fileUpload",
            status: 200,
            message: "API.FILE_UPLOAD_200",
            notifyType: "success"
        },

        //File storage API
          {
              apiType: "createFolder",
              status: 200,
              message: "API.CREATE_FOLDER_200",
              notifyType: "success"
          },
            {
                apiType: "deleteNode",
                status: 200,
                message: "API.DELETE_NODE_200",
                notifyType: "success"
            }



];