
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
        CustomerId: $("#custidddd").val(),
        type: 9,

    }

     CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function SAVEall() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/ManuRight';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    let arr = [];

 

    $("#printdiv tbody tr").each(function (index, row) {
        if (index === 0) return;
        var row = $(row);
        let obj = {};
        let CustomerId = $("#custidddd").val();
        let SelfiFLG = row.find('input.SelfiFLG1').is(':checked') ? 1 : 0;
        if (CustomerId != '' && SelfiFLG != undefined) {

   

            obj.CustomerId = CustomerId;

            obj.SelfiFLG = SelfiFLG;
            obj.assetflg = row.find('.assetflg1').is(':checked') ? 1 : 0;
            obj.IncidentFlg = row.find('.IncidentFlg1').is(':checked') ? 1 : 0;
            obj.Audioflg = row.find('.Audioflg1').is(':checked') ? 1 : 0;
            obj.Remarkflg = row.find('.Remarkflg1').is(':checked') ? 1 : 0;
            obj.ObservationFlg = row.find('.ObservationFlg1').is(':checked') ? 1 : 0;
            obj.sos_flg = row.find('.sos_flg1').is(':checked') ? 1 : 0;
            obj.IsSequence = row.find('.IsSequence').is(':checked') ? 1 : 0;

            obj.type = 10;
            arr.push(obj);
        }
    });

    console.log(arr);
    CommonAjax(url, JSON.stringify(arr), "", "", "", "", "printdiv");

}
