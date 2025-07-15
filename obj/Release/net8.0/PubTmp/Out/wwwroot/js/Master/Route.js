

$(document).ready(() => {
  
    var site = $("#Hid_site").val();
 
    setTimeout(function () {
       
        $("#siteid").val(site).trigger("change");


    }, 300);
})




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
        siteid: $("#siteid").val(),
        type: 19,


    }

    Bindtrntable(url, JSON.stringify(data), "", "", "", "", "1");
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

     list1 = list1.filter(
        (obj, index, self) =>
            index === self.findIndex((t) => t.PostName === obj.PostName)
    );


    console.log(list1);
    showTable(list1);
        //allitem1 = [];
        getdata($("#siteid").val());
   




        
    }
    //const allExist = list1.some(item => PostName.includes(item.PostName));
    



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

    let list3 = list1.filter(item =>
        !delallitem.some(delItem => delItem.PostName === item.PostName)
    );

    
    allitem1 = [...list3];

    showTable(allitem1);
}

function BindShifttoSide() {
    let id = $("#siteid").val();
    let data = { id: id };
    let url = localStorage.getItem("Url") + '/Master/BindShifttoSide';
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
    var url = localStorage.getItem("Url") + '/api/ApiServices/Save';
    
        var Itemprod = new Array();
        

            $("#Selectedid TBODY TR").each(function (index,row) {
                var Items = {};
             
                var row = $(this);
                Items.siteid = $("#siteid").val();
                Items.custid = $("#custid").val();
                Items.postid = row.find('span.beatid').html();
                Items.PostName = row.find('span.PostName').html();
                Items.routeid = $("#txtHiddenId").val().trim();
                Items.routename = $("#routename").val().trim();
                Items.routecode = $("#routecode").val().trim();
                Items.CompanyId= $("#CompanyId").val(),
                Items.BranchId = $("#BranchId").val(),
                Items.status = $("#status").is(':checked') ? 1 : 0,
                Items.mode = $("#flgmode").val();
                Items.type = 20;
                Items.index = index+1;
             
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