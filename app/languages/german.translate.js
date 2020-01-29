(function () {
    angular
        .module("cfvApp")
        .config(configureLanguage);

    configureLanguage.$inject = ["$translateProvider"];

    function configureLanguage($translateProvider) {
        $translateProvider.translations("de", {
            //Language Module
            LANGUAGE: {
                US: "Englisch-US",
                DE: "Deutsch-DE"
            },

            //Breadcrum
            BREADCRUM: {
                HOME: "Nach Hause",
                COMPANIES: "Unternehmen"
            },

            //Layout Module
            COMMON: {
                TEST: "Dies ist Test",
                YEAR: "2015-2016",
                PUBLIC_FOOTER: {
                    TEXT: "Call Flow Visulaizer",
                },
                PRIVATE_FOOTER: {
                    TEXT: "Call Flow Visulaizer",
                    COPYRIGHT: "Copyright"
                },
                MODAL: {
                    CONFIRM: {
                        HEADING: "Bestätigung",
                        DESCRIPTION: "Sind Sie sicher, dass Sie löschen wollen?",
                        BUTTONS: {
                            CLOSE: "Zu Schließen",
                            CONFIRM: "bestätigen"
                        }
                    }
                }
            },
            //Error Messages Page
            ERROR_MESSAGES: {
                PASSWORD_MISMATCH: "Passwort Mismatch"
            },
            //Top Navbar
            TOP_NAVBAR: {
                SEARCH_FIELD: "Suche etwas",
                LOGOUT: "ausloggen",
                LANGUAGE: "Sprache"
            },

            //Right Navigation Menu
            RIGHT_NAVIGATION: {
                HOME: "Nach Hause",
                INVITE_USER: "Benutzer einladen",
                COMPANY: "Unternehmen",
                EDITOR: "Herausgeber"
            },

            //Account Module
            //Login Page
            LOGIN: {
                WELCOME_TEXT: "Willkommen bei Fluss Visulaizer Rufen",
                DESCRIPTION: "Einloggen in . Um es in Aktion zu sehen.",
                EMAIL_FIELD: "E-Mail",
                PASSWORD_FIELD: "Passwort",
                BUTTON: "Einloggen",
                FORGOT_PASSWORD_LINK: "Passwort vergessen?"
            },
            //Forgot Password Page
            FORGOT_PASSWORD: {
                WELCOME_TEXT: "Willkommen bei Fluss Visulaizer Rufen",
                DESCRIPTION: "Ihr Passwort zurücksetzen",
                EMAIL_FIELD: "E-Mail",
                BUTTON: "Passwort zurücksetzen",
                LOGIN_LINK: "Einloggen"
            },
            //Reset Password Page
            RESET_PASSWORD: {
                WELCOME_TEXT: "Willkommen bei Fluss Visulaizer Rufen",
                DESCRIPTION: "Stellen Sie Ihr Passwort ein. Um es in Aktion zu sehen",
                PASSWORD_FIELD: "Passwort",
                CONFIRM_PASSWORD_FIELD: "Passwort Bestätigen",
                BUTTON: "einreichen"
            },

            //User Module
            USER: {
                MODAL: {
                    INVITE_USER: {
                        HEADING: "Benutzer einladen",
                        LABELS: {
                            EMAIL: "E-Mail",
                        },
                        FIELDS: {
                            EMAIL: "Benutzer E-Mail",
                        },
                        BUTTONS: {
                            CLOSE: "Zu Schließen",
                            INVITE: "Einladung abschicken"
                        }
                    },
                    USER_DETAIL: {
                        HEADING: "Benutzerdetails",
                        LABELS: {
                            FIRST_NAME: "Vorname",
                            LAST_NAME: "Nachname",
                            LANGUAGE_CODE: "Sprache",
                        },
                        FIELDS: {
                            FIRST_NAME: "Vorname",
                            LAST_NAME: "Nachname",
                            LANGUAGE_CODE: "Sprache",
                        },
                        BUTTONS: {
                            CLOSE: "Zu Schließen",
                            RESET_PASSWORD: "Kennwort zurücksetzen",
                            RESEND_INVITE: "Erneut senden einladen",
                            ACTIVATE: "aktivieren",
                            DEACTIVATE: "deaktivieren"
                        }
                    }
                }
            },

            //Invitation Module
            //Accept Invitation Page
            ACCEPT_INVITE: {
                WELCOME_TEXT: "Willkommen in Fluss Visulaizer Einladung Rufen",
                DESCRIPTION: "Richten Sie Ihr Konto. Um es in Aktion zu sehen.",
                PASSWORD_FIELD: "Passwort",
                BUTTON: "Nimm An"
            },

            //Company Module

            //Company Page
            COMPANY: {
                HEADING: "Unternehmen",
                CREATE_BUTTON: "Neues Unternehmen",
                MODAL: {
                    HEADING: "Firmeneintrag",
                    DESCRIPTION: "",
                    NAME_FIELD: "Name Der Firma",
                    CLOSE_BUTTON: "Zu Schließen",
                    SAVE_BUTTON: "Speichern"
                }
            },

            //Company Detail Page
            COMPANY_DETAIL: {
                TABS: {
                    DETAIL: "Unternehmen Detail",
                    USER: "Benutzer"
                },
                BUTTONS: {
                    INVITE: "Benutzer einladen",
                    DEACTIVATE_COMPANY: "deaktivieren Unternehmen",
                    ACTIVATE_COMPANY: "Aktivieren Unternehmen"
                },
                FORM: {
                    LABELS: {
                        NAME: "Name",
                        LICENSE: "Lizenz verfügbar",
                        ADDRESS: "Anschrift",
                        WEBSITES: "Webseite",
                        CONTACT_PERSON: "Gesprächspartner",
                        TELEPHONE: "Telefon"
                    },
                    FIELDS: {
                        NAME: "Name Der Firma",
                        LICENSE: "Verfügbare Lizenz",
                        ADDRESS: "Anschrift",
                        WEBSITES: "Webseite",
                        CONTACT_PERSON: "Personennamen",
                        TELEPHONE: "Telefon"
                    }
                }
            },

            //API Response
            API: {
                //success Or Created Response Message

                //Login API
                LOGIN_200: "Willkommen bei CFV",

                //User Invite API
                INVITE_USER_201: "Erfolgreich gesendet einladen",
                ACTIVATE_USER_200: "Benutzer aktiviert",
                DEACTIVATE_USER_200: "Benutzer deaktiviert",

                //Accept Invitation API
                ACCEPT_INVITE_200: "Ihr Konto wurde erstellt. Einloggen , um das System nutzen",

                //Send Password Token API
                PASSWORD_TOKEN_200: "Reset Link wurde an Ihre E-Mail gesendet wurde",

                //Reset Password API
                RESET_PASSWORD_200: "Ihr Passwort wurde zurückgesetzt. Bitte einloggen , um das System nutzen",

                //Company API
                Add_COMPANY_201: "Unternehmen erfolgreich erstellt",

                DEACTIVATE_COMPANY_200: "compnay deaktiviert",
                ACTIVATE_COMPANY_200: "Unternehmen aktiviert",

                //Error Message 401,403,404,409

                //Common
                ERROR_401: "Ihre Sitzung ist abgelaufen . bitte anmelden und versuchen Sie es erneut.",
                ERROR_403: "Sie sind nicht berechtigt , diese Aktion durchzuführen.",

                //Login API
                LOGIN_404: "Ihr Benutzername oder Passwort ist falsch",

                //User Invite API
                INVITE_USER_409: "E-Mail vorhanden ist. Versuchen Sie differnt email",


                ACTIVATE_USER_404: "Nicht gefunden",
                DEACTIVATE_USER_404: "Nicht gefunden",

                //Send Password Token API
                PASSWORD_TOKEN_404: "Eine E-Mail nicht gefunden. Stellen Sie bitte korrekte E-Mail-",

                //Reset Password API
                RESET_PASSWORD_404: "Konto nicht gefunden",

                //Company API
                Add_COMPANY_400: "Etwas, was falsch mit Ihrem Antrag. Wir versuchen, es zu beheben.",
                Add_COMPANY_404: "Unternehmen nicht gefunden",
                Add_COMPANY_409: "Unternehmen bereits vorhanden sind. Versuchen Sie differnt Namen",

                ACTIVATE_COMPANY_400: "Etwas, was falsch mit Ihrem Antrag. Wir versuchen, es zu beheben.",
                ACTIVATE_COMPANY_404: "Unternehmen nicht gefunden",

                DEACTIVATE_COMPANY_400: "Etwas, was falsch mit Ihrem Antrag. Wir versuchen, es zu beheben.",
                DEACTIVATE_COMPANY_404: "Unternehmen nicht gefunden"
            }
        });
    }
})();