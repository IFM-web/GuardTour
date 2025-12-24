
$(document).ready(() => {
    Showdata();
    showgrid()
    $("#Customer").trigger('change');


})


function SAVEall() {
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

    var Routes = $("#customSelect").val();
    var arrry = Routes.split(',');
    var Jsondata = [];
    for (var e of arrry) {

  
    var Data = {

        id: $("#txtHiddenId").val(),
        empid: $("#Employee").val(),
        custid: $("#Customer").val(),
        siteid: $("#Site").val(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        routecode:e.trim(), //$("#Route").val(),
        shiftid: $("#Shift").val(),
        type: 27,
        mode: $("#flgmode").val(),
        UserId: $("#UserId").val(),
        status: $("#status").is(':checked') ? 1 : 0,
        }
        Jsondata.push(Data);
    }

    CommonAjax(url, JSON.stringify(Jsondata), "", "", "", "", "PrintdivModal");

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
        UserId: $("#UserId").val(),
        type: 28,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid()
    let empid = $("#Hid_id" + id + "").html();

    let EmployeeName = $("#Hid_empid" + id + "").html();
    let customer = $("#Hid_custit" + id + "").html();
    let site = $("#Hid_siteid" + id + "").html();

    let status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(empid);

    $("#Employee").val(EmployeeName);
    $("#Employee").trigger("change")
    $("#Customer").val(customer);
    $("#Customer").trigger("change")
    $("#Site").val(site);

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
    $("#Customer").val(0)
    $("#Site").val(0)
    $("#Employee").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};

function BindSide() {
    
    let id = $("#Customer").val();  
    $('#Site').val(0)
    $('#Site').trigger('change');
    $.ajax({
        url: localStorage.getItem("Url") + '/admin/bindsiteid',
        type: 'Post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#Site');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].SiteId).text(data[i].SitName));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    });
}

function BindShifttoSide() {
    $("#customSelect").val('');
    document.getElementById("checkboxContainer").innerHTML = '';
    let id = $("#Site").val();
    let data = { id: id };
    let url = localStorage.getItem("Url") + '/DropDownList/BindShifttoSide';
    let dropdown = $('#Shift');
    BindDropdownsingle(url, data, '', '', '', dropdown, 'Select')

}

function BindRoutetoShift() {
    let shift = $("#Shift").val();
    $("#customSelect").val('');
    let url = localStorage.getItem("Url") + '/Master/BindRoutetoShift';
    $.ajax({
        url: url,
        type:'post',
        data: { Shift: shift },
        success: (data) => {
            var data = JSON.parse(data);
            var i = 0;
            var container = document.getElementById("checkboxContainer");
            container.innerHTML = '';

            for (var e of data) {
                const dd = `
      <div class="form-check ms-2">
         
        <input class="form-check-input chkItem" type="checkbox" value="${e.Id}" id="chk${i}">
        <label class="form-check-label" for="chk${i}">${e.Name}</label>
      </div>
    `;
                container.innerHTML += dd;
                ++i;
            }
        },
        error: (data) => {
            console.log(data);
        }


    });









}

function FrequencyDelete(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {


        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var menuname = data[1] + "/" + data[2];
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        var Data = {

            id: Id,

            type: 51,

        }

        CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

    }




}

const displayBox = document.getElementById('customSelect');
const menu = document.getElementById('checkboxContainer');
const wrapper = document.querySelector('.custom-multiselect');

// Open/close toggle
displayBox.addEventListener('click', function () {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Close when clicking outside
document.addEventListener('click', function (event) {
    if (!wrapper.contains(event.target)) {
        menu.style.display = 'none';
    }
});


menu.addEventListener('change', function () {
    const selected = Array.from(menu.querySelectorAll(".chkItem:checked"))
        .map(cb => cb.value);  
    displayBox.value = selected.join(",");  
});



function showbom(id) {
    $("#Printdivbomshow").empty();
    $("#mybomModal").modal('show');

    url_add = window.location.href;
    var data = url_add.split("://")
    var protocol = data[0];
    data = data[1].split("/");
    var domain = data[0];
    var menuname = data[1] + "/" + data[2];
    var encrp = "";
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var data = {
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        routename: id,
        type: 50,
        /*hid_Con: Hid_Con,*/
    }
    CommonAjaxBom(url, JSON.stringify(data), "", "", "", Hid_Con, "Printdivbomshow")
}
