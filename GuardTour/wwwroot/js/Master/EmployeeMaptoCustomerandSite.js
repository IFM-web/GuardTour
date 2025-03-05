
$(document).ready(() => {
    Showdata();
    showgrid()
})


function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        save();
        showgrid()
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
    var url = url_add + 'api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        id: $("#txtHiddenId").val(),
        empid: $("#Employee").val(),
        custid: $("#Customer").val(),
        siteid: $("#Site").val(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 27,
        mode: $("#flgmode").val(),
        UserId: $("#UserId").val(),
        status: $("#status").is(':checked') ? 1 : 0,
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

}

const Showdata =()=> {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = url_add + 'api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 28,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid()
    let empid = $("#Hid_id" + id + "").html();
   
    let EmployeeName = $("#Hid_empid" + id + "").html();
    let customer = $("#Hid_custit" + id + "").html();
    let site = $("#Hid_siteid" + id + "").html();
   
    let status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(empid);
   
    $("#Employee").val(EmployeeName);
    $("#Customer").val(customer);
    $("#Site").val(site);
  
    $("#Employee").prop("disabled", true);

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
    $("#Employee").val(0)
    $("#Customer").val(0)
    $("#Site").val(0)
    $("#Employee").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};