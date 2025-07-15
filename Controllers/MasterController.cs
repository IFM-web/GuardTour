using GuardTour;
using GuardTour.AuthFilter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Newtonsoft.Json;
using QRCoder;

using System.ComponentModel.Design;
using System.Drawing;
using System.Security.Policy;
using static System.Net.Mime.MediaTypeNames;

namespace GuardTour.Controllers
{
    [AuthenticationFilter]
    public class MasterController : Controller
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
                new RedirectToActionResult("Login", "Home", null);
            }
        }
        #endregion

        #region Post Master
        public IActionResult Post(string? site, string? custid)
        {
             
            

            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyId + "',@branchid='" + branchId + "', @id='"+custid+"'", util.strElect);
            ViewBag.Site = util.PopulateDropDown(@$"exec Dropdownlist 'BindSitebyCustandSite', @id='{companyId}',@id2='{branchId}',@id3='{site}',@id4='{custid}'", util.strElect);
            ViewBag.Id = site;
            ViewBag.custid = custid;
            
            return View();
        }
        #endregion

        #region Site Master
        public IActionResult Site(string? Id)
        {
            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyId + "',@branchid='" + branchId + "',@id='"+Id+"'", util.strElect);
            ViewBag.Id = Id;
          

            return View();
        }
        #endregion

        #region Shift Master
        public IActionResult Shift(string? custid, string? siteid)
        {

            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyId + "',@branchid='" + branchId + "', @id='" + custid + "'", util.strElect);
            ViewBag.Site = util.PopulateDropDown(@$"exec Dropdownlist 'BindSitebyCustandSite', @id='{companyId}',@id2='{branchId}',@id3='{siteid}',@id4='{custid}'", util.strElect);
            ViewBag.Id = siteid;
            ViewBag.custid = custid;

            return View();
        }
        #endregion

        #region Route Master
        public IActionResult Route(string Id,string siteid)
        {
           
            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyId + "',@branchid='" + branchId + "',@id='"+Id+"'", util.strElect);
            ViewBag.Sitedata = util.PopulateDropDown(@$"exec Dropdownlist 'BindSitebyCustandSite', @id='{companyId}',@id2='{branchId}',@id3='{siteid}',@id4='{Id}'", util.strElect);
            ViewBag.site = siteid;
            ViewBag.custid = Id;
            return View();
        }
        #endregion

        #region Employee 

        public IActionResult Employee()
        {
            return View();
        }

        #endregion

        #region EmployeeMaptocustomerandsite

        public IActionResult EmployeeMaptoCustomerandSite()
        {

        
          
            ViewBag.Employee = util.PopulateDropDown(@$"exec Dropdownlist 'BindEmployee', @id='{companyId}',@id2='{branchId}'", util.strElect);
            ViewBag.cust = util.PopulateDropDown(@$"exec Dropdownlist 'BindCustomer',  @id='{companyId}',@id2='{branchId}',@id3='{ProfileId}',@id4='{UserId}'", util.strElect);
            ViewBag.Site = util.PopulateDropDown(@$"exec Dropdownlist 'Bindsite', @id='{companyId}',@id2='{branchId}'", util.strElect);
            return View();
        }

        #endregion

        #region Employee Map To Route
        public IActionResult EmployeeMapToRoute()
        {
            string companyid = HttpContext.Session.GetString("companyid").ToString();
            string branchid = HttpContext.Session.GetString("branchid").ToString();

            ViewBag.Employee = util.PopulateDropDown(@$"exec Dropdownlist 'BindEmployee', @id='{companyid}',@id2='{branchid}'", util.strElect);

       

            return View();
        }


        public JsonResult RouteTOEmp(string id)
        {
            var lst = util.Fill(@$"exec Dropdownlist 'BindRoute', @id='{companyId}',@id2='{branchId}',@id3='{id}'", util.strElect);
            return Json(JsonConvert.SerializeObject(lst.Tables[0]));
        }



        #endregion

        #region Customer Type
        public IActionResult Customer()
        {
            return View();
        }
        #endregion

        #region Beat master
        public IActionResult Beat(string custid,string Site, string shift)
        {
            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyId + "',@branchid='" + branchId + "',@id='"+ custid + "'", util.strElect);

            ViewBag.Site = util.PopulateDropDown(@$"exec Dropdownlist 'BindSitebyCustandSite', @id='{companyId}',@id2='{branchId}',@id3='{Site}',@id4='{custid}'", util.strElect);
            ViewBag.shiftdata = util.PopulateDropDown(@$"exec Dropdownlist 'BindShifttoSideItself', @id='{companyId}',@id2='{branchId}',@id3='{Site}',@id4='{custid}',@id5='{shift}'", util.strElect);


            ViewBag.custid = custid;
            ViewBag.SiteId = Site;
            ViewBag.shift = shift;
            return View();
      

        }
        #endregion
        
        #region Beat Assign
        public IActionResult Assign()
        {

            //ViewBag.route = util.PopulateDropDown("exec drop_Route @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
          
            ViewBag.cust = util.PopulateDropDown("exec Dropdownlist @action='Customer', @id='" + companyId + "',@id2='" + branchId + "'", util.strElect);
            ViewBag.shift = util.PopulateDropDown("exec drop_Shift @companyid='" + companyId + "',@branchid='" + branchId + "'" , util.strElect);
           
            return View();
        }
		#endregion

		#region RoutList Master
		public IActionResult RoutList(string custid, string siteid)
		{
            ViewBag.custid = custid;
            ViewBag.siteid = siteid;
            return View();
		}
        #endregion

      


        #region BindbeattoShift

        [HttpPost]
        public JsonResult BindbeattoShift(string id)
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            var ds = util.Fill(@$"exec Dropdownlist 'BindbeattoShift', @id='{companyid}',@id2='{branchid}',@id3='{id}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));

        }

        #endregion

        #region  BindRoutetoShift
        [HttpPost]
        public JsonResult BindRoutetoShift(string Shift)
        {
           
            var ds = util.Fill(@$"exec Dropdownlist 'BindRoutetoShift', @id='{companyId}',@id2='{branchId}',@id3='{Shift}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));

        }
        #endregion


        #region  BindRoutetoSite
        [HttpPost]
        public JsonResult BindRoutetoSite(string id)
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            var ds = util.Fill(@$"exec Dropdownlist 'BindRoutetoSite', @id='{companyid}',@id2='{branchid}',@id3='{id}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));

        }
        #endregion





        #region QRCode Generator

        public string CreateQRCode(string name = "")
        {
            string qrText = name;

            QRCodeGenerator qrGenerator = new QRCodeGenerator();

            QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrText, QRCodeGenerator.ECCLevel.Q);


            QRCode qrCode1 = new QRCode(qrCodeData);

            Bitmap qrCodeImage = qrCode1.GetGraphic(20);

            byte[] byteImage = BitmapToBytes(qrCodeImage);


            string imageBase64 = Convert.ToBase64String(byteImage);
            string imageSrc = $"data:image/png;base64,{imageBase64}";



            return imageSrc;
        }
        public byte[] BitmapToBytes(Bitmap img)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                img.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }
        #endregion


        public IActionResult RouteBeatAssign()
        {

            ViewBag.cust = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap', @id='" + companyId + "',@id2='" + branchId + "',@id3='" + ProfileId + "',@id4='" + UserId + "' ", util.strElect);
            return View();
        }



        public IActionResult BindEmployeeMaptoRoute(string Empid)
        {
            var ds = util.Fill(@$"exec Dropdownlist 'BindEmployeeMaptoRoute', @id='{companyId}',@id2='{branchId}',@id3='{Empid}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));
        }



        public IActionResult RouteandsiftAssignList()
        {
            return View();
        }

        public IActionResult RouteandBeatAssignList()
        {
            return View();
        }




    }

}
