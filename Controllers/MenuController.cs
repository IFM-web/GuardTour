using Microsoft.AspNetCore.Mvc;
using GuardTour.AuthFilter;
using Newtonsoft.Json;
namespace GuardTour.Controllers
{
    [AuthenticationFilter]
    public class MenuController : Controller
    {
   
        db_Utility util =new db_Utility();
        public IActionResult UserRights()  
        {
            ViewBag.Usertype = util.PopulateDropDown("exec Dropdownlist 'UserType'", util.strElect);

            return View();
        }

        public IActionResult RightsofProfile()
        {
            ViewBag.Usertype = util.PopulateDropDown("exec Dropdownlist 'UserType'", util.strElect);

            return View();
        }

        public IActionResult Grid (){

            return View();
        }


        public IActionResult MenuRights(string Id)
        {
            ViewBag.Usertype = util.PopulateDropDown("exec Dropdownlist 'UserTypebyId', @id='"+Id+"'", util.strElect);
            ViewBag.Id = Id;
            return View();
        }

        public IActionResult MapUsertoCompanyandBranch(string Id)
        {
            ViewBag.Company = util.PopulateDropDown("exec Dropdownlist 'bindCompany'", util.strElect);
            ViewBag.UserId=Id;
            return View();
        }
        public JsonResult BindCustomer(string CompanyId,string BranchId)
        {
            var list = util.PopulateDropDown("exec Dropdownlist 'BindCustomerMap',@id='" + CompanyId+"',@id2='"+BranchId+"',@id3='"+HttpContext.Session.GetString("ProfileId")+"'", util.strElect);
            return Json(JsonConvert.SerializeObject(list));
        }
    }
}
