$(document).ready(function () {
    Showdata();
    var company = $("#company").val();
    if (company !== "") {
        $("#company").trigger('change');
    }
});


function bindBranch(id) {

    $.ajax({
        url: localStorage.getItem("Url") + '/Admin/bindBranch',
        type: 'post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#branch');
            dropdown.empty();
            dropdown.append('<option value="0">Select</option>')
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].locid).text(data[i].BranchName));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function bindCustomer() {

    $.ajax({
        url: localStorage.getItem("Url") + '/Menu/BindCustomer',
        type: 'get',
        data: { CompanyId: $("#Company").val(), BranchId: $("#branch").val() },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#Customer');
            dropdown.empty();
            dropdown.append('<option value="0">All</option>')
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].Value).text(data[i].Text));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function SaveAll() {
    const val = Validation();
    if (val == "") {
        Save();
    } else {
        alert(val);
    }
}

function Save() {
   
   
        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var menuname = data[1] + "/" + data[2];
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        arr = [];
        data = {

            id: $("#txtHiddenId").val(),         
            UserId: $("#UserIdd").val(),
            CompanyId: $("#Company").val(),
            BranchId: $("#branch").val(),
            custid: $("#Customer").val(),
            status: $("#status").is(":checked") ? 1 : 0,
            mode: $("#flgmode").val(),
            type: 44


        }
        arr.push(data);

        CommonAjax(url, JSON.stringify(arr), "", "", "", "", "UserPRint");
    

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

        UserId: $("#UserIdd").val(),
        type: 45,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "UserPRint");

}

function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {
        $("#txtHiddenId").val(Id);
        $("#flgmode").val("Del");
        Save();
        Showdata()
    }
}