$(document).ready(() => {
    Showdata();
    showgrid()
    
})



function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        saveCompany();
        showgrid()
       
    } else {
        alert(vali);
    }
}

function saveCompany() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();
            
      var Data = {

          comid: $("#txtHiddenId").val(),
          comname: $("#Companyname").val().trim(),
          comcode: $("#Companycode").val().trim(),

        type: 7,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ? 1 : 0,
      }

      CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");
}


function Showdata() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        UserId: $("#UserId").val(),
        type: 8,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid()
    var comid = $("#Hid_Com_Id" + id + "").html();
    var comName = $("#CompanyName" + id + "").html();
    var comCode = $("#CompanyCode" + id + "").html();

    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(comid);
    $("#Companyname").val(comName);
    $("#Companycode").val(comCode);
    $("#Companycode").prop("disabled", true);

    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}



function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {
        $("#txtHiddenId").val(Id);
        $("#flgmode").val("Del");
        saveCompany();
        Showdata();
    }
}

function clear() {
    $("#txtHiddenId").val(0)
    $("#Companyname").val('')
    $("#Companycode").val('')
    $("#Companycode").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};