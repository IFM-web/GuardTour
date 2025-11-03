
$(document).ready(function () {
    $(".mandatory").each(function () {

        var firstChild = $(this).parent().children().first();
        if ($(this).parent().find('span').length == 0 || $(this).parent().find('span').html() != '*') {
            firstChild.append('<span style="color:red">*</span>');
        }
    });
    if ($("#txtjsondata").val() != "" && $("#txtjsondata").val() != undefined) {
        FillTextBoxes($("#txtjsondata").val());
    }

});


function FillTextBoxes(data) {
    if ($("#txttype").val() == "Menu Master") {
        var data1 = JSON.parse(data.replace("-", "/").replace("_", "#"));
    } else {
        var data1 = JSON.parse(data);
    }

    console.log(data1);
    //for (var i = 0; i < data1.length; i++) {
    $.each(data1[0], function (key, value) {

        var element = $('[name="' + key + '"]')

        if (element.is('input')) {
            var type = element.attr('type');

            if (type == "checkbox") {
                value == 1 ? element.prop('checked', true) : element.prop('checked', false);
            }
            else if (type == "radio") {

                value == 1 ? element.prop('checked', true) : element.prop('checked', false);

                $("input[name=" + key + "][value='" + value + "']").prop("checked", true);
            }
            else {

                $('input[name="' + key + '"]').val(value);
            }
        }
        else if (element.is('select')) {

            $('select[name="' + key + '"]').val(value);
            $('select[name="' + key + '"]').trigger('change');
        }
        //else {
        //    alert("");
        //}
        $("#flgmode").val('Modify');
        $("#btnsave").html('Update');

    });
    // }
    //$('input[name="' + tdClass.replace("1", "") + '"]').val(value);

}


function gettranid() {
    var currentdate = new Date();
    var mon = parseInt(currentdate.getMonth()) + 1;
    var currdate = currentdate.getFullYear() + "" + currentdate.getDate() + "" + mon + "" + currentdate.getHours() + "" + currentdate.getMinutes() + "" + currentdate.getSeconds() + "" + currentdate.getMilliseconds();
    console.log(currdate);
    return currdate;
}

var emailregex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
var alphanum = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
var phone = /^[0-9]{10}$/;
var charregex = /^[a-zA-Z\s]+$/;
var deci = /^[1-9]\d*(\.\d+)?$/;
var check = true;
var msg = "";


$(".email").focusout(function () {
    if ($(this).val() != '') {
        if (!emailregex.test($(this).val())) {
            //alert("Enter Valid Email..!");
            swal("Message", "Enter Valid Email(" + $(this).val() + ")", "error");
            $(this).css('border', '1px solid red');
            $(this).val('');
            check = false;

        } else {
            $(this).css('border', '1px solid #ced4da');
            check = true;
        }
    }
})

$(".alpha").focusout(function () {
    if ($(this).val() != '') {
        if (!alphanum.test($(this).val())) {
            swal("Message", "" + $(this).attr('name') + " must contains at least one letter and one digit(" + $(this).val() + ")", "error");
            $(this).css('border', '1px solid red');
            $(this).val('');
            check = false;

        } else {
            $(this).css('border', '1px solid #ced4da');
            check = true;
        }
    }
})

$(".phn").focusout(function () {
    if ($(this).val() != '') {
        // if ($(this).val().length != 10) {
        //     swal("Message", "Invalid Phone Number(" + $(this).val() + ")", "error");
        //     $(this).css('border', '1px solid red');
        //     $(this).val('');
        //     check = false
        // }
        //else 
        if (!phone.test($(this).val())) {
            swal("Message", "Invalid Phone Number(" + $(this).val() + ")", "error");
            $(this).css('border', '1px solid red');
            $(this).val('');
            check = false;

        } else {
            $(this).css('border', '1px solid #ced4da');
            check = true;
        }
    }
})

$(".chr").focusout(function () {
    if ($(this).val() != '') {
        if (!charregex.test($(this).val())) {
            swal("Message", "Provide Valid " + $(this).attr('name') + "(" + $(this).val() + ")", "error");
            $(this).css('border', '1px solid red');
            $(this).val('');
            check = false;

        } else {
            $(this).css('border', '1px solid #ced4da');
            check = true;
        }
    }
})
$(".deci").focusout(function () {
    if ($(this).val() != '') {
        if (!deci.test($(this).val())) {
            swal("Message", "Provide Valid " + $(this).attr('name') + "(" + $(this).val() + ")", "error");
            $(this).css('border', '1px solid red');
            $(this).val('');
            check = false;

        } else {
            $(this).css('border', '1px solid #ced4da');
            check = true;
        }
    }
})


$('.intr').on('keypress', function (event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
    }
});

