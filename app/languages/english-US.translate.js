(function () {
    angular
        .module("cfvApp")
        .config(configureLanguage);

    configureLanguage.$inject = ["$translateProvider"];

    function configureLanguage($translateProvider) {


        $translateProvider.translations("en-US", {
            //Language Module
            LANGUAGE: {
                US: "English-US",
                DE: "German-DE"
            },

            //Breadcrum
            BREADCRUM: {
                HOME: "Home",
                COMPANIES: "Companies",
                EDITOR: "Editor"
            },

            //Layout Model

            COMMON: {
                HELP_TEXT: "Double click on any field to edit information",
                TEST: "This is test",
                YEAR: "2015",
                PUBLIC_FOOTER: {
                    TEXT: "Call Flow Visulaizer",
                },
                PRIVATE_FOOTER: {
                    TEXT: "Call Flow Visulaizer",
                    COPYRIGHT: "Copyright"
                },
                MODAL: {
                    CONFIRM: {
                        HEADING: "Confirmation",
                        DESCRIPTION: "Are you sure you want to delete?",
                        BUTTONS: {
                            CLOSE: "Close",
                            CONFIRM: "Confirm"
                        }
                    }
                }

            },
            //Error Messages Page
            ERROR_MESSAGES: {
                PASSWORD_MISMATCH: "Password mismatch"
            },
            //Top Navbar
            TOP_NAVBAR: {
                SEARCH_FIELD: "Search Something",
                LOGOUT: "Log out",
                LANGUAGE: "Language"
            },

            //Right Navigation Menu
            RIGHT_NAVIGATION: {
                HOME: "Home",
                INVITE_USER: "Invite User",
                COMPANY: "Company",
                MY_COMPANY: "My Company",
                EDITOR: "Editor"
            },

            //Account Module
            //login page
            LOGIN: {
                WELCOME_TEXT: "Welcome to Call Flow Visulaizer",
                DESCRIPTION: "Login in. To see it in action.",
                EMAIL_FIELD: "Email",
                PASSWORD_FIELD: "Password",
                BUTTON: "Login",
                FORGOT_PASSWORD_LINK: "Forgot password?",
            },

            //Forgot Password Page
            FORGOT_PASSWORD: {
                WELCOME_TEXT: "Welcome to Call Flow Visulaizer",
                DESCRIPTION: "Reset your password",
                EMAIL_FIELD: "Email",
                BUTTON: "Reset Password",
                LOGIN_LINK: "Login"
            },
            //Reset Password Page
            RESET_PASSWORD: {
                WELCOME_TEXT: "Welcome to Call Flow Visulaizer",
                DESCRIPTION: "Set your password. To see it in action",
                PASSWORD_FIELD: "Password",
                CONFIRM_PASSWORD_FIELD: "Confirm Password",
                BUTTON: "Submit"
            },

            //Admin Module
            ADMIN: {
                //Company Module
                //Companies List
                COMPANY: {
                    HEADING: "Companies",
                    CREATE_BUTTON: "Create Company",
                    MODAL: {
                        HEADING: "Add New Company",
                        DESCRIPTION: "",
                        NAME_FIELD: "Company Name",
                        CLOSE_BUTTON: "Close",
                        SAVE_BUTTON: "Save"
                    }
                },

                //Company Detail
                COMPANY_DETAIL: {
                    HEADING: "Company Detail",
                    TABS: {
                        DETAIL: "Company Detail",
                        USER: "Users",
                        LICENSE: "License",
                        FILES: "Files"
                    },
                    BUTTONS: {
                        EDIT_LOGO: "Edit Logo",
                        CANCEL_EDIT_LOGO: "Cancel",
                        UPLOAD: "Drop files here to upload",
                        DEACTIVATE_COMPANY: "Deactivate",
                        ACTIVATE_COMPANY: "Activate",
                        MANAGE_LICENSE: "Manage License"
                    },
                    FORM: {
                        LABELS: {
                            ISACTIVE: "Is Active",
                            NAME: "Name",
                            LICENSE: "License Available",
                            ADDRESS: "Address",
                            WEBSITES: "Website",
                            CONTACT_PERSON: "Contact Person",
                            TELEPHONE: "Telephone"
                        },
                        FIELDS: {
                            NAME: "Company Name",
                            LICENSE: "Available License",
                            ADDRESS: "Address",
                            WEBSITES: "Website",
                            CONTACT_PERSON: "Person Name",
                            TELEPHONE: "Telephone"
                        }
                    }
                },

                //User Module
                USER: {
                    BUTTONS: {
                        INVITE: "Invite User",
                    },
                    LIST: {
                        ACTIVE: "Active",
                        IN_ACTIVE: "In Active",
                        VALID: "Valid",
                        INVALID: "Invalid"
                    },
                    MODAL: {
                        INVITE_USER: {
                            HEADING: "Invite User",
                            LABELS: {
                                EMAIL: "Email",
                            },
                            FIELDS: {
                                EMAIL: "User Email",
                            },
                            BUTTONS: {
                                CLOSE: "Close",
                                INVITE: "Send Invite "
                            }
                        },
                        USER_DETAIL: {
                            HEADING: "User Detail",
                            LABELS: {
                                FIRST_NAME: "First Name",
                                LAST_NAME: "Last Name",
                                PHONE: "Phone",
                                EMAIL: "Email",
                                LANGUAGE_CODE: "Language",
                            },
                            FIELDS: {
                                FIRST_NAME: "First Name",
                                LAST_NAME: "Last Name",
                                PHONE: "Phone",
                                EMAIL: "Email",
                                LANGUAGE_CODE: "Language",
                            },
                            BUTTONS: {
                                CLOSE: "Close",
                                RESET_PASSWORD: "Reset Password",
                                RESEND_INVITE: "Resend Invite",
                                ACTIVATE: "Activate",
                                DEACTIVATE: "Deactivate"
                            }
                        }
                    }
                },

                //License Module
                LICENSE: {
                    BUTTONS: {
                        ASSIGN: "Assign License"
                    },
                    MODAL: {
                        ADD: {
                            HEADING: "Manage Company License",
                            DESCRIPTION: "Assign license to company",
                            LABELS: {
                                AMOUNT: "Amount",
                                VALUE: "Value",
                                PURCHASE_DATE: "Purchase Date",
                                START_DATE: "Start Date",
                                VALID_UNTIL: "Valid Untill",
                                PAYMENT_METHOD: "Payment Method",
                                PAYMENT_DETAIL: "Payment Detail"
                            },
                            FIELDS: {
                                VALUE: "Value",
                                PAYMENT_DETAIL: "Payment Detail"
                            },
                            BUTTONS: {
                                CLOSE: "Close",
                                ADD: "Add"
                            }
                        },
                        UPDATE: {
                            HEADING: "Update License",
                            DESCRIPTION: "Update the license terms",
                            LABELS: {
                                EXPIRATION_DATE: "Expiry Date",
                                IS_ACTIVE: "Is Active",
                                VALUE: "Value",
                                PAYMENT_METHOD: "Payment Method",
                                PAYMENT_DETAIL: "Payment Detail"
                            },
                            FIELDS: {
                                VALUE: "Value",
                                PAYMENT_DETAIL: "Payment Detail"
                            },
                            BUTTONS: {
                                CLOSE: "Close",
                                ADD: "Update"
                            }
                        },
                        ASSIGN: {
                            HEADING: "Assign License To User",
                            DESCRIPTION: "Assign License To User",
                            LABELS: {
                                LICENSE: "License",
                                USER: "User"
                            },
                            BUTTONS: {
                                CLOSE: "Close",
                                ASSIGN: "Assign"
                            }
                        },

                    }
                }
            },

            //User Module
            USER: {
                COMPANY_FILES: {
                    ERRORS: {
                        SELECT_FOLDER: "Select folder to upload",
                        UPLOAD_ERROR: "Only jpeg and aef is allowed",
                    },
                    BUTTONS: {
                        UPLOAD: "Upload Files"
                    },
                    MODAL: {
                        UPLOAD_FILES: {
                            HEADING: "Upload Files"
                        },
                        BUTTONS: {
                            CLOSE: "Close",
                            UPLOAD_LOGO: "Select file to upload",
                            UPLOAD: "Upload"
                        },
                        CREATE_FOLDER: {
                            HEADING: "Create Folder",
                            BUTTONS: {
                                CLOSE: "Close",
                                ADD: "Add"
                            },
                            FIELDS: {
                                NAME: "Folder Name"
                            }
                        }
                    }

                }
            },

            EDITOR: {
                PAGE_SETUP: {
                    HEADING: 'Page Setup',
                    OK_BTN: 'OK',
                    CANCEL_BTN: 'Cancel',
                    PAGE_SIZE_LBL: 'Page size',
                    PORTRAIT: 'Portrait',
                    LANDSCAPE: 'Landscape',
                    PIXEL: 'Pixel',
                    CUSTOM: 'Custom',
                    ADJUST_TO_GRAPH: 'Adjust to graph size'
                }
            },
            //Invitation Module
            //Accept Invitation Page
            ACCEPT_INVITE: {
                WELCOME_TEXT: "Welcome to Call Flow Visulaizer Invitation",
                DESCRIPTION: "Setup your account. To see it in action.",
                FIELDS: {
                    FIRST_NAME: "First Name",
                    LAST_NAME: "Last Name",
                    PHONE: "Phone",
                    PASSWORD: "Password"
                },
                BUTTONS: {
                    ACCEPT: "Accept"
                }
            },

            //API Response
            API: {
                //success Or Created Response Message

                //Login API
                LOGIN_200: "Welcome to CFV",

                //User Invite API
                INVITE_USER_200: "Invite sent successfully",

                //User API
                ACTIVATE_USER_200: "User is activated",
                DEACTIVATE_USER_200: "User is deactivated",
                UPDATE_USER_DETAIL_200: "User has been updated",
                SEND_PASSWORD_REQUEST_200: "Password request sent",
                RESEND_INVITE_200: "Invite sent successfully",

                //Accept Invitation API
                ACCEPT_INVITE_200: "Your account has been created. Login to use the system",

                //Send Password Token API
                PASSWORD_TOKEN_200: "Reset link has been sent to your email",

                //Reset Password API
                RESET_PASSWORD_200: "Your password has been reset. Please login to use the system",

                //Company API
                Add_COMPANY_201: "Company created successfully",
                UPDATE_COMPANY_DETAIL_200: "Company detail has been updated",

                DEACTIVATE_COMPANY_200: "Compnay deactivated",
                ACTIVATE_COMPANY_200: "Company activated",

                //License API
                ADD_LICENSE_TO_COMPANY_201: "License has been added",
                UPDATE_LICENSE_TERMS_200: "License terms updated",
                ASSIGN_LICENSE_200: "License has been assigned",

                //File Upload API
                FILE_UPLOAD_200: "File has been uploaded",

                //File Storage API
                CREATE_FOLDER_200: "Folder has been created",

                //Error Message 401,403,404,409

                //Common
                ERROR_401: "Your session has expired. please login and try again.",
                ERROR_403: "You are not authorized to perform this action.",

                //Login API
                LOGIN_404: "Your username or password is incorrect",
                LOGIN_403: "Your company account has been suspended. Please check your company admin",

                //Auth API
                AUTH_404: "Your token has expired",

                //Session API
                SESSION_401: "Your session is expired. Please login again.",

                //User Invite API
                INVITE_USER_409: "Email already exist. Try differnt email",
                GET_USER_DETAIL_404: "User not found",
                ACTIVATE_USER_404: "User not found",
                DEACTIVATE_USER_404: "User not found",

                SEND_PASSWORD_REQUEST_404: "User not found",
                RESEND_INVITE_404: "User not found",

                //Send Password Token API
                PASSWORD_TOKEN_404: "Email not found. Please provide correct email",

                //Reset Password API
                RESET_PASSWORD_404: "Account not found",

                //Company API
                Add_COMPANY_400: "Some thing wrong with your request. We are tying to fix it.",
                Add_COMPANY_404: "Company not found",
                Add_COMPANY_409: "Company already exist. Try differnt name",

                ACTIVATE_COMPANY_400: "Some thing wrong with your request. We are tying to fix it.",
                ACTIVATE_COMPANY_404: "Company not found",

                DEACTIVATE_COMPANY_400: "Some thing wrong with your request. We are tying to fix it.",
                DEACTIVATE_COMPANY_404: "Company not found",

                //license API
                ADD_LICENSE_TO_COMPANY_400: "Some thing wrong with your request. We are tying to fix it.",
                UPDATE_LICENSE_TERMS_404: "License not found",
                ASSIGN_LICENSE_400: "License already assigned to other user",

                //File Upload API
                FILE_UPLOAD_403: "You are not allowed to upload here",

                //File Storage API
                CREATE_FOLDER_409: "Folder already exist",

            }
        });
    }
})();