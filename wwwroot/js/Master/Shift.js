$(document).ready(function () {
    Showdata();
    showgrid();
});



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



function convertToMinutes(time) {
    if (!time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return -1; // Return invalid time
    }
    var parts = time.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}



function isTimeBGreater(timeA, timeB) {
    const [h1, m1] = timeA.split(':').map(Number);
    const [h2, m2] = timeB.split(':').map(Number);

    const minutesA = h1 * 60 + m1;
    const minutesB = h2 * 60 + m2;

    return minutesB > minutesA;
}

var checktime = '';
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
                    .text('EndTime Must be greater than InTime')
                    .css('color', 'red')
                    .show();
                checktime = 'EndTime Must be greater than InTime'
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
//function bindsiteid(id, SiteId) {

//    $.ajax({
//        url: localStorage.getItem("Url") + '/Admin/bindsiteid',
//        type: 'post',
//        data: { id: id },
//        success: function (data) {
//            var data = JSON.parse(data);

//            var dropdown = $('#siteid');
//            dropdown.empty();
//            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
//            for (var i = 0; i < data.length; i++) {

//                dropdown.append($('<option></option>').attr('value', data[i].SiteId).text(data[i].SitName));
//            }
//            $("#siteid").val(SiteId);
//        },
//        error: function (error) {
//            alert(error.massage);
//        }
//    })
//}




function SAVEall() {
    var vali = Validation();
    if (vali == '') {

        save();
       
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
        var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
        var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

        var Data = {

            //Beatsiteid: $("#txtHiddenId").val(),
            shiftid: $("#txtHiddenId").val(),
            custid: $("#custid").val(),
            sitenameid: $("#siteid").val(),
            Shiftname: $("#Shiftname").val().trim(),
            routecode: $("#Shiftcode").val().trim(),
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
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {
        CompanyId: $("#CompanyId").val(),
        custid: $("#custidd").val(),
        siteid: $("#siteidd").val(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        UserId: $("#UserId").val(),
        ProfileId: $("#ProfileIdd").val(), 
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

   // bindsiteid(custid, siteidd);
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