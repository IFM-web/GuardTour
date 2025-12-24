using GuardTour;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using GuardTour.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Speech;
using System.Speech.Synthesis;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Data;
using GuardTour.AuthFilter;
using Microsoft.CodeAnalysis.Operations;
using System.ComponentModel.Design;
using Microsoft.AspNetCore.Mvc.Filters;
namespace GuardTour.Controllers
{
    [AuthenticationFilter]
    public class AdminController : Controller
    {
        db_Utility util = new db_Utility();

        protected string companyId;
        protected string branchId;
        protected string ProfileId;
        protected string UserId;

        #region  Auth Filter
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            companyId = HttpContext.Session.GetString("companyid");
            branchId = HttpContext.Session.GetString("branchid");
            UserId = HttpContext.Session.GetString("UserId");
            ProfileId = HttpContext.Session.GetString("ProfileId");



            if (string.IsNullOrEmpty(UserId))
            {
                context.Result = new RedirectToActionResult("Login", "Home", null);
            }
        }
        #endregion

        #region BranchLogin

        public IActionResult BranchLogin()
        {



            if (HttpContext.Session.GetString("UserName").ToUpper() == "SUPERADMIN")
            {
                ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompany'", util.strElect);
            }
            else
            {
                ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompanyAuth',@id='" + HttpContext.Session.GetString("UserId") + "'", util.strElect);
            }

            return View();

        }


        [HttpPost]

