
$(document).ready(function () {

    var company = $("#company").val(); 
    if (company !== "") {
        $("#company").trigger('change');
    }  
});


function bindBranch(id) {

    $.ajax({
        url: localStorage.getItem("Url") + '/Admin/bindBranch',
        type: 'post',
        data: { id: id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#branch');
            dropdown.empty();
        
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].locid).text(data[i].BranchName));
            }

        },
        error: function (error) {
            alert(error.massage);
        }
    })
}
