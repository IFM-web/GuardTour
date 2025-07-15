
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

function BindRoute(id) {

    $.ajax({
        url: localStorage.getItem("Url") + '/Master/RouteTOEmp',
        type: 'get',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#route');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].Id).text(data[i].Name));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
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

        id: $("#txtHiddenId").val(),
        empid: $("#Employee").val(),
        routecode: $("#route").val(),        
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 29,
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
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        ProfileId: $("#ProfileIdd").val(), 
        type:30,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid()
    let empid = $("#Hid_id" + id + "").html();
    let EmployeeName = $("#Hid_empid" + id + "").html();
    let Routeid = $("#Hid_routeid" + id + "").html();
    let status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(empid);

 
    $("#Employee").val(EmployeeName);
    $("#Employee").trigger('change');
 
    $("#route").val(Routeid);

  
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
    $("#route").val(0)
    $("#Employee").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};


//function EmployeeMaptoRoute(id) {
//    // let id = $('#custid').val();
//    $.ajax({
//        url: localStorage.getItem("Url") + '/Admin/BindEmployeeMaptoRoute',
//        type: 'post',
//        data: { Empid: id },
//        success: function (data) {
//            var data = JSON.parse(data);

//            var dropdown = $('#route');
//            dropdown.empty();
//            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
//            for (var i = 0; i < data.length; i++) {

//                dropdown.append($('<option></option>').attr('value', data[i].Id).text(data[i].Name));
//            }
//            $("#route").val();
//        },
//        error: function (error) {
//            alert(error.massage);
//        }
//    })
//}