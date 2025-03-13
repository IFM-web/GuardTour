
function bindsiteid(id) {

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

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}


$('#siteid').change(function () {
    const customerId = $(this).val();
    getdata(customerId);
    getdataofshift(customerId);
});

function getdata(id) {

    url_add = window.location.href;
    var data = url_add.split("://");
    var protocol = data[0];
    data = data[1].split("/");
    var domain = data[0];
    var menuname = data[1] + "/" + data[2];
    var encrp = "";
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = url_add + 'api/ApiServices/Save';
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
    var url = url_add + 'api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var data = {

        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        siteid: id,
        type: 32,


    }

    Bindtrntable(url, JSON.stringify(data), "", "", "", "", "3");
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


var allitem = [];
var allitem1 = [];


function addselectedpost(row) {
    var items = {
        siteid: $("#siteid").val(),
        beatid: $(row).find(".Hid_beatid").text(),
        PostName: $(row).find(".PostName").text(),
    };

    console.log(items);

    allitem.push(items);
    allitem1.push(items);

    console.log(allitem);
    $(row).find("td").toggleClass("active");
}




var list = [];
var list1 = [];
function selectedpost() {
    list1 = [...allitem1];
    list = [...allitem];
    showTable(list1);
    //allitem1 = [];
    getdata($("#siteid").val());

}


function showTable(allitemid) {
    if (allitemid.length > 0) {
        $("#Selectedbody").empty();
        var row = '';
        for (var i = 0; i < allitemid.length; i++) {
            row += `
                <tr id='row1${i + 1}' onclick='deleteselectedpost(this)' style='background-color: #f2f2f2; cursor: pointer;'>
                    
                    
                    <td style='display:none;'><span class='beatid'>${allitemid[i].beatid}</span></td>
                    <td><span class='PostName'>${allitemid[i].PostName}</span></td>
                </tr>
            `;
        }
        $("#Selectedbody").append(row);
        $("#Selectedbody").removeClass('d-none');

    } else {
        $("#Selectedbody").addClass('d-none');
    }
}


var delallitem = [];

function deleteselectedpost(row) {

    var items = {
        siteid: $("#siteid").val(),

        beatid: $(row).find(".beatid").text(),
        PostName: $(row).find(".PostName").text(),
    };

    console.log(items);



    delallitem.push(items);
    $(row).find("td").toggleClass("active");

}



function filterAndDeleteItems() {

    let list3 = list.filter(item =>
        !delallitem.some(delItem => delItem.beatid === item.beatid)
    );


    allitem1 = [...list3];

    showTable(allitem1);
}

function BindShifttoSide() {
    let id = $("#siteid").val();
    let data = { id: id };
    let url = '/Master/BindShifttoSide';
    let dropdown = $('#siftid');
    BindDropdownsingle(url, data, '', '', '', dropdown, 'Select')

}
function SAVEall() {
    var vali = Validation();
    if (vali == '') {
        Data();
    } else {
        alert(vali);
    }
}


function Data() {
    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = url_add + 'api/ApiServices/Save';

    var Itemprod = new Array();


    $("#Selectedid TBODY TR").each(function (index, row) {
        var Items = {};

        var row = $(this);
        Items.siteid = $("#siteid").val();
        Items.custid = $("#custid").val();
        Items.postid = row.find('span.beatid').html();
        Items.PostName = row.find('span.PostName').html();
        Items.routeid = $("#txtHiddenId").val();
        Items.routename = $("#routename").val();
        Items.routecode = $("#routecode").val();
        Items.CompanyId = $("#CompanyId").val(),
            Items.BranchId = $("#BranchId").val(),
            Items.status = $("#status").is(':checked') ? 1 : 0,
            Items.mode = $("#flgmode").val();
        Items.type = 20;
        Items.index = index + 1;

        Itemprod.push(Items);

    })

    if (Itemprod.length !== 0)
        CommonAjax(url, JSON.stringify(Itemprod), "", "", "", "", "Printdiv")
    else
        alert("No Post Selected");





}

function clear() {
    $("#txtHiddenId").val(0)
    $("#siteid").val(0)
    $("#custid").val(0)
    $("#routename").val('')
    $("#routecode").val('')
    $("#Selectedbody").empty();
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    $(".Availablebody").empty();


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