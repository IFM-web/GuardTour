using GuardTour.Models;
using GuardTour;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;


namespace GuardTour.Controllers
{
    public class HomeController : Controller
    {
        db_Utility util = new db_Utility();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
           
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        #region Login
        public IActionResult Login()
        {
            HttpContext.Session.Clear();
            return View();
        }

        [HttpPost]
        public IActionResult Login(Adm_User obj)
        {
            HttpContext.Session.Clear();
            string cnpwd = EncryptionHelper.Encrypt(obj.password);
            var ds = util.Fill("exec LoginValidate @username='" + obj.email + "',@password='" + cnpwd + "' ", util.strElect);

            //  var userid = ds.Tables[0].Rows[0][0];
            string errmsg = ds.Tables[0].Rows[0][1].ToString();
            if (errmsg != "[]")
            {
                if (errmsg != "Incorrect Password")
                {
                    if (errmsg != "Invalid Username")
                    {
                        HttpContext.Session.SetString("UserId", ds.Tables[0].Rows[0]["UserId"].ToString());
                        HttpContext.Session.SetString("UserName", ds.Tables[0].Rows[0]["UserName"].ToString());
                        HttpContext.Session.SetString("FlagAdd", ds.Tables[0].Rows[0]["FlagAdd"].ToString());
                        HttpContext.Session.SetString("ProfileId", ds.Tables[0].Rows[0]["ProfileId"].ToString());
                        ViewData["FlagAdd"] = ds.Tables[0].Rows[0]["FlagAdd"].ToString();

                        return RedirectToAction("BranchLogin", "Admin");
                    }
                    else
                        ViewBag.msg = errmsg;

                }
                else if (errmsg == "Incorrect Password")
                {
                    ViewBag.msg = errmsg;
                }
            }
            else
            {
                ViewBag.msg = "You Are Offline, Please Try Again !";
            }


            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login", "Home");

        }

        #endregion

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
