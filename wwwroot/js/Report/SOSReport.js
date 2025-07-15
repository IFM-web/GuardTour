
$(document).ready(() => {
  
    $("#custid").trigger("change");

    $("#Todate").val(new Date().toISOString().split('T')[0]);
    $("#Fromdate").val(new Date().toISOString().split('T')[0]);
 
    ShowdataSOS();   
 
})

function bindsiteid(id) {

    $.ajax({
        url: localStorage.getItem("Url") + '/DropDownList/bindsiteid',
        type: 'post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#siteid');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('All'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].SiteId).text(data[i].SitName));
            }
           
        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function BindRoute(id) {

    $.ajax({
        url: localStorage.getItem("Url") + '/DropDownList/bindroute',
        type: 'Get',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#Routename');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('All'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].Id).text(data[i].Name));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}


function BindShift(id) {
  
    $.ajax({
        url: localStorage.getItem("Url") + '/DropDownList/BindShifttoSide',
        type: 'Post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#Shiftname');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('All'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].Id).text(data[i].Name));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function exportexcele() {
    exportexcel('Tour Report')
}
  
function ShowdataSOS() {
    $("#loader").removeClass("d-none");

    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/Api/ApiServices/Save';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    var Data = {
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        custid: $("#custid").val(),
        siteid: $("#siteid").val(),
        routename: $("#Routename").val(),
        shiftid: $("#Shiftname").val(),

        Todate: $("#Todate").val(),
        Fromdate: $("#Fromdate").val(),
        type: 52

    }

    //$.ajax({
    //    url: url,
    //    type: 'get',
    //    data:  Data,
    //        success: (data) => {
    //            var data = JSON.parse(data);
    //            var divid = '#printdivReport';

    //            console.log(data);

    //            $("#loader").addClass("d-none");

    //            var th = `
    //            <table id='data-table' class='table table-bordered'>
    //            <thead>
    //            <th>SNo</th>
    //            <th>Customer Name</th>
    //            <th>Site Name</th>
    //            <th>Emp Name</th>
    //            <th>Route Name</th>
    //            <th>Post Name</th>
    //            <th>Shift Name</th>
    //            <th>Date</th>
    //            <th>Time</th>
    //            <th>Remark</th>
    //            <th>GeoLocation</th>
    //            <th>Location Name</th>
    //            <th>Image</th>

    //            <thead>

    //            `;
    //            var tr = '<tbody>';
    //            var i = 1;
    //            for (var e of data) {
    //                var url = "data:image/jpeg;base64," + e.Image
    //                tr += `
    //                <tr>
    //                <td>${i}</td>
    //                <td>${e.CustomerName
    //                    }</td>
    //                <td>${e.SitName}</td>
    //                <td>${e.EmpName}</td>
    //                <td>${e.RouteName}</td>
    //                <td>${e.PostName}</td>
    //                <td>${e.Shift}</td>
    //                <td>${e.Date}</td>
    //                <td>${e.Time}</td>
    //                <td>${e.Remark}</td>
    //                <td>${e.GeoLocation}</td>
    //                <td>${e.LocationName}</td>
    //                <td><image width:"150" src="${url}"/></td>



    //                </tr>

    //`; ++i;
    //            }
    //            tr += '</tbody> </table>'
    //            $(divid).empty();
    //            $(divid).append(th+tr);
    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdivReport");

    //$("#loader").addClass("d-none");

}
   
    
  



    function ExportPdf() {
        var style = `
    <style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    .info-table th, td {
        border: 1px solid #000;
        padding: 8px;
       
    }

    .audit-table th, .audit-table td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
    }

        body {
             -webkit-print-color-adjust: exact;
            font-family: 'Times New Roman', Times, serif, sans-serif;
            background-color: none;
           
           
                  

        }
         .info-table span {
        margin-left: 10px;
        font-weight: 600;
    }
     header,
                footer {
                    display: none;
                }
@page {

                size: A4 landscape;
                margin: 6.20mm;
                -webkit-print-color-adjust: exact;
              font-family: 'Times New Roman', Times, serif, sans-serif;
                  page-break-after: always;

                header,
                footer {
                    display: none;
                }



            }
      .AuditImage{
        width:100px !important;
        height:100px !important;}

        .printhide{
            display:none;
        }
         .logo {
            max-width: 250px;

        }
          .header1 {
            text-align: center;
            margin-bottom: 10px;
            margin: auto;

        }
    </style>
    `;
   
        
        var datadiv = document.getElementById("printdiv");

        var popupwin = window.open();

        popupwin.document.write(style  + datadiv.innerHTML);
        popupwin.document.close();
        var logoImage = popupwin.document.getElementById("logoimag");
        popupwin.onload = function () {
            popupwin.focus();
            popupwin.print();
            popupwin.close();
        }
    }


function image(id) {
    $("#img01").attr("src", 'data:image/jpeg;base64,'+id);
    //$(".modal-body").css("backgroundImage", "url(" + id + ")"); 
}

var angle = 0;

function rotateImage() {
    angle += 90;
    var image = document.getElementById('img01');
    image.style.transform = 'rotate(' + angle + 'deg)';
}
function resetImageRotation() {
    angle = 0;
    var image = document.getElementById('img01');
    image.style.transform = 'rotate(0deg)';
}