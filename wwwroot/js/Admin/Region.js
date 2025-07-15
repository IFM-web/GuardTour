
$(document).ready(() => {
    Showdata();
})
function save() {
    var val = Validation()
    if (val == '') {


        url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        id: $("#txtHiddenId").val(),
        regionname: $("#Regionname").val(),
        type: 11,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ? 1 : 0,
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");
   }
    else {
        Swal.fire({
            // title: "Record Not Available",
            text: val,
            icon: "error"
        });
    }
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


        type: 12,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {

    var regid = $("#Hid_regid" + id + "").html();
    var Regionname = $("#RegionName" + id + "").html();

    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(regid);
    $("#Regionname").val(Regionname);


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
    $("#Regionname").val('')

    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};