$(document).ready(() => {
    showgrid()
 
    show()
})
function Save() {
    const val = Validation();
    if (val == '') {
        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var menuname = data[1] + "/" + data[2];
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = localStorage.getItem("Url") + '/api/ApiServices/ManuRight';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();
             
        arr = [];
        data= {

            Id: $("#txtHiddenId").val(),
                iconclass: $("#iconclass").val(),
                    titleName: $("#titleName").val(),
                        Countid: $("#Countid").val().trim(),
                        
            UrlLink: $("#UrlLink").val().trim(),
                                status: $("#status").is(":checked") ? 1 : 0,
                                    type: 4


        }
        arr.push(data);

        CommonAjax(url, JSON.stringify(arr), "", "", "", "", "printdiv");
        } 
    
}

function show() {

  
        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var menuname = data[1] + "/" + data[2];
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = localStorage.getItem("Url") + '/api/ApiServices/ManuRight';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        arr = [];
        data = {

            Id: $("#txtHiddenId").val(),
          
            type: 5


        }
        arr.push(data);

    CommonAjax(url, JSON.stringify(arr), "", "", "", "", "printdiv");
    

}
function Delete(Id) {
    var res = confirm("Are you Sure to Delete User !");
    if (res) {

   
        
    
    $.ajax({
        url: localStorage.getItem("Url") + '/Profile/DeleteUser',
        type: 'post',
        data: {

            Id:Id

        },
        success: function (data) {
            var data = JSON.parse(data);
            if (data[0].status == 'success') {
                alert(data[0].Massage);

                ShowUser();

            }
            

        },
        error: function (error) {
            alert(error.massage);
        }
    })
    }
}

function EditbyId(id) {
    Hidegrid()
    var HidId = $("#Hid_id" + id + "").html();
    var TitleName = $("#TitleName" + id + "").html();
    var IconClass = $("#IconClass" + id + "").html();
    var CountId = $("#CountId" + id + "").html();
    var backcolor = $("#backcolor" + id + "").html();
    var UrlLink = $("#UrlLink" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(HidId);
    $("#iconclass").val(IconClass);
    $("#titleName").val(TitleName)
    $("#Countid").val(CountId);
    $("#BackColor").val(backcolor);
    $("#UrlLink").val(UrlLink);




    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}