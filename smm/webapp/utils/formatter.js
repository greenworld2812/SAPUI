sap.ui.define([], function () {
        "use strict";

        return {
            FullName: function (FirstName,LastName) {                
                if (FirstName) {
                    return FirstName.concat(LastName);
                }
                else {
                return;
                }
                //Fname.concat(Lname);
            },

            Address:function (address,city,region,postal,country) {              
                if ( ( address != undefined )  && ( city != undefined )) {
                   var add =  address.concat(city);
                    if (region != "" && postal != "" ) {
                        add.concat(region,postal);
                    }
                    return add;
                }
            }
        };
    });