
$(document).ready(() => {
    Showdata();
    showgrid();
})

function bindsiteid(id,site) {

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
            $('#siteid').val(site);
        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        savebeat();
        showgrid();
    } else {
        alert(vali);
    }
}

function savebeat() {
    if (checktime == '') {

        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var menuname = data[1] + "/" + data[2];
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = url_add + 'api/ApiServices/Save';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        var Data = {


            beatidd: $("#txtHiddenId").val(),
            custid: $("#custid").val(),
            sitenameid: $("#siteid").val(),
            shiftid: $("#shiftid").val(),
            beatname: $("#beatname").val(),
            beatcode: $("#beatcode").val(),
            intime: $("#intime").val(),
            outtime: $("#outtime").val(),
            CompanyId: $("#CompanyId").val(),
            BranchId: $("#BranchId").val(),
            type: 21,
            mode: $("#flgmode").val(),
            status: $("#status").is(':checked') ? 1 : 0,
        }

        CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

    } else
        alert(checktime);
}
var checktime=''

$('#intime').on('input', function () {
    var timeFormat = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // For HH:mm format
    // var timeFormat = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/; // For HH:mm:ss
    var inputVal = $(this).val();


    if ($('#timeMessage').length === 0) {
        $(this).after('<span id="timeMessage" style="display:none;"></span>');
    }

    if (timeFormat.test(inputVal)) {
        $(this).css('border-color', 'green');
        $('#timeMessage')
            .text('Valid time format!')
            .css('color', 'green')
            .show();
        checktime = '';
    } else {
        $(this).css('border-color', 'red');
        $('#timeMessage')
            .text('Invalid time format. Please use HH:mm.')
            .css('color', 'red')
            .show();
        checktime ='Invalid time format. Please use HH:mm.'
    }
});

   






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
        checktime = 'Invalid time format. Please use HH:mm'
    }
});

// Function to convert HH:mm to total minutes for comparison
function convertToMinutes(time) {
    if (!time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return -1; // Return invalid time
    }
    var parts = time.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
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

        type: 22,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function EditbyId(id) {
    Hidegrid();
    var bshiftid = $("#Hid_BeatShift_Id" + id + "").html();
    var Hid_Id = $("#Hid_Id" + id + "").html();
    var BeatCode = $("#BeatCode" + id + "").html();
    var Hid_siteid = $("#Hid_siteid" + id + "").html();
    var shiftid = $("#Hid_Shift_Id" + id + "").html();
    var ShiftName = $("#BeatName" + id + "").text();
    var ShiftInTime = $("#BeatInTime" + id + "").html();
    var ShiftOutTime = $("#BeatOutTime" + id + "").html();

    var companyid = $("#Hid_CompanyId" + id + "").html();
    var branchid = $("#Hid_Branch_Id" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(bshiftid);
    $("#custid").val(Hid_Id);
    $("#custid").prop('disabled', true);
    $("#siteid").prop('disabled', true);
    $("#shiftid").prop('disabled', true);
    bindsiteid(Hid_Id, Hid_siteid);
    $("#shiftid").val(shiftid);
    $("#shiftid").trigger("change");
    $("#beatcode").val(BeatCode);
    $("#beatcode").prop("disabled", true);
    $("#beatname").val(ShiftName);
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
        savebeat();

    }
}

function clear() {
    $("#txtHiddenId").val(0)
    $("#shiftid").val(0)
    $("#beatname").val('')
    $("#outtime").val('')
    $("#intime").val('')
    $("#custid").val(0);
    bindsiteid(0, 0);
    $("#custid").prop('disabled', false);
    $("#siteid").prop('disabled', false);
    $("#shiftid").prop('disabled', false);
    $("#beatcode").val('');
    $('#timeMessage').text('').css('color', 'green').hide();
    $('#timeMessage1').text('').css('color', 'green').hide();

    // Remove border color from input fields (not span)
    $('#intime, #outtime').css('border-color', '');
    $("#beatcode").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};