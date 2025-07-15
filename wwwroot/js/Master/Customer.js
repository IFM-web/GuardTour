
$(document).ready(() => {
    Showdata();
    showgrid()
})


function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        save();
   
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

        custid: $("#txtHiddenId").val(),
        custcode: $("#custcode").val().trim(),
        custname: $("#custname").val().trim(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        
        type: 5,
        mode: $("#flgmode").val(),
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
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        UserId: $("#UserId").val(),      
        ProfileId: $("#ProfileIdd").val(),      
        type: 6,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid()
    var custid = $("#Hid_id" + id + "").html();
    var custcode = $("#CustomerCode" + id + "").html();
    var custname = $("#CustomerName" + id + "").html();
    //var companyid = $("#Hid_CompanyId" + id + "").html();
    //var branchid = $("#Hid_Branch_Id" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(custid);
    $("#custcode").val(custcode);
    $("#custname").val(custname);
    $("#custcode").prop("disabled", true);

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
    $("#custcode").val('')
    $("#custname").val('')
    $("#custcode").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};