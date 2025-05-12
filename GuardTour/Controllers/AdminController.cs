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
namespace GuardTour.Controllers
{
    [AuthenticationFilter]
    public class AdminController : Controller
    {
        db_Utility util = new db_Utility();

        #region BranchLogin

        public IActionResult BranchLogin()
        {
            
           ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompany'", util.strElect);
           return View();

        }

        [HttpPost]
      
        public IActionResult BranchLogin(branch_login obj)
        {
            if (!string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
            {

                ViewBag.com = util.PopulateDropDown("exec Dropdownlist 'bindCompany'", util.strElect);
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

                    return RedirectToAction("DashboardLogin", "Admin");
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
            if (!string.IsNullOrEmpty(HttpContext.Session.GetString("UserId")))
            {
                var companyid = HttpContext.Session.GetString("companyid").ToString();
                var branchid = HttpContext.Session.GetString("branchid").ToString();
                ViewBag.site = util.PopulateDropDown("exec drop_site ", util.strElect);
                ViewBag.Route = util.PopulateDropDown("exec Dropdownlist @action='Routebinddash', @id= '" + companyid + "', @id2='" + branchid + "'", util.strElect);

                ViewBag.shift = util.PopulateDropDown("exec drop_Shift @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            }
            else
                return RedirectToAction("Login");
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
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            //var ds = util.Fill("exec drop_beats @Sitid='" + id + "',@companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            var ds = util.Fill("select a.BeatShift_Id as locid,  isnull(a.BeatShiftName ,'')+ ' (' + ISNULL(a.beatCode, '') + ')'BeatName  from BeatShiftMaster a join AssignBeat b on a.BeatShift_Id=b.BeatId where b.RoutId='" + id + "' and a.CompanyId='" + companyid + "' and a.BranchId='" + branchid + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }



        [HttpGet]
        public JsonResult bindroute(int id)
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            var ds = util.Fill("exec drop_Route @Sitid='" + id + "',@companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }



        [HttpPost]
        public JsonResult bindsiteid(int id)
        {

            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            var ds = util.Fill("exec drop_site @custid='" + id + "',@companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
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

        [HttpGet]
        public JsonResult getBeats(int id)
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            //var ds = util.Fill("select * from Employees a join beatmaster b on a.beatid=b.beatid where a.beatid='" + id + "'", util.strElect);
            var ds = util.Fill("exec GetmapDetails @beatid='"+id+ "',@branch='"+ branchid + "',@companyid='"+companyid+"'", util.strElect);
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

        #region Photo Attendance
        public IActionResult PhotoAttendance()
        {
            return View();
        }

        #endregion


        #region Daily Attendance
        public IActionResult DailyAttendance()
        {
            return View();
        }

        #endregion

        #region Attendance Super
        public IActionResult AttendanceSuper()
        {
            return View();
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
        public JsonResult ForgetPassword(string username,string oldpwd ,string confpwd)
        {

            string cnoldpwd = EncryptionHelper.Encrypt(oldpwd);
            string cnconfpwd = EncryptionHelper.Encrypt(confpwd);
            var ds = util.Fill("exec Udp_Forgetpassword @username='"+username+ "',@oldpwd='"+cnoldpwd+ "',@confpwd='"+cnconfpwd+"'", util.strElect);
            string errmsg = ds.Tables[0].Rows[0][1].ToString();
            
            return Json(errmsg);
        }
        #endregion

 
        public IActionResult DashboardLogin()
        {
           
            return View();
        }

      
        public JsonResult binddashboard()
        {
			var companyid = HttpContext.Session.GetString("companyid").ToString();
			var branchid = HttpContext.Session.GetString("branchid").ToString();

			DataTable dt = new DataTable();

            string sqlquery = "exec drop_BindDoardLogin @CompanyId='" + companyid + "', @BranchId='"+ branchid + "' ";
            DataSet ds = util.Fill(sqlquery, util.strElect);

            if (ds.Tables[0].Rows.Count > 0)
            {
                dt = ds.Tables[0];
            }
            return Json(JsonConvert.SerializeObject(dt));
        }
    }
}
