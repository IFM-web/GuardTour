using GuardTour.AuthFilter;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;

namespace GuardTour.Controllers
{
    [AuthenticationFilter]
    public class ProfileController : Controller
    {
        db_Utility util = new db_Utility();
        #region UserCreation

        public IActionResult UserCreation()
        {

            ViewBag.Usertype = util.PopulateDropDown("exec Dropdownlist 'UserType'", util.strElect);
            return View();
        }
        [HttpPost]
        public JsonResult InsertUser(string Id,string UserType, string UserName, string Password,int status)
        {
            var ds=util.Fill(@$"exec Usp_UserCreation 'Insert',@id='{Id}' ,@UserName='{UserName}',@UserType='{UserType}',@status='{status}',@password='{EncryptionHelper.Encrypt(Password)}'", util.strElect);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
           
        }

        [HttpPost]
        public JsonResult DeleteUser(string Id)
        {
            var ds = util.Fill(@$"exec Usp_UserCreation 'Delete', @id='{Id}'", util.strElect);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }


        public JsonResult ShowUser()
        {
            DataTable dt = new DataTable();
            var ds = util.Fill(@"exec Usp_UserCreation 'Show'", util.strElect);

            if (ds != null && ds.Tables.Count > 0)
            {
                dt.Columns.Add("Hid_id");
                dt.Columns.Add("Hid_ProfileId");
                dt.Columns.Add("Hid_UserName");
                dt.Columns.Add("UserName");
                dt.Columns.Add("User Type");
                dt.Columns.Add("Password");
                dt.Columns.Add("Status");
                dt.Columns.Add("Action");
              



                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    
                    DataRow dr = dt.NewRow();
                    dr["Hid_id"] = row["Hid_id"];
                    dr["Hid_ProfileId"] = row["Hid_ProfileId"];
                    dr["Hid_UserName"] = row["Hid_UserName"];
                    dr["UserName"] = row["UserName"];
                    dr["User Type"] = row["ProfileId"];
                  
                   dr["Password"] = EncryptionHelper.Decrypt( row["UserPassword"].ToString());
                   // dr["Password"] = ( row["UserPassword"].ToString());
                    dr["Status"] = row["IsUActive"];
                    dr["Action"] = row["Action"];
                 

                    dt.Rows.Add(dr);


                }
            }

            string jsonData = JsonConvert.SerializeObject(dt);
            return Json(jsonData);
        }


        #endregion


        public IActionResult CreateUserType()
        {
            return View();
        }
    }
}
