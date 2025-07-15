
$(document).ready(function (){
  
    Showdata();
    showgrid();
    $("#custid").trigger("change");
 
    
    setTimeout(function () {
        $("#custid").prop("disabled", true);
      
        $("#siteid").val($("#postid").val()).trigger("change");

      
    }, 300);
})


function bindsiteid(id, SiteId) {
   // let id = $('#custid').val();
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

    var Data = {

        //Beatsiteid: $("#txtHiddenId").val(),
        Beatid: $("#Hid_BeatId").val(),
        custid: $("#custid").val(),
        beatname: $("#beatname").val().trim(),
        beatcode: $("#beatcode").val().trim(),
        latitude: $("#latitude").val().trim(),
        sitenameid: $("#siteid").val(),
        longtitude: $("#longtitude").val().trim(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 3,
        mode: $("#flgmode").val(),
        status: $("#status").is(':checked') ? 1 : 0,
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

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
        BranchId: $("#BranchId").val(),
        id: $("#postid").val(),
        custid: $("#custid").val(),
        UserId: $("#UserId").val(),
        ProfileId: $("#ProfileIdd").val(),  
        type: 4,

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}


//function getLatitude() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(
//            function (position) {
//                var latitude = position.coords.latitude;
//                document.getElementById('latitudeDisplay').innerText = 'Latitude: ' + latitude;
//            },
//            function (error) {
//                document.getElementById('latitudeDisplay').innerText = 'Error: ' + error.message;
//            }
//        );
//    } else {
//        document.getElementById('latitudeDisplay').innerText = 'Geolocation is not supported by this browser.';
//    }
//}  <button onclick="getLatitude()">Get Latitude</button>
//<p id="latitudeDisplay">Latitude will appear here.</p>




function EditbyId(id) {
    Hidegrid();
    var beatid = $("#Hid_beatid" + id + "").html();
    var custid = $("#Hid_custid" + id + "").html();
    var siteidd = $("#Hid_siteid" + id + "").text();
    var beatname = $("#PostName" + id + "").html();
    var beatcode = $("#PostCode" + id + "").html();
    var latitude = $("#Latitude" + id + "").html();
    var Longitude = $("#Longitude" + id + "").html();
    var companyid = $("#Hid_CompanyId" + id + "").html();
    var branchid = $("#Hid_Branch_Id" + id + "").html();
    var sitename = $("#SiteName" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(beatid);
    $("#Hid_BeatId").val(beatid);
    $("#custid").val(custid);
    $("#custid").prop("disabled", true);
    $("#siteid").prop('disabled',true);
    bindsiteid(custid, siteidd);
   
    $("#beatname").val(beatname);
    

    $("#beatname").val(beatname);
    $("#beatcode").val(beatcode);
    $("#beatcode").prop("disabled", true);
    $("#latitude").val(latitude);
    $("#longtitude").val(Longitude);
    $("#CompanyId").val(companyid);
    $("#BranchId").val(branchid);
    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}



function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {
   
        $("#Hid_BeatId").val(Id);
        $("#flgmode").val("Del");
        save();
    
    }
}

function clear() {
    $("#Hid_BeatId").val('')
    $("#custid").val(0);

    bindsiteid(0, 0);
   /* $("#siteid").val(0)*/
    $("#beatcode").val('')
    $("#beatcode").prop("disabled", false);
    $("#beatname").val('')
    $("#latitude").val('')
    $("#longtitude").val('')
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};


async function QRCODE(Id,QrName) {
   
 
       

        try {
            
            const qrDataUrl = await QRCode.toDataURL(Id); // data:image/png;base64,...
                        
            if (typeof qrDataUrl !== "string" || !qrDataUrl.startsWith("data:image/png;base64,")) {
                throw new Error("Invalid QR Code data URL");
            }
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                unit: 'mm',    
                format: 'a4'  
            });
            doc.setFontSize(40);
            const pageWidth = doc.internal.pageSize.getWidth();
            const text = "Here is your QR Code:";
            const x = pageWidth / 2;
            const y = 20;
            doc.text(QrName, x, y, { align: "center" }); 
            doc.addImage(qrDataUrl, 'PNG', 10, 35, 200, 200); 

            doc.save(QrName + ".pdf");
        } catch (err) {
            console.error("Failed to generate PDF with QR", err);
        }
    
}