
$(document).ready(function () {

    var company = $("#company").val(); 
    if (company !== "") {
        $("#company").trigger('change');
    }  
});


function bindBranch(id) {

    $.ajax({
        url: '/Admin/bindBranch',
        type: 'post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#branch');
            dropdown.empty();
          /*  dropdown.append($('<option></option>').attr('value', 0).text('Select'));*/
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].locid).text(data[i].BranchName));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}
//function bindRegion(id) {
//    $.ajax({
//      url: '/grouplreportingportal/Home/bindRegion',
//     // url: '/Home/bindRegion',
//        type: 'post',
//        data: {id:id},
//        success: function (data) {
            
//            var data = JSON.parse(data);

//            var dropdown = $('#regiondiv');
//            dropdown.empty();

//            for (var i = 0; i < data.length; i++) {
                
//                dropdown.append($('<option></option>').attr('value', data[i].HrLocationCode).text(data[i].HrLocationDesc));
//            }
//            bindbranch()

//        },
//        error: function (error) {
//            alert(error.massage);
//        }
//    })
//}
//function bindbranch() {
//    $.ajax({
//        url: '/grouplreportingportal/Home/bindBranch',
//       //url: '/Home/bindBranch',
//        type: 'post',
//        data: { id: $("#company").val()/*, locid: $("#regiondiv").val()*/ },
//        success: function (data) {
//            var data = JSON.parse(data);

//            var dropdown = $('#branch');
//            dropdown.empty();

//            for (var i = 0; i < data.length; i++) {
                
//                dropdown.append($('<option></option>').attr('value', data[i].LocationAutoID).text(data[i].LocationCode));
//            }

//        },
//        error: function (error) {
//            alert(error.massage);
//        }
//    })
//}
