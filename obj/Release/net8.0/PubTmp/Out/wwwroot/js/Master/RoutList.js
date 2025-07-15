

$(document).ready(() => {
    Showdata();
  
})


function Showdata() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        custid: $("#Routeid").val(),
        siteid: $("#HidsiteId").val(),
        UserId: $("#UserId").val(),
        ProfileId: $("#ProfileIdd").val(),  
        type: 23,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}


function showbom(id) {
    $("#Printdivbomshow").empty();
    $("#mybomModal").modal('show');

    url_add = window.location.href;
    var data = url_add.split("://")
    var protocol = data[0];
    data = data[1].split("/");
    var domain = data[0];
    var menuname = data[1] + "/" + data[2];
    var encrp = "";
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var data = {
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        routename: id,
        type: 24,
        /*hid_Con: Hid_Con,*/
    }
    CommonAjaxBom(url, JSON.stringify(data), "", "", "", Hid_Con, "Printdivbomshow")
}