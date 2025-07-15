



$(document).ready(function () {
    show()
    setTimeout(() => {
        binddashboard()
    }, 30)

})

function show() {


    url_add = window.location.href;
    var data = url_add.split("://");
    data = data[1].split("/");
    var menuname = data[1] + "/" + data[2];
    var url_add = window.location.protocol + "//" + window.location.host + "/";
    var url = localStorage.getItem("Url") + '/api/ApiServices/ManuRight';
    var Hid_Con = $("#cid").val() + "##" + $("#UserId").val() + "##" + menuname + "##" + $("#flgmode").val();

    arr = [];
    data = {

        Id: $("#txtHiddenId").val(),
        ProfileId: $("#ProfileIdd").val(),
        UserId: $("#UserId").val(),

        type: 6


    }
    arr.push(data);

    CommonAjax(url, JSON.stringify(arr), "", "", "", "", "grid");


}


function binddashboard() {
    var companyname = $("#Companyid").val();
    $.ajax({
        
        url: localStorage.getItem("Url") + '/Admin/binddashboard',
        type: 'post',
        data: {
            ProfileId: $("#ProfileIdd").val(),
            UserId: $("#UserId").val(),
            CompanyId: $("#CompanyId").val(),
            BranchId: $("#BranchId").val(),
        },
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data);
            $('#totalcustomer').html(data[0].TotalCustomers);
            $('#totalemployee').html(data[0].TotalEmployees);
            $('#EmployeesMapTocustomerSite').html(data[0].EmployeesMapTocustomerSite);
            $('#EmployeeMapToRoute').html(data[0].EmployeeMapToRoute);
          
            $('#totalusertype').html(data[0].totalusertype);
            $('#Dashboard').html('View');
            $('#Report').html('View');
            $('#Report1').html('View');
            $('#Menuid').html('View');
            
            $('#totalbeatassign').html(data[0].TotalAssignBeats|| 'View');
            $('#totalUser').html(data[0].totalUser);
            
        },
        error: function (error) {
            console.log('Error loading customer data:', error);
        }
    });
}





