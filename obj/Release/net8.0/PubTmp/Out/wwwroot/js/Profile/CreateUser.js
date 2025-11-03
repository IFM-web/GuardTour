$(document).ready(() => {
    showgrid()
    ShowUser();
})
function Save() {
    const val = Validation();
    if (val == '') {



        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        let pwd = $("#password").val();
        if (reg.test(pwd)) {
            $.ajax({
                url: localStorage.getItem("Url") + '/Profile/InsertUser',
                type: 'post',
                data: {

                    Id: $("#txtHiddenId").val(),
                    Usertype: $("#Userprofile").val(),
                    UserName: $("#UserName").val().trim(),
                    Password: $("#password").val().trim(),
                    status: $("#status").is(":checked") ? 1 : 0,
                    CompanyId: $("#Company").val(),
                    BranchId: $("#branch").val(),

                },
                success: function (data) {


                    var data = JSON.parse(data);
                    if (data[0].status == 'success') {
                        alert(data[0].Massage);
                        window.location.reload();
                    }
                    else {
                        alert(data[0].Massage);
                    }
                },
                error: function (error) {
                    alert(error.massage);
                }
            })
        } else {
            let msg = `<ul><li> Password :
        at least one lowercase letter

        </li>
        <li>Password : at least one uppercase letter
        </li>
        <li>Password : at least one digit
        </li>
        <li>Password : at least one special character
        </li>
        </ul>
        `
            $("#massaage").html(msg)
        }
    } else {
      swal("Massage",val,'error')
    }
}

function ShowUser() {
    $.ajax({
        url: localStorage.getItem("Url") + '/Profile/ShowUser',
        type: 'Get',
        data: {
            
            CompanyId: $("#CompanyId").val(),
            BranchId: $("#BranchId").val(),
            id: $("#ProfileIdd").val(),

        },
        success: function (data) {
            var data = JSON.parse(data);

            $("#printdiv").empty();
            CreateTableFromArray(data,'printdiv');
            
        },
        error: function (error) {
            alert(error.massage);
        }
    })
}

function Delete(Id) {
    var res = confirm("Are you Sure to Delete User !");
    if (res) {

   
        
    
    $.ajax({
        url: localStorage.getItem("Url") + '/Profile/DeleteUser',
        type: 'post',
        data: {

            Id:Id

        },
        success: function (data) {
            var data = JSON.parse(data);
            if (data[0].status == 'success') {
                alert(data[0].Massage);

                ShowUser();

            }
            

        },
        error: function (error) {
            alert(error.massage);
        }
    })
    }
}

function EditbyId(id) {
    Hidegrid()
    var Userid = $("#Hid_id" + id + "").html();
    var Username = $("#Hid_UserName" + id + "").html();
    var ProfileId = $("#Hid_ProfileId" + id + "").html();
    var Password = $("#Password" + id + "").html();
    var status = $("#Status" + id + "").html();

    if (status == 'Active') {
        $("#status").prop("checked", true);
    } else {
        $("#status").prop("checked", false);
    }

    $("#txtHiddenId").val(Userid);
    $("#UserName").val(Username);
    $("#UserName").prop("disabled",true)
    $("#Userprofile").val(ProfileId);
    $("#password").val(Password);




    $("#flgmode").val("edit");
    $("#submitbtn").html('Update');
}