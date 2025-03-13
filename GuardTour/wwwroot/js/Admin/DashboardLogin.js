
$(document).ready(function () {
    binddashboard()
})

function binddashboard() {
    var companyname = $("#Companyid").val();
    $.ajax({
        
        url: '/Admin/binddashboard',
        type: 'post',
        data: {
            CompanyId: companyname
        },
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data);
            $('#totalcustomer').html(data[0].TotalCustomers);
            $('#totalemployee').html(data[0].TotalEmployees);
            $('#EmployeesMapTocustomerSite').html(data[0].EmployeesMapTocustomerSite);
            $('#EmployeeMapToRoute').html(data[0].EmployeeMapToRoute);
            $('#totalsite').html(data[0].TotalSites);
            $('#totalpost').html(data[0].TotalPosts);
            $('#totalroute').html(data[0].TotalRoutes);
            $('#totalroutelist').html(data[0].TotalRoutes);
            $('#totalshift').html(data[0].TotalShifts);
            $('#totalbeat').html(data[0].TotalBeats);
            $('#totalbeatassign').html(data[0].TotalAssignBeats);
            
        },
        error: function (error) {
            console.log('Error loading customer data:', error);
        }
    });
}





