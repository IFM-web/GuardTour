$(document).ready(function () {
    Showdata();
    showgrid();
});



$('#intime').on('input', function () {
    var inputVal = $(this).val().replace(/[^0-9:]/g, ''); 
    var timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/; 

    if ($('#timeMessage').length === 0) {
        $(this).after('<span id="timeMessage" style="display:none;"></span>');
    }

   
    if (inputVal.length === 2 && inputVal.indexOf(':') === -1) {
        inputVal = inputVal + ':';
    }

   
    if (inputVal.length > 5) {
        inputVal = inputVal.substring(0, 5);
    }

   
    $(this).val(inputVal);

   
    if (timeFormat.test(inputVal)) {
        $(this).css('border-color', 'green');
        $('#timeMessage').text('Valid time format!').css('color', 'green').show();
        checktime=''
    } else {
        $(this).css('border-color', 'red');
        $('#timeMessage').text('Invalid time format. Please use HH:mm.').css('color', 'red').show();
        checktime ='Invalid time format. Please use HH:mm.'
    }
});



function convertToMinutes(time) {
    if (!time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return -1; // Return invalid time
    }
    var parts = time.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}





var checktime = '';
$('#outtime').on('input', function () {
    var timeFormat = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // For HH:mm format
    // var timeFormat = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/; // For HH:mm:ss
    var inputVal = $(this).val();


    if ($('#timeMessage1').length === 0) {
        $(this).after('<span id="timeMessage1" style="display:none;"></span>');
    }

    if (timeFormat.test(inputVal)) {
        $(this).css('border-color', 'green');
        $('#timeMessage1')
            .text('Valid time format!')
            .css('color', 'green')
            .show();
        checktime = '';
            
    } else {
        $(this).css('border-color', 'red');
        $('#timeMessage1')
            .text('Invalid time format. Please use HH:mm.')
            .css('color', 'red')
            .show();
        checktime ='Invalid time format. Please use HH:mm'
    }
});
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




function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        save();
        showgrid();
    } else {
        alert(vali);
    }
}
function save() {
    if (checktime == '') {


        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var menuname = data[1] + "/" + data[2];
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = url_add + 'api/ApiServices/Save';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        var Data = {

            //Beatsiteid: $("#txtHiddenId").val(),
            shiftid: $("#txtHiddenId").val(),
            custid: $("#custid").val(),
            sitenameid: $("#siteid").val(),
            Shiftname: $("#Shiftname").val(),
            routecode: $("#Shiftcode").val(),
            intime: $("#intime").val(),
            outtime: $("#outtime").val(),
            CompanyId: $("#CompanyId").val(),
            BranchId: $("#BranchId").val(),
            type: 17,
            mode: $("#flgmode").val(),
            status: $("#status").is(':checked') ? 1 : 0,
        }

        CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");
    } else
        alert(checktime);
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

        type: 18,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}


function EditbyId(id) {
    Hidegrid();
    var shiftid = $("#Hid_Shift_Id" + id + "").html();
    var siteidd = $("#Hid_siteid" + id + "").text();
    var custid = $("#Hid_Id" + id).html();
    var ShiftName = $("#ShiftName" + id + "").text();
    var ShiftCode = $("#ShiftCode" + id + "").text();
    var ShiftInTime = $("#ShiftInTime" + id + "").html();
    var ShiftOutTime = $("#ShiftOutTime" + id + "").html();

    var companyid = $("#Hid_CompanyId" + id + "").html();
    var branchid = $("#Hid_Branch_Id" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(shiftid);
    $("#custid").val(custid);
    $("#custid").prop('disabled', true);
    $("#siteid").prop('disabled', true);

    bindsiteid(custid, siteidd);
    $("#Shiftname").val(ShiftName);
    $("#Shiftcode").val(ShiftCode);
    $("#Shiftcode").prop("disabled", true);
    $("#outtime").val(ShiftOutTime);
    $("#intime").val(ShiftInTime);
    $("#CompanyId").val(companyid);
    $("#BranchId").val(branchid);
    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}





function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {

        $("#txtHiddenId").val(Id);
        $("#flgmode").val("Del");
        save();

    }
}

function clear() {
    $("#txtHiddenId").val(0)
    $("#Shiftname").val('')
    $("#outtime").val('')
    $("#intime").val('')
    $("#custid").val(0);
    bindsiteid(0, 0);
    $("#custid").prop('disabled', false);
    $("#siteid").prop('disabled', false);
    $("#Shiftcode").val('');
    $('#timeMessage').text('').css('color', 'green').hide();
    $('#timeMessage1').text('').css('color', 'green').hide();

    // Remove border color from input fields (not span)
    $('#intime, #outtime').css('border-color', '');
    $("#Shiftcode").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};