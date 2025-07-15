
function bindsiteid(id) {
    $("#Selectedbody").empty();
    $("#Availablebody").empty();
    $.ajax({
        url: localStorage.getItem("Url") + '/Admin/bindsiteid',
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
    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';

    var Itemprod = new Array();
    $("#Selectedbody  TR").each(function (index, row) {
        
        const item = {};
            item.custid= $("#custid").val(),
                item.siteid = $("#siteid").val(),
                item.RouteAssgincode = $("#routecode").val(),
                item.RouteAssginName = $("#routename").val(),
            item.CompanyId= $("#CompanyId").val(),
            item.BranchId= $("#BranchId").val(),
            item.UserId= $("#UserId").val(),
            item.type= 33,
            item.mode= $("#flgmode").val(),
            item.status= $("#status").is(':checked') ? 1 : 0,
            item.shiftid= $(row).find('.active #shiftid').text(),
        
        $("#Availablebody TR").each(function (index, row) {

            let item2 = { ...item };
            item2.routecode = $(row).find('.active #Routecode').text();
            Itemprod.push(item2);
        })
       
    });
    
   

    console.log(Itemprod)

    if (Itemprod[0].routecode !=='' || Itemprod[0].shiftid !=='')
        CommonAjax(url, JSON.stringify(Itemprod), "", "", "", "", "Printdiv")
    else
        swal("Message", 'No Selection', "error");


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