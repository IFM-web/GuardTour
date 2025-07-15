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
        Id: $("#UserIdd").val(),
        type: 7,

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

    var userid = $("#UserIdd").val();

    $("#UserPRint tbody tr").each(function (index,row) {
        var row = $(row);
        var obj = {};
        MenuId = row.find('.Hid_id').text();
       var FlagAdd = $('.FlagAddd').is(':checked') ? 1 : 0;
        var FlagEdit = $('.FlagEdit').is(':checked') ? 1 : 0;
        var FlagDelete = $('.FlagDelete').is(':checked') ? 1 : 0;
        if (userid != '' && MenuId !='') {
               
            obj.ProfileId = userid;
       
            obj.MenuId = row.find('.Hid_id').text();
            obj.FlagView = row.find('input.FlagViewv').is(':checked') ? 1 : 0;
            obj.FlagAdd = FlagAdd;//row.find('input.FlagAdd').is(':checked') ? 1 : 0;
            obj.FlagEdit = FlagEdit;//row.find('input.FlagEdit').is(':checked') ? 1 : 0;
            obj.FlagDelete = FlagDelete;//row.find('input.FlagDelete').is(':checked') ? 1 : 0;

        obj.type = 8;
            arr.push(obj);
        }
    });

    CommonAjax(url, JSON.stringify(arr), "", "", "", "", "printdiv");

}