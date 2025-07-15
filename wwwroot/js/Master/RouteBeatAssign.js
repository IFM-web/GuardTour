
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

$("#siteid").change(function () {
    BindShifttoSide()
})
//$('#Shift').change(function () {
//    const shift = $(this).val();
//    const customerId = $("#siteid").val();

//    getdata(customerId);
//    getdataofshift(shift);
   
//});
function BindShifttoSide() {
    let id = $("#siteid").val();
    let data = { id: id };
    let url = localStorage.getItem("Url") + '/DropDownList/BindShifttoSide';
    let dropdown = $('#Shift');
    BindDropdownsingle(url, data, '', '', '', dropdown, 'Select')

}
function getdata(id) {

    url_add = window.location.href;
    var data = url_add.split("://");
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
        siteid: id,
        type: 31,


    }

    Bindtrntable(url, JSON.stringify(data), "", "", "", "", "2");
}

function getdataofshift(id) {

    url_add = window.location.href;
    var data = url_add.split("://");
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
        shiftid: id,
        type: 46,


    }

    Bindtrntable(url, JSON.stringify(data), "", "", "", "", "4");
}

var allitem = [];


//function addselectedpost(row) {
//    var items = {
//        siteid: $("#siteid").val(),
//        beatid: $(row).find(".Hid_beatid").text(),
//        PostName: $(row).find(".PostName").text(),
//    };

//    console.log(items);

//    allitem.push(items);


//}


function Frequency(no) {
    if ($("#Shift").val() == 0) {
        $("#Frequency").val(0)
        alert('Select Shift First');
       
    } else {
        if (no != 0) {


            $("#modalFrequency").modal('show');
            $("#HTMLEelemnt").empty();
            var htmlcontent = '';
            for (var i = 1; i <= no; i++) {
                htmlcontent += `
        <div class='row'>
         <div class='col-2' style="
    margin-top: 26px;
    font-weight: bold;">Frequency ${i}</div>
        <div class='col-5'>Start Time <input type='text' name='Frequency ${i} Start Time' class='form-control mandatory' onInput="strartTime('#st${i}',${i})" id='st${i}' placeholder='HH:MM'></div>
        <div class='col-5'>End Time <input type='text'  name='Frequency ${i} End Time'  class='form-control endtime mandatory' onInput="EndtTime('#et${i}',${i})" id='et${i}' placeholder='HH:MM'></div>

        </div>
        
        `
            }

            $("#HTMLEelemnt").append(htmlcontent)
        }
    }
}

$("#CloseBTn").on('click', function () {
  
    $("#modalFrequency").modal('hide');

});;

function strartTime(Id,index){
    var raw = $(Id).val().replace(/[^0-9]/g, ''); // Only digits
    var formatted = '';
    var timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;


    if (raw.length >= 3) {
        formatted = raw.substring(0, 2) + ':' + raw.substring(2, 4);
    } else {
        formatted = raw;
    }


    formatted = formatted.substring(0, 5);

    $(Id).val(formatted);

   
    if ($('#timeMessage' + index).length === 0) {
        $(Id).after(`<span id="timeMessage${index}" style="display:none;"></span>`);
    }


    if (timeFormat.test(formatted)) {
        $(Id).css('border-color', 'green');
        $('#timeMessage' + index).text('Valid time format').css('color', 'green').show();
        checktime = '';
    } else {
        $(Id).css('border-color', 'red');
        $('#timeMessage' + index).text('Invalid time format. Please use HH:mm.').css('color', 'red').show();
        checktime = 'Invalid time format. Please use HH:mm.';
    }
};


