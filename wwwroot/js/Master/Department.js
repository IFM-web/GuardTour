$(document).ready(() => {
    Showdata();
})


function bindsiteid(id) {

    $.ajax({
        url: localStorage.getItem("Url") + '/DropDownList/bindsiteid',
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

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function saveAll() {
    let val = Validation();
    if (val == "") {
       
            save();
        
       
    }
    else {
        swal("Message", val, "error");
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
        id: $("#txtHiddenId").val(),
        custid: $("#custidddd").val(),        
        siteid: $("#siteid").val(),
        Dept: $("#deptName").val().trim(),        
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 57,
        mode: $("#flgmode").val(),
        UserId: $("#UserId").val(),
       
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "Printdiv");

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

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 58,
        UserId: $("#UserId").val(),
        ProfileId: $("#ProfileIdd").val(),

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

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

function EditbyId(id) {
   
    let Eid = $("#Hid_id" + id + "").html();
    let custid = $("#Hid_CustomerId" + id + "").html();
    let siteid = $("#Hid_Siteid" + id + "").html();
    let DeptName = $("#DeptName" + id + "").html();


    $("#txtHiddenId").val(Eid);
    $("#custidddd").val(custid);
    $("#custidddd").trigger('change');
    setTimeout(() => {
        $("#siteid").val(siteid); 
    },200)
    $("#deptName").val(DeptName);
  
    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}