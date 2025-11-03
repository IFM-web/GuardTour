$(document).ready(() => {
    Showdata();
    showgrid()
  
})



function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        save();
        showgrid();

    } else {
        alert(vali);
    }
}

function save() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {
        id: $("#txtHiddenId").val(),
        Usertype: $("#Usertype").val().trim(),
        type: 43,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ? 1 : 0,
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");
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
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        UserId: $("#UserId").val(),
        type: 42,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid()
    var useridid = $("#Hid_Id" + id + "").html();
    var usertype = $("#Hid_Usertype" + id + "").html();
   

    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(useridid);
    $("#Usertype").val(usertype);

    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}



function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {
        $("#txtHiddenId").val(Id);
        $("#flgmode").val("Del");
        save();
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