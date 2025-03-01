using GuardTour;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using System.ComponentModel.Design;

namespace GuardTour.Controllers
{
    public class MasterController : Controller
    {
        db_Utility util = new db_Utility();
        public IActionResult Index()
        {

            return View();
        }

        #region Post Master
        public IActionResult Post()
        {
             
             var companyid = HttpContext.Session.GetString("companyid").ToString();
             var branchid = HttpContext.Session.GetString("branchid").ToString();

            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            //ViewBag.site = util.PopulateDropDown("exec drop_site @companyid='" + companyid + "',@branchid='"+ branchid + "'", util.strElect);
            return View();
        }
        #endregion

        #region Site Master
        public IActionResult Site()
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();

            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            return View();
        }
        #endregion


        #region Shift Master
        public IActionResult Shift()
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();

            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);



            return View();
        }
        #endregion

        #region Route Master
        public IActionResult Route()
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            //ViewBag.site = util.PopulateDropDown("exec drop_site @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
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

            string companyid = HttpContext.Session.GetString("companyid").ToString();
            string branchid = HttpContext.Session.GetString("branchid").ToString();
          
            ViewBag.Employee = util.PopulateDropDown(@$"exec Dropdownlist 'BindEmployee', @id='{companyid}',@id2='{branchid}'", util.strElect);
            ViewBag.Cust = util.PopulateDropDown(@$"exec Dropdownlist 'BindCustomer',  @id='{companyid}',@id2='{branchid}'", util.strElect);
            ViewBag.Site = util.PopulateDropDown(@$"exec Dropdownlist 'Bindsite', @id='{companyid}',@id2='{branchid}'", util.strElect);
            return View();
        }

        #endregion


        #region Employee Map To Route
        public IActionResult EmployeeMapToRoute()
        {
            string companyid = HttpContext.Session.GetString("companyid").ToString();
            string branchid = HttpContext.Session.GetString("branchid").ToString();

            ViewBag.Employee = util.PopulateDropDown(@$"exec Dropdownlist 'BindEmployee', @id='{companyid}',@id2='{branchid}'", util.strElect);

            ViewBag.Route = util.PopulateDropDown(@$"exec Dropdownlist 'BindRoute', @id='{companyid}',@id2='{branchid}'", util.strElect);

            return View();
        }

        #endregion

        #region Customer Type
        public IActionResult Customer()
        {
            return View();
        }
        #endregion



        #region Beat master
        public IActionResult Beat()
        {

            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            ViewBag.shift = util.PopulateDropDown("exec drop_Shift @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            
            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            return View();
        }
        #endregion
        


        #region Beat Assign
        public IActionResult Assign()
        {

            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            //ViewBag.route = util.PopulateDropDown("exec drop_Route @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
          
            ViewBag.cust = util.PopulateDropDown("exec drop_Customer @companyid='" + companyid + "',@branchid='" + branchid + "'", util.strElect);
            ViewBag.shift = util.PopulateDropDown("exec drop_Shift @companyid='" + companyid + "',@branchid='" + branchid + "'" , util.strElect);
           
            return View();
        }
		#endregion



		#region RoutList Master
		public IActionResult RoutList()
		{
			
			return View();
		}
		#endregion


	}

}
