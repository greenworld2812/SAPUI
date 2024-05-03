sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/library',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,mobileLibrary, Filter, FilterOperator) {
        "use strict";
        var PopinLayout = mobileLibrary.PopinLayout;
        return Controller.extend("smm.purchase.smm.controller.List", {
            onInit: function () {
                
            },

            onItemSelect:function (oEvent) {
              

                var lv_order_no =  oEvent.getSource().getBindingContext().getProperty("OrderID") ;
                                
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.navTo("RouteOrderitem",{
                    
                    "SelectedItem":lv_order_no,
                    "OrderDet":"Order_Details"
                });

            },
            onFilter:function(oEvt) {
                debugger;
                const aFilter = [];
                //oEvt.getParameters().newValue;
                var oTable = this.getView().byId("idOrderTable");
               //const sQuery = oEvt.getParameters("query");

               var oOrderId = new sap.ui.model.Filter(
				"OrderId",
				sap.ui.model.FilterOperator.EQ,
				'10249');
			var oFilter = new sap.ui.model.Filter({
				filters: [oOrderId],
				and: false
			});
            //    if (sQuery) {
            //     aFilter.push(new Filter("OrderId",FilterOperator.Contains, sQuery));
            //    }
            aFilter.push(oFilter);
               const oBinding = oTable.getBinding("items");
               oBinding.filter(aFilter);
            }
        });
    });
