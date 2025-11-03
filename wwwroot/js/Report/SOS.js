
$(document).ready(() => {

    $("#custid").trigger("change");

    $("#Todate").val(new Date().toISOString().split('T')[0]);
    $("#Fromdate").val(new Date().toISOString().split('T')[0]);

    ShowdataSOS();

})



function exportexcele() {
    exportexcel('SOS Report')
}

function ShowdataSOS() {
    $("#loader").removeClass("d-none");

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/Api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        Todate: $("#Todate").val(),
        Fromdate: $("#Fromdate").val(),
        type: 54

    }

 
    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");


}