        public IActionResult BranchLogin(branch_login obj)
        {
            if (!string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
            {

                if (HttpContext.Session.GetString("UserName").ToUpper() == "SUPERADMIN")
                {
                    ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompany'", util.strElect);
                }
                else
                {
                    ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompanyAuth',@id='" + HttpContext.Session.GetString("UserId") + "'", util.strElect);
                }
                if (obj.companyid != null && obj.branch_id != null)
                {

                    HttpContext.Session.SetString("companyid", obj.companyid.ToString());
                    HttpContext.Session.SetString("branchid", obj.branch_id.ToString());
                    string query = @"SELECT a.BranchName, b.CompanyName FROM Branch a JOIN Company b ON a.CompanyId = b.Com_Id where a.CompanyId = '" + obj.companyid + "' AND a.Branch_Id = '" + obj.branch_id + "'";
                    var ds = util.Fill(query, util.strElect);
                    var dt = ds.Tables[0];
                    string brnname = dt.Rows[0][0].ToString();
                    string comname = dt.Rows[0][1].ToString();
                    HttpContext.Session.SetString("companyname", comname.ToString());
                    HttpContext.Session.SetString("branchname", brnname.ToString());

                    if (HttpContext.Session.GetString("UserName").ToUpper() == "MCLADMIN")
                    {
                        HttpContext.Session.SetString("MainUrl", "MainDashboard");
                        return RedirectToAction("MainDashboard", "Admin");
                    }


                    return RedirectToAction("Dashboard", "Admin");
                }
                else
                {
                    ViewBag.message = "All Field Required!";
                }
            }
            else
                return RedirectToAction("Login");

            return View();
        }
        #endregion


        #region Dashboard

      
        public IActionResult Dashboard()

        {
                ViewBag.cust = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap', @id='" + companyId + "',@id2='" + branchId + "',@id3='" + ProfileId + "',@id4='" + UserId + "' ", util.strElect);
        
            return View();
        }
        #endregion


        #region LogintoDashborad
        [Route("LogintoDashboard")]

        public IActionResult LogintoDashborad(Adm_User obj)
        {
            if (obj.gencap != obj.Captcha)
            {
                ViewBag.msg = "Captcha Not Match";
            }
            return View();
        }
        #endregion


        [HttpGet]

        public JsonResult bindbeatwithroute(int id)
        {

            //var ds = util.Fill("exec drop_beats @Sitid='" + id + "',@companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            var ds = util.Fill("select a.BeatShift_Id as locid,  isnull(a.BeatShiftName ,'')+ ' (' + ISNULL(a.beatCode, '') + ')'BeatName  from BeatShiftMaster a join AssignBeat b on a.BeatShift_Id=b.BeatId where b.RoutId='" + id + "' and a.CompanyId='" + companyId + "' and a.BranchId='" + branchId + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }



        [HttpGet]
        public JsonResult bindroute(int id)
        {

            var ds = util.Fill("exec  Dropdownlist 'BindRoutetoShift', @id3='" + id + "',@id='" + companyId + "',@id2='" + branchId + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }



        [HttpPost]
        public JsonResult bindsiteid(int id)
        {


            var ds = util.Fill("exec drop_site @custid='" + id + "',@companyid='" + companyId + "',@branchid='" + branchId + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }


        [HttpPost]
        public JsonResult bindBranch(int id)
        {
            var ds = util.Fill("exec Dropdownlist 'bindBranch', @id='" + id + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }
        [HttpPost]
        public JsonResult bindBranchAuth(int id)
        {
            var ds = util.Fill("exec Dropdownlist 'bindBranchAuth', @id='" + id + "',@id2='" + HttpContext.Session.GetString("UserId") + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }



        [HttpGet]
        public JsonResult getBeats(string date, string routeid, string shift,
           string customer, string site)
        {

            //var ds = util.Fill("select * from Employees a join beatmaster b on a.beatid=b.beatid where a.beatid='" + id + "'", util.strElect);
            var ds = util.Fill("exec GetmapDetails @date='" + date + "',@routeid='" + routeid + "',@shift='" + shift + "',@customerid='" + customer + "',@siteid='" + site + "',@branch='" + branchId + "',@companyid='" + companyId + "'", util.strElect);
            //var ds = util.Fill("select * from  beatmaster where beatid='" + id + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }

        #region Text to Voice Generator
        public IActionResult Speak(string text, int rate = 4, int volume = 100)
        {
            if (string.IsNullOrEmpty(text))
                return BadRequest("Text cannot be empty.");

            // Initialize a speech synthesizer
            using (var synthesizer = new SpeechSynthesizer())
            {
                synthesizer.Rate = rate;        // Speed of the speech, e.g., -10 to 10
                synthesizer.Volume = volume;    // Volume of the speech, 0 to 100

                // Create a memory stream to hold the audio data
                using (var memoryStream = new MemoryStream())
                {
                    synthesizer.SetOutputToWaveStream(memoryStream);
                    //synthesizer.Speak(text);    // Speak the provided text
                    memoryStream.Position = 0;  // Reset stream position for reading
                    foreach (char letter in text)
                    {
                        synthesizer.Speak(letter.ToString());
                        Thread.Sleep(100); // Optional: Pause between letters (100 ms delay)
                    }

                    // Return the audio data as a file result
                    return File(memoryStream.ToArray(), "audio/wav", "output.wav");
                }
            }
        }
        #endregion


        #region Company

        public IActionResult Company()
        {
            return View();
        }
        #endregion

        #region Region
        public IActionResult Region()
        {
            return View();
        }
        #endregion

        #region Branch

        public IActionResult Branch()
        {

            ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompany'", util.strElect);
            return View();
        }
        #endregion

        #region ForgetPassword
        [HttpPost]
        public JsonResult ForgetPassword(string username, string oldpwd, string confpwd)
        {

            string cnoldpwd = EncryptionHelper.Encrypt(oldpwd);
            string cnconfpwd = EncryptionHelper.Encrypt(confpwd);
            var ds = util.Fill("exec Udp_ForgetpasswordAdmin @username='" + username + "',@oldpwd='" + cnoldpwd + "',@confpwd='" + cnconfpwd + "'", util.strElect);
            string errmsg = ds.Tables[0].Rows[0][1].ToString();

            return Json(errmsg);
        }
        #endregion


        public IActionResult MainDashboard()
        {

            DataSet ds = new DataSet();
            int totalEmployee = 0;
            int totalObj = 0;


            ds = util.Fill(@$"GraphicDashboard '{companyId}','{branchId}','{UserId}'", util.strElect);

            List<Points> guardData = new List<Points>();
            List<Points> guardDatamonth = new List<Points>();

            foreach (DataRow r in ds.Tables[2].Rows)
            {
                var data = new Points
                {
                    EmployeeId = r["EmpName"].ToString(),
                    TimeStamp = Convert.ToDateTime(r["EntryDate"]),
                    Latitude = Convert.ToDouble(r["Latitude"]),
                    Longitude = Convert.ToDouble(r["Longitude"]),
                };
                guardData.Add(data);
            }

            foreach (DataRow r in ds.Tables[3].Rows)
            {
                var data = new Points
                {
                    EmployeeId = r["EmpName"].ToString(),
                    TimeStamp = Convert.ToDateTime(r["EntryDate"]),
                    Latitude = Convert.ToDouble(r["Latitude"]),
                    Longitude = Convert.ToDouble(r["Longitude"]),
                };
                guardDatamonth.Add(data);
            }


            var totals = Calculationdistinace.CalculateTotalDistancePerGuard(guardData);
            ViewBag.totalDist = totals.Sum(e=>e.Value);
            ViewBag.totals = totals;
            var totalsmonthly = Calculationdistinace.CalculateTotalDistancePerGuard(guardDatamonth);
            ViewBag.TatalofMonth = totalsmonthly.Sum(e => e.Value);
            ViewBag.totalsmonthly = totalsmonthly;
            ViewBag.employee = ds.Tables[0].Rows[0][0];
            ViewBag.Obj = ds.Tables[1].Rows[0][0];



            return View();
        }


        public IActionResult DashboardLogin(string? Id)
        {
            if (HttpContext.Session.GetString("UserName").ToUpper() == "MCLADMIN")
            {
                HttpContext.Session.SetString("MainUrl", "Admin/MainDashboard");
            }
            else
            {
                HttpContext.Session.SetString("MainUrl", Id);
            }
            
            ViewBag.Type = Id;
            return View();
        }


        public JsonResult binddashboard(string UserId, string ProfileId)
        {


            DataTable dt = new DataTable();

            string sqlquery = "exec drop_BindDoardLogin @CompanyId='" + companyId + "', @BranchId='" + branchId + "',@UserId='" + UserId + "',@ProfileId='" + ProfileId + "' ";
            DataSet ds = util.Fill(sqlquery, util.strElect);

            if (ds.Tables[0].Rows.Count > 0)
            {
                dt = ds.Tables[0];
            }
            return Json(JsonConvert.SerializeObject(dt));
        }
    }

    










    

}
