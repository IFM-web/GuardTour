$(document).ready(() => {
    Showdata()
})

function Showdata() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/ManuRight';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        Id: $("#Userprofile").val(),
        type: 3,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "UserPRint");

}


function Save() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/ManuRight';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    let arr = [];


    $("#UserPRint tbody tr").each(function (index, row) {
        var row = $(row);
        var obj = {};
        var id = row.find('.Hid_id').text();
        if (id != '') {


            obj.CompanyId = $("#CompanyId").val();
            obj.BranchId = $("#BranchId").val();
            obj.ProfileId = $("#Userprofile").val();
            obj.UserId = row.find('.Hid_id').text();
            obj.FlagView = row.find('input.FlagViewv').is(':checked') ? 1 : 0;

            obj.FlagAdd = row.find('input.FlagAdd').is(':checked') ? 1 : 0;
            obj.FlagEdit = row.find('input.FlagEdit').is(':checked') ? 1 : 0;
            obj.FlagDelete = row.find('input.FlagDelete').is(':checked') ? 1 : 0;

            obj.type = 2;
            arr.push(obj);
        }
    });

    CommonAjax(url, JSON.stringify(arr), "", "", "", "", "printdiv");

}