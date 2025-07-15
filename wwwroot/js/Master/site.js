
$(document).ready(() => {
    Showdata();
    showgrid()
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    localStorage.setItem('custid', id);

})


function SAVEallty() {
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

        siteid: $("#txtHiddenId").val(),
        custid: $("#custid").val(),
        sitename: $("#sitename").val().trim(),
        sitecode: $("#sitecode").val().trim(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        //latitude: $("#latitude").val(),
        //longtitude: $("#longtitude").val(),
        type: 1,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ?1: 0,
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

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        id: $("#SiteId").val(),  
        ProfileId: $("#ProfileIdd").val(),   
        UserId: $("#UserId").val(),
        type: 2,
        
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");
   
}

function EditbyId(id) {
    Hidegrid();
    var siteid = $("#Hid_siteid" + id + "").html();
    var SiteName = $("#SiteName" + id + "").html();
    var custid = $("#Hid_custid" + id + "").html();
    var SiteCode = $("#SiteCode" + id + "").html();
    var companyid = $("#Hid_companyid" + id + "").html();
    var branchid = $("#Hid_Branch_Id" + id + "").html();
    //var latitude = $("#latitude" + id + "").html();
    //var Longitude = $("#Longitude" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(siteid);  
    $("#custid").val(custid);
    $("#custid").prop("disabled", true);
    $("#sitename").val(SiteName);
    $("#sitecode").val(SiteCode);
    $("#sitecode").prop("disabled", true);
    $("#CompanyId").val(companyid);
    $("#BranchId").val(branchid);
    //$("#latitude").val(latitude);
    //$("#longtitude").val(Longitude);
   
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
    $("#custid").val(0)
    $("#sitename").val('')
    $("#sitecode").val('')
    $("#custid").prop("disabled", false);
    $("#sitecode").prop("disabled", false);
    //$("#latitude").val('')
    //$("#longtitude").val('')
    $("#submitbtn").html('Save');    
    $("#flgmode").val('ADD')
    Showdata();                  

};