$(document).ready(() => {
   /* $("#siteid").trigger("change")*/
    Showdata();
    showgrid();
})










// Initialize the map centered in India

//function bindsitet() {
//    $("#beatid").val(0);
//    $("#beatid").trigger('change');

//    var Controller_url = "/Admin/bindbeat";
//    var data = { id: $("#beatid").val() }
//    var ID = "#beatid";
//    BindDropdownsingle(Controller_url, data, "", "", "", ID);

//}

function bindsiteid(id, SiteId) {

    $.ajax({
        url: '/Admin/bindsiteid',
        type: 'post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#siteid');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].SiteId).text(data[i].SitName));
            }
            $("#siteid").val(SiteId);
        },
        error: function (error) {
            alert(error.massage);
        }
    })
}



function bindsitet(id, BeatId) {
    //var routid = $("#routeid").val();
   // bindroute(id, 0);
    $.ajax({
        url: '/Admin/bindbeat',
        type: 'GET',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#beatid');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].locid).text(data[i].BeatName));
            }
            $("#beatid").val(BeatId);
           
        },
        error: function (error) {
            alert(error.massage);
        }
    })
}


function bindroute(id, RouteId) {

    $.ajax({
        url: '/Admin/bindroute',
        type: 'GET',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#routeid');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].RouteId).text(data[i].RouteName));
            }
            $("#routeid").val(RouteId);
        },
        error: function (error) {
            alert(error.massage);
        }
    })
}


function Updateall() {
    var vali = Validation();
    if (vali == '') {

        Update();
        showgrid();
    } else {
        alert(vali);
    }
}

function Update() {

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = url_add + 'api/ApiServices/Save';
   // var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        beatidd: $("#txtHiddenId").val(),
        custid: $("#custid").val(),
        shiftid: $("#siftid").val(),
        siteid: $("#siteid").val(),
        Beatid: $("#beatid").val(),
        routecode: $("#routecode").val(),
        routename: $("#routeid").val(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        UserId: $("#UserId").val(),
        type: 15,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ? 1 : 0,
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

}


function clear() {
    $("#txtHiddenId").val(''),
    $("#siftid").val(0);
  //  $("#siftid").trigger("change");
    //$("#siteid").val(0);
    //$("#siteid").trigger("change");
   // $("#beatid").val(0);
    //  $("#beatid").trigger("change");
    $("#custid").val(0);
    bindsitet(0, 0);
    bindsiteid(0, 0)
    
    bindroute(0, 0),
    $("#routeid").val('')
    $("#routecode").val('');
    $("#routecode").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();
 
};


function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {

        $("#txtHiddenId").val(Id);
        $("#flgmode").val("Del");
        Update();

    }
}


function Showdata() {

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


        type: 16,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}


function EditbyId(id) {
    Hidegrid();
    var Hid_BeatRoute_Id = $("#Hid_BeatRoute_Id" + id + "").html();
    var Hid_ShiftId = $("#Hid_ShiftId" + id + "").html();
    var Hid_SiteId = $("#Hid_SiteId" + id + "").html();
    var Hid_BeatId = $("#Hid_BeatId" + id + "").html();
    var Hid_RoutId = $("#Hid_RoutId" + id + "").html();
    var Hid_Id = $("#Hid_Id" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(Hid_BeatRoute_Id),
    $("#custid").val(Hid_Id),
    $("#siftid").val(Hid_ShiftId);
    //$("#siftid").trigger("change");
    //$("#siteid").val(Hid_SiteId);
    bindsiteid(Hid_Id, Hid_SiteId),
    bindroute(Hid_SiteId, Hid_RoutId),
    bindsitet(Hid_SiteId, Hid_BeatId);
    
    //$("#siteid").trigger("change");
    //$("#siteid").trigger("change");

   /* $("#beatid").trigger("change");*/
    //$("#routeid").val(Hid_RoutId);
    
    /*$("#routecode").val(Hid_BeatRouteCode);*/
    $("#routecode").prop("disabled", true);
  
    $("#flgmode").val('edit');
    $("#submitbtn").html('Update');
}