$('.intr').on('paste', function (event) {
    var clipboardData = event.originalEvent.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('Text');
    if (!/^\d+$/.test(pastedData)) {
        event.preventDefault();
    }
});

$('.intr').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

function Save() {
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr('name')
            console.log($(this).val());
            msg += "" + name + "  Required !!\n";
            //check = false
        }
    });
    if (msg == "") {

        if (check == true) {
            Insert("");
        }
    }
    else {
        swal("Message", "" + msg + "", "error");
        msg = "";
    }
}


function Insert() {
    url_add = window.location.href;
    var data = url_add.split("://")
    var protocol = data[0];
    data = data[1].split("/");
    var domain = data[0];
    var menuname = data[1] + "/" + data[2];
    var encrp = "";
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var pageurl = menuname;
    var branchid = $("#cid").val();
    var sessionId = $("#sessionId").val();
    var tranid = $("#tranid").val();

    jsonObj = [];
    item = {}




        $(".col").each(function () {

            var name = $(this).attr('name') == undefined ? $(this).attr('name') : $(this).attr('name').replace(/\s+/g, "").trim();
            var type = $(this).attr('type');
            if (type == "checkbox") {
                item[name] = $(this).is(':checked') ? 1 : 0;
            }
            else if (type == "radio") {
                item[name] = $('input[name=' + name + ']:checked').val()

            } else {

                item[name] = $(this).val();
            }
        });

       // jsonObj.push(item);


    if ($("table#data-table").length) {

        var jq = jQuery.noConflict()
        var myTable = jq("#data-table").DataTable();
        myTable.rows().iterator('row', function (context, index) {
            //$("#data-table tbody tr").each(function () {
            var row = $(this.row(index).node());
            var item1 = {}; // Ensure 'item' is defined within the loop or outside if needed
            var cells = row.find('td');
            cells.each(function (index, cell) {
                if (index < cells.length - 1) {
                    var tdClass = $(cell).attr('class').replace('sorting_1', '').replace(/\s+/g, "").trim();
                    var type = $(cell).find('input').attr('type');
                    var typeclass = $(cell).find('input').attr('class');
                    // console.log(type);
                    if (type == "checkbox") {
                        item1[tdClass] = cells.find('input.' + typeclass + '').is(':checked') ? 1 : 0;

                    }
                    else if (type == "text") {
                        item1[tdClass] = cells.find('input.' + typeclass + '').val();
                    }
                    else {

                        item1[tdClass] = $(cell).html();
                    }
                }

            });
            jsonObj.push(item1);
            //console.log(item); // Do something with 'item', like storing it in an array
        });


        jsonObj.push(item);
    } else {
        jsonObj.push(item);
    }


    CommonAjax(url, JSON.stringify(jsonObj), "", "", "", JSON.stringify(data), "printdiv");

}
function Insertwithfile() {
    url_add = window.location.href;
    var data = url_add.split("://")
    var protocol = data[0];
    data = data[1].split("/");
    var domain = data[0];
    var menuname = data[1] + "/" + data[2];
    var encrp = "";
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = url_add + 'api/ApiServices/saveDataWithFile';
    var pageurl = menuname;
    var branchid = $("#cid").val();
    var sessionId = $("#sessionId").val();
    var tranid = $("#tranid").val();
    var Id = $("#txtHiddenId").val();


    jsonObj = [];
    item = {}

    var Photo = $("#fileimg").val();
    var exisimage = $("#existimg").val();
    var fullimgurl; var furl; var filname;
    if (Id != 0 && Photo == "") {
        fullimgurl = exisimage;
    }
    else {

        furl = getFileUrl("#fileimg", "UserPhotos");
        filname = furl.fname;
        fullimgurl = furl.url;
    }


    $(".col").each(function () {

        var name = $(this).attr('name') == undefined ? $(this).attr('name') : $(this).attr('name').replace(/\s+/g, "").trim();
        var type = $(this).attr('type');
        if (type == "checkbox") {
            item[name] = $(this).is(':checked') ? 1 : 0;
        }
        else if (type == "radio") {
            item[name] = $('input[name=' + name + ']:checked').val()

        }
        
        else {

            item[name] = $(this).val();
            item['UserPhoto'] = filname;
        }
    });

    //jsonObj.push(item);


    if ($("table#data-table").length) {

        //var jq = jQuery.noConflict()
       // var myTable = jq("#data-table").DataTable();;
        //myTable.rows().iterator('row', function (context, index) {
        //    //$("#data-table tbody tr").each(function () {
        //    var row = $(this.row(index).node());
        //    var item1 = {}; // Ensure 'item' is defined within the loop or outside if needed
        //    var cells = row.find('td');
        //    cells.each(function (index, cell) {
        //        if (index < cells.length - 1) {
        //            var tdClass = $(cell).attr('class').replace('sorting_1', '').replace(/\s+/g, "").trim();
        //            var type = $(cell).find('input').attr('type');
        //            var typeclass = $(cell).find('input').attr('class');
        //            // console.log(type);
        //            if (type == "checkbox") {
        //                item1[tdClass] = cells.find('input.' + typeclass + '').is(':checked') ? 1 : 0;

        //            }
        //            else if (type == "text") {
        //                item1[tdClass] = cells.find('input.' + typeclass + '').val();
        //            }
        //            else {

        //                item1[tdClass] = $(cell).html();
        //            }
        //        }
        //    });
        //    jsonObj.push(item1);
        //    //console.log(item); // Do something with 'item', like storing it in an array
        //});


        jsonObj.push(item);
    }
    else {

        jsonObj.push(item);
    }


    var fdata = new FormData();
    var fileupload = $("#fileimg").get(0);
    //var filname = $("#fileimg").val();
    var file = fileupload.files;
    fdata.append("file", file[0]);
    fdata.append("jsondata", JSON.stringify(item));
    fdata.append("fname", filname);
    fdata.append("folder", 'wwwroot/ProfileImg');
    

    saveWithFile(url, fdata, "", "","printdiv");

}



