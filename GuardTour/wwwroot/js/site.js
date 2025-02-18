


function SearchData() {
    $(".preloader").show();


    $.ajax({
        
        url: '/Report/getPhotoAttendance',
        type: 'post',
        data: {
            todate: $("#date-input").val(),
            empno: $("#Empnumber").val(),

            
        },
        success: function (data) {
            $(".preloader").hide();
            if (data != '[]') {


                $(".companybody").empty();
                var data = JSON.parse(data);
                console.log(data)
                var rowlen = parseInt($('.companybody tr').length);
                // console.log(data)
                var row = '';
                for (var i = 0; i < data.length; i++) {
                    var url = 'data: image/jpeg;base64,' + data[i].EmployeeImage

                    row += "<tr id='row" + i + "'><td style=''>" + parseInt(i + 1) + "</td><td style=''><span class='EmployeeNumber'>" + data[i].EmployeeNumber + "</span></td><td style=''><span class='EmployeeName' id='emp_name'>" + data[i].EmployeeName + "</span></td><td style=''><span class='ShiftCode'>" + data[i].ShiftCode + "</span></td><td class='status-info'><span class='in-tb'>" + data[i].Status + "</span><span class='status in'>&#10004;</span></td><td style=''><span class='Date' id='dateField' >" + data[i].Date + "</span></td><td style=''><span class='Time'>" + data[i].Time + "</span></td><td style=''><span class='Latitude'>" + data[i].Latitude + "</span></td><td style=''><span class='Longitude'>" + data[i].Longitude + "</span></td><td style=''><span class='LocationName'>" + data[i].LocationName + "</span></td><td style=''><img  data-toggle='modal' class='employee-photo' data-target='#myModal' src= '" + url + "' ></></td></tr>";


                }

                $(".companybody").prepend(row);




            }
            else {
                $(".preloader").hide();
                $(".companybody").empty();
                Swal.fire({
                    title: "Record Not Available",
                    //text: "You clicked the button!",
                    icon: "error"
                });
            }


        },
        error: function (data) {
            $(".preloader").hide();
            var data = {
                status: "Error",
                msg: "Error on server.",
                data: [],
            }

        },
    });
}
function SearchDatasupper() {
    $(".preloader").show();


    $.ajax({
        
        url: '/Report/getSupperAttendance',
        type: 'post',
        data: {
            month: $("#ddlmonth").val(),
            year: $("#ddlYear").val(),

            
        },
        success: function (data) {
            $(".preloader").hide();
            if (data != '[]') {


                $(".companybody").empty();
                var data = JSON.parse(data);
                console.log(data)
                var rowlen = parseInt($('.companybody tr').length);
                // console.log(data)
                var row = '';
                for (var i = 0; i < data.length; i++) {
                    var url = 'https://tinyurl.com/2r6fmh67'

                    row += "<tr id='row" + i + "'><td style=''>" + parseInt(i + 1) + "</td><td style=''><span class='EmployeeNumber'>" + data[i].Emp_Code + "</span></td><td style=''><span class='EmployeeName' id='emp_name'>" + data[i].Emp_Name + "</span></td><td style=''><span class='ShiftCode'>" + data[i].Designation + "</span></td><td class='status-info'><span class=''>" + data[i].showdate + "</span></td><td style=''><span class='Date' id='dateField' >" + data[i].In_Time + "</span></td><td style=''><span class='Time'>" + data[i].Out_Time + "</span></td><td style=''><span class='Latitude'>" + data[i].Working_Minutes + "</span><td style=''><span class='LocationName'>" + data[i].Shift_Details + "</span></td><td style=''><img  data-toggle='modal' class='employee-photo' data-target='#myModal' src= '" + url + "' ></></td></tr>";


                }

                $(".companybody").prepend(row);




            }
            else {
                $(".preloader").hide();
                $(".companybody").empty();
                Swal.fire({
                    title: "Record Not Available",
                    //text: "You clicked the button!",
                    icon: "error"
                });
            }


        },
        error: function (data) {
            $(".preloader").hide();
            var data = {
                status: "Error",
                msg: "Error on server.",
                data: [],
            }

        },
    });
}