
$(document).ready(() => {
    
  
  
    var custid = $("#hidcustid").val();
    var siteid = $("#hidSite").val();
    var shiftid = $("#hidshift").val();
 
    Showdata();
    showgrid();

   
})




function BindShifttoSide() {
    let id = $("#siteid").val();
    let data = { id: id };
    let url = localStorage.getItem("Url") + '/Master/BindShifttoSide';
    let dropdown = $('#shiftid');
    BindDropdownsingle(url, data, '', '', '', dropdown, 'Select')

}
var checktime = ''
function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        savebeat();
    
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
        var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        var Data = {


            beatidd: $("#txtHiddenId").val(),
            custid: $("#custid").val(),
            sitenameid: $("#siteid").val(),
            shiftid: $("#shiftid").val(),
            beatname: $("#beatname").val().trim(),
            beatcode: $("#beatcode").val().trim(),
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


$('#intime').on('input', function () {
    var raw = $(this).val().replace(/[^0-9]/g, ''); // Only digits
    var formatted = '';
    var timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;


    if (raw.length >= 3) {
        formatted = raw.substring(0, 2) + ':' + raw.substring(2, 4);
    } else {
        formatted = raw;
    }


    formatted = formatted.substring(0, 5);

    $(this).val(formatted);

    
    if ($('#timeMessage').length === 0) {
        $(this).after('<span id="timeMessage" style="display:none;"></span>');
    }

 
    if (timeFormat.test(formatted)) {
        $(this).css('border-color', 'green');
        $('#timeMessage').text('Valid time format!').css('color', 'green').show();
        checktime = '';
    } else {
        $(this).css('border-color', 'red');
        $('#timeMessage').text('Invalid time format. Please use HH:mm.').css('color', 'red').show();
        checktime = 'Invalid time format. Please use HH:mm.';
    }
});



   



function isTimeBGreater(timeA, timeB) {

        const [h1, m1] = timeA.split(':').map(Number);
        const [h2, m2] = timeB.split(':').map(Number);

        const minutesA = h1 * 60 + m1;
        const minutesB = h2 * 60 + m2;

        return minutesB > minutesA;
    
}


$('#outtime').on('input', function () {
    var raw = $(this).val().replace(/[^0-9]/g, ''); // Only digits
    var formatted = '';
    var timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;


    if (raw.length >= 3) {
        formatted = raw.substring(0, 2) + ':' + raw.substring(2, 4);
    } else {
        formatted = raw;
    }


    formatted = formatted.substring(0, 5);

    $(this).val(formatted);

    var intime = $("#intime").val()
    if (intime != '') {



     


            if ($('#timeMessage1').length === 0) {
                $(this).after('<span id="timeMessage1" style="display:none;"></span>');
            }

            if (timeFormat.test(formatted)) {
                $(this).css('border-color', 'green');
                $('#timeMessage1')
                    .text('Valid time format!')
                    .css('color', 'green')
                    .show();
             
                if (!isTimeBGreater(intime, formatted)) {
                    $(this).css('border-color', 'red');
                    $('#timeMessage1')
                        .text('EndTime Must be greater than StartTime')
                        .css('color', 'red')
                        .show();
                    checktime = 'EndTime Must be greater than StartTime'
                }
                else
                    checktime = '';


            } else {
                $(this).css('border-color', 'red');
                $('#timeMessage1')
                    .text('Invalid time format. Please use HH:mm.')
                    .css('color', 'red')
                    .show();
                checktime = 'Invalid time format. Please use HH:mm'
            }

    
    } else {
        alert("Start Time Required");
        $(this).val('');
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
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();
    custid = $("#hidcustid").val();
    siteid = $("#hidSite").val();
    shiftid = $("#hidshift").val();
    var Data = {
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        custid: custid,
        siteid: siteid,
        shiftid: shiftid,
        UserId: $("#UserId").val(),
        ProfileId: $("#ProfileIdd").val(), 
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