var i = 0;
function Addtable() {
    var table = "<table id='data-table' class='table-bordered tblList'>";
    table += "<thead><tr>";
    var tablebody = "<tr id='row" + i + "'>";
    $(".gcol").each(function () {

        var inputval = "", inputtext = "";
        var name = $(this).attr('name').replace(/\s+/g, "");
        var type = $(this).attr('type');
        if (type == "checkbox") {
            //item[name] = $(this).is(':checked') ? 1 : 0;
            val = $(this).is(':checked') ? 1 : 0;
        }
        else if (type == "select") {
            inputval = $(this).val();
            inputtext = $(this).text();
            console.log(inputtext);
        }
        else {
            inputval = $(this).val();
        }
        table += "<th>" + name + "</th>";
        tablebody += "<td class='G" + name + "1' id='G" + name + "" + i + "'>" + inputval + "</td>";
        //item[name] = $(this).val();

    });

    if ($(".tablediv").find('table').length == 0) {
        table += "<th>Action</th>";
        table += "</tr></thead><tbody class='bodyid'></tbody";
        $(".tablediv").html(table);
    }
    tablebody += "<td><button type='button' onclick='editbyid(" + i + ")' class='btn btn-Primary'>Edit</button><button type='button' onclick='Delete(" + i + ")' class='btn btn-danger'>Del</button></td>";

    tablebody += "</tr>"
    $(".bodyid").append(tablebody);
    i++;

    $(".gcol").val('');
}


function editbyid(id) {

    $('tbody td').on('click', function () {
        var parentTr = $(this).closest('tr');
        parentTr.find('td').each(function () {
            // console.log($(this).attr('class'));
            var tdClass = $(this).attr('class');
            var value = parentTr.find('.' + tdClass + '').html();
            if (tdClass != undefined) {
                // $("." + tdClass.replace("1", "") + "").val(value);
                $('input[name="' + tdClass.replace("1", "") + '"]').val(value);
            }
        });
        $("#row" + id + "").closest("tr").remove();
    });

}

function Delete() {
    url_add = window.location.href;
    var data = url_add.split("://")
    var protocol = data[0];
    data = data[1].split("/");
    var domain = data[0];
    var menuname = data[1] + "/" + data[2];
    var encrp = "";
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    var pageurl = menuname;
    var branchid = $("#cid").val();
    var sessionId = $("#sessionId").val();
    var tranid = $("#tranid").val();

    jsonObj = [];
    item = {}


    $(".col").each(function () {

        var name = $(this).attr('name') == undefined ? $(this).attr('name') : $(this).attr('name').replace(/\s+/g, "").trim();
        var type = $(this).attr('type');
        if (type == "checkbox") {
            item[name] = $(this).is(':checked') ? 1 : 0;
        }
        else if (type == "radio") {
            item[name] = $('input[name=' + name + ']:checked').val()

        } else {

            item[name] = $(this).val();
        }
    });
    
        jsonObj.push(item);
    
    //var data = {
    //    profileid: $("#pid").val(),
    //    UserId: $("#UserId").val(),
    //    Url: pageurl,
    //    branchid: branchid,
    //    sessionId: sessionId,
    //    tranid: gettranid(),
    //    PageName: $("#txtpage").val(),
    //    Type: $("#txttype").val(),

    //}
    //jsonObj.push(data);

    CommonAjax(url, JSON.stringify(jsonObj), "", "", "", JSON.stringify(data), "printdiv");

}