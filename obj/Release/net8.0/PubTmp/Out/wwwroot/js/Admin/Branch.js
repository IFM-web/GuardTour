
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
        comid: $("#Companyid").val(),
        branchname: $("#Branchname").val(),
        branchcode: $("#Branchcode").val(),

        type: 9,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ? 1 : 0,
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

}

const Showdata = () => {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        UserId: $("#UserId").val(),
        type: 10,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}



//function EditbyId(id) {
//    var comid = $("#Hid_brid" + id).html();
//    var companyname = $("#BranchName" + id).html();
//    var companyid = $("#Hid_CompanyId" + id).html();
//    var companycode = $("#BranchCode" + id).html();
//    var status = $("#Status" + id).html();

//    // Status ko checkbox me set karna
//    if (status === 'Active') {
//        $("#status").prop("checked", true);
//    } else {
//        $("#status").prop("checked", false);
//    }

//    // Form fields me data set karna
//    $("#txtHiddenId").val(comid);
//    $("#Branchname").val(companyname);

//    // Select2 dropdown me value set karna
//    $("#Companyid").val(companyid).trigger('change');

//    $("#Branchcode").val(companycode);
//    $("#Branchcode").prop("disabled", true);

//    // Mode set karna for edit action
//    $("#flgmode").val("edit");
//    $("#submitbtn").html('Update');
//}


function EditbyId(id) {
    Hidegrid()
    var comid = $("#Hid_brid" + id + "").html();
    var companyname = $("#BranchName" + id + "").html();
    var companyid = $("#Hid_CompanyId" + id + "").html();
    var companycode = $("#BranchCode" + id + "").html();

    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(comid);
    $("#Branchname").val(companyname);
    $("#Companyid").val(companyid);
    $("#Companyid").prop("disabled", true);
    $("#Companyid").trigger("change");
    $("#Branchcode").val(companycode);
    $("#Branchcode").prop("disabled", true);

    //$('#ddlcountry1').val(countryId);



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
    $("#Branchname").val('')
    $("#Companyid").val(0);
    $('#Companyid').trigger('change');
    $("#Branchcode").val('')
    $("#Branchcode").prop("disabled", false);
    $("#Companyid").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};