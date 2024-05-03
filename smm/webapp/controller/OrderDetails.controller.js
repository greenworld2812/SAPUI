
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "smm/purchase/smm/utils/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        "use strict";
       var lv_order;
        return Controller.extend("smm.purchase.smm.controller.OrderDetails", {
            Nameformatter: formatter,
            onInit: function () {
                console.log(formatter);
                var oTab = this.getView().byId("_IDGenIconTabBar1");
                var lv_key = oTab.getSelectedKey();
                if (lv_key == undefined || lv_key == "") {
                    oTab.setSelectedKey("Det");
                }
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                    oRouter.getRoute("RouteOrderitem").attachMatched(this._onRouteFound,this);
                  
                  
            },
            _onRouteFound:function (oEvent) {
                var odata;
                var oArgument = oEvent.getParameter("arguments");
                lv_order = oArgument.SelectedItem;
                this.getOwnerComponent().getModel().read("/Orders("+oArgument.SelectedItem + ")/Order_Details",
                { success: function (data) {           
                    var oModel = new sap.ui.model.json.JSONModel();
                    oModel.setData(data);
                    this.getView().setModel(oModel);
                }.bind(this),   
                error: function (){
                    console.log('error');
                }
                });
                //var oModel = new sap.ui.model.json.JSONModel();
                //oModel.setData(odata);
                //var oView = this.getView();            
                //var oModel = oView.getModel();
                //this.getView().setModel(odata);
                //this.getView().byId("_IDGenSmartTable1").rebindTable();
                
                /*
                 var oView  = this.getView().setModel();
                oView.bindElement({

                    path:"/Orders('"+oArgument.SelectedItem + "')/Order_Details"
                });
                */

                

            },

            onSelect:function(oSel) {
                debugger;
                var lv_route;
                var lv_key = this.getView().byId("_IDGenIconTabBar1").getSelectedKey();
                var oModel =  this.getOwnerComponent().getModel();
                if (lv_key == "Emp") {  
                    lv_route = 'Employee';  
                  // var oPath =  this.getOwnerComponent().getManiFestObject().getEntry("/sap.app");
                  
                } 
                else if (lv_key = "Det") {
                    lv_route = 'Order_Details';
                }
                                                
                oModel.read("/Orders("+lv_order+ ")/"+lv_route,{
                    success: function (data) {           
                        var jModel = new sap.ui.model.json.JSONModel();
                        jModel.setData(data);
                        this.getView().setModel(jModel);
                    }.bind(this),   
                    error: function (){
                        console.log('error');
                    }
                });
            
            }
        });
    });