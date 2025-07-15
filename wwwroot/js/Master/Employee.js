
$(document).ready(() => {
    Showdata();
    showgrid()
    let nowdate = new Date();
    // $("#DOB").val(nowdate.toISOString().split("T")[0])
    //$("#join").val(nowdate.toISOString().split("T")[0])

})


function SAVEall() {
    var vali = Validation();
    let age = isAgeGreaterThan18($("#DOB").val())
    if (age == true) {
        if (vali == '') {

            save();
       
        }

        else {
            Hidegrid()
            swal("Message", vali, "error");
            
        }
    }
    else {
        Hidegrid()
        swal("Massage", 'Age Must be Grater than 18', "error");
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

        custid: $("#txtHiddenId").val(),
        EmployeeCode: $("#EmployeeCode").val().trim(),
        Employee: $("#Employee").val().trim(),
        DOB: $("#DOB").val(),
        DOjoin: $("#join").val(),
        Dept: $("#Dept").val().trim(),
        Gender: $("#Gender").val(),
        Designation: $("#Designation").val().trim(),
        Password: $("#Password").val().trim(),
        CompanyId: $("#CompanyId").val(),
        BranchId: $("#BranchId").val(),
        type: 25,
        mode: $("#flgmode").val(),
        UserId: $("#UserId").val(),
        status: $("#status").is(':checked') ? 1 : 0,
    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "PrintdivModal");

}

const Showdata = () => {

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
        type: 26,
        UserId: $("#UserId").val(),
        ProfileId: $("#ProfileIdd").val(), 

    }

    CommonAjax(url, JSON.stringify(Data), "", "", "", "", "printdiv");

}

function isAgeGreaterThan18(dobStr) {

    const dob = new Date(dobStr);


    if (isNaN(dob)) {
        return false;
    }

    const today = new Date();


    let age = today.getFullYear() - dob.getFullYear();


    const hasBirthdayPassed =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!hasBirthdayPassed) {
        age--;
    }

    return age > 18;
}



function EditbyId(id) {
    Hidegrid()
    let empid = $("#Hid_id" + id + "").html();
    let EmployeeCode = $("#EmployeeCode" + id + "").html();
    let EmployeeName = $("#EmployeeName" + id + "").html();
    let DateofBirth = $("#DateofBirth" + id + "").html();
    let DateOfJoin = $("#DateOfJoining" + id + "").html();
    let Gender = $("#Gender" + id + "").html();
    let Designation = $("#Designation" + id + "").html();
    let Dept = $("#Dept" + id + "").html();
    let Password = $("#Password" + id + "").html();

    let status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(empid);
    $("#EmployeeCode").val(EmployeeCode);
    $("#Employee").val(EmployeeName);
    $("#Gender").val(Gender);
    $("#Designation").val(Designation);
    $("#Password").val(Password);
    $("#DOB").val(formatDate(DateofBirth));
    $("#join").val(formatDate(DateOfJoin));
    $("#Dept").val(Dept);
    $("#EmployeeCode").prop("disabled", true);

    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}



function DeletebyId(Id) {
    var checkstr = confirm('Are You Sure You Want To Delete This?');
    if (checkstr == true) {
        $("#txtHiddenId").val(Id);
        $("#flgmode").val("Del");
        save();
        Showdata();
    }
}

function clear() {
    $("#txtHiddenId").val(0)

    $("#EmployeeCode").val('');
    $("#Employee").val('');
    $("#DOB").val('');
    $("#join").val('');
    $("#Dept").val('');
    $("#Gender").val(''),
        $("#Designation").val(''),
        $("#Password").val(''),
        $("#EmployeeCode").prop("disabled", false);
    $("#submitbtn").html('Save');
    $("#flgmode").val('ADD')
    Showdata();

};


//var links = document.getElementsByTagName("a"); 

//for (var i = 0; i < links.length; i++) {
//    console.log("Old href:", links[i].href); // Get current href

//    var hostname = links[i].href.hostname

//    console.log("New href:", localStorage.getItem("Url") + links[i].href); // Confirm new href
//}
