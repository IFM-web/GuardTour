using GuardTour;
using GuardTour.AuthFilter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.CodeAnalysis.Operations;
using Newtonsoft.Json;
using System.ComponentModel.Design;

namespace GuardTour.Controllers
{

    [AuthenticationFilter]
    public class ReportController : Controller
    {
        db_Utility util=new db_Utility();
        protected string companyId;
        protected string branchId;
        protected string ProfileId;
        protected string UserId;

       
        public ReportController(IHttpContextAccessor httpContextAccessor)
        {
           companyId= httpContextAccessor.HttpContext.Session.GetString("companyid");
            branchId = httpContextAccessor.HttpContext.Session.GetString("branchid");
            ProfileId = httpContextAccessor.HttpContext.Session.GetString("ProfileId");
            UserId = httpContextAccessor.HttpContext.Session.GetString("UserId");
        }
    
     
        public IActionResult TourReport()
        {

            ViewBag.cust = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap', @id='" + companyId + "',@id2='" + branchId + "',@id3='"+ProfileId+ "',@id4='"+UserId+"' ", util.strElect);

            return View();

        }

        public IActionResult SOSReport()
        {

            ViewBag.cust = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap', @id='" + companyId + "',@id2='" + branchId + "',@id3='" + ProfileId + "',@id4='" + UserId + "' ", util.strElect);

            return View();

        }
        public JsonResult showTourReport(string custid,string siteid,string routename, string shiftid,string Todate, string Fromdate)
        {
            var ds = util.Fill(@$"exec App_Usp_InsertTourReport @CompanyId='{companyId}',@BranchId='{branchId}',@CustomerId='{custid}',@SiteId='{siteid}',@shiftid='{shiftid}',@RouteCode='{routename}',@todate='{Todate}',@fromdate='{Fromdate}'", util.strElect);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

             
        }

        public JsonResult showSOSReport(string custid, string siteid, string routename, string shiftid, string Todate, string Fromdate)
        {
            var ds = util.Fill(@$"exec App_Usp_InsertTourReport @CompanyId='{companyId}',@BranchId='{branchId}',@CustomerId='{custid}',@SiteId='{siteid}',@shiftid='{shiftid}',@RouteCode='{routename}',@todate='{Todate}',@fromdate='{Fromdate}'", util.strElect);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));


        }

        public IActionResult Incident()
        {
            ViewBag.cust = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap', @id='" + companyId + "',@id2='" + branchId + "',@id3='" + ProfileId + "',@id4='" + UserId + "' ", util.strElect);
            return View();
        }

        public IActionResult SOS()
        {
            ViewBag.cust = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap', @id='" + companyId + "',@id2='" + branchId + "',@id3='" + ProfileId + "',@id4='" + UserId + "' ", util.strElect);
            return View();
        }


    }
}
