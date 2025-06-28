

export const EMAIL_VALIDATION = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;


export const PASSWORD_VALIDATION =  {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    "Minimum 8 characters, with at least one upper case, lower case, number, and special character.",
                };