function EndtTime(Id,index) {
    var raw = $(Id).val().replace(/[^0-9]/g, ''); // Only digits
    var formatted = '';
    var timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;


    if (raw.length >= 3) {
        formatted = raw.substring(0, 2) + ':' + raw.substring(2, 4);
    } else {
        formatted = raw;
    }


    formatted = formatted.substring(0, 5);

    $(Id).val(formatted);

    var intime = $("#st"+index).val()
    if (intime != '') {






        if ($('#timeMessage11' + index).length === 0) {
            $(Id).after(`<span id="timeMessage11${index}" style="display:none;"></span>`);
        }

        if (timeFormat.test(formatted)) {
            $(Id).css('border-color', 'green');
            $('#timeMessage11' + index)
                .text('Valid time format')
                .css('color', 'green')
                .show();

            if (!isTimeBGreater(intime, formatted)) {
                $(Id).css('border-color', 'red');
                $('#timeMessage11' + index)
                    .text('EndTime Must be greater than StartTime')
                    .css('color', 'red')
                    .show();
                checktime = 'EndTime Must be greater than StartTime'
            }
            else
                checktime = '';


        } else {
            $(Id).css('border-color', 'red');
            $('#timeMessage11' + index)
                .text('Invalid time format. Please use HH:mm.')
                .css('color', 'red')
                .show();
            checktime = 'Invalid time format. Please use HH:mm'
        }


    } else {
        alert("Start Time Required");
        $(Id).val('');
    }

};
function isTimeBGreater(timeA, timeB) {
    const [h1, m1] = timeA.split(':').map(Number);
    const [h2, m2] = timeB.split(':').map(Number);

    const minutesA = h1 * 60 + m1;
    const minutesB = h2 * 60 + m2;

    return minutesB > minutesA;
}


var routes = [];
var shifts = [];


function addroute(row) {
   
    $(row).find("td").toggleClass("active");
}


function addshift(row) {
   
  var d=  $(row).find("td").toggleClass("active");
}



function SAVEall() {

    var vali = Validation();
    if (vali == '') {
      
        Data();
    } else {
        swal("Message", vali, "error");
     
    }
}



function Data() {
    if (checktime == '') {


        url_add = window.location.href;
        var data = url_add.split("://");
        data = data[1].split("/");
        var url_add = window.location.protocol + "//" + window.location.host + "/";
        var url = localStorage.getItem("Url") + '/api/ApiServices/Save';

        var Itemprod = new Array();
        var Frequency = $("#Frequency").val();
        for (var i = 1; i <= Frequency; i++) {


            const item = {};
            item.custid = $("#custid").val();
            item.siteid = $("#siteid").val();

            item.CompanyId = $("#CompanyId").val();
            item.BranchId = $("#BranchId").val();
            item.UserId = $("#UserId").val();
            item.type = 47;
            item.NoOfFrq = Frequency;
            item.mode = $("#flgmode").val();
            item.status = $("#status").is(':checked') ? 1 : 0;
            //item.Beatid = $(row).find('.active #beatid').text();
            item.shiftid = $("#Shift").val();
            item.intime = $("#st" + i).val();
            item.outtime = $("#et" + i).val();
            item.routecode = $("#Route").val();


            Itemprod.push(item);

        }

        console.log(Itemprod)


        CommonAjax(url, JSON.stringify(Itemprod), "", "", "", "", "Printdiv")

    } else {
        alert(checktime);
        $("#modalFrequency").modal('show');
        
    }

}





$("#siteid").on('change', function () {
    let id = $("#siteid").val();
    let data = { id: id };
    let url = localStorage.getItem("Url") + '/Master/BindRoutetoSite';
    let dropdown = $('#Route');
    BindDropdownsingle(url, data, '', '', '', dropdown, 'Select')

})

function clear() {
    $("#txtHiddenId").val(0)
    $("#siteid").val(0)
    $("#custid").val(0)
    $("#routename").val('')
    $("#routecode").val('')
    $("#Selectedbody").empty();
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    $("#Availablebody").empty();


};


//function filterAndDeleteItems() {
//    let remainingItems = [];


//    for (let i = 0; i < allitem.length; i++) {
//        let found = false;

//        for (let j = 0; j < delallitem.length; j++) {
//            if (allitem[i].beatid === delallitem[j].beatid) {
//                found = true;
//                break;
//            }
//        }

//        if (!found) {
//            remainingItems.push(allitem[i]);
//            showTable(remainingItems);
//        }
//    }

//   // allitem = remainingItems;


//}