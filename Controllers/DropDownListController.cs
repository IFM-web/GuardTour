using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GuardTour.Controllers
{
    public class DropDownListController : Controller
    {

        private readonly db_Utility util;

        protected string? companyId;
        protected string? branchId;
        protected string? profileId;
        protected string? userId;

      
        public DropDownListController(IHttpContextAccessor httpContextAccessor)
        {
            util = new db_Utility();

            var session = httpContextAccessor.HttpContext?.Session;
            if (session != null)
            {
                companyId = session.GetString("companyid");
                branchId = session.GetString("branchid");
                profileId = session.GetString("profileid");
                userId = session.GetString("userid");
            }
        }









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


        [HttpGet]
        public JsonResult bindroute2(int id)
        {

            var ds = util.Fill("exec  Dropdownlist 'BindRoute2toShift', @id3='" + id + "',@id='" + companyId + "',@id2='" + branchId + "'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }


        [HttpGet]
        public JsonResult bindrouteTosite(int id)
        {

            var ds = util.Fill("exec  Dropdownlist 'BindRoutetoSite2', @id3='" + id + "',@id='" + companyId + "',@id2='" + branchId + "'", util.strElect);
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





            [HttpGet]
            public JsonResult getBeats(string date, string routeid, string shift,
               string customer, string site,string FrqId)
            {

                //var ds = util.Fill("select * from Employees a join beatmaster b on a.beatid=b.beatid where a.beatid='" + id + "'", util.strElect);
                var ds = util.Fill("exec GetmapDetails @date='" + date + "',@routeid='" + routeid + "',@shift='" + shift + "',@customerid='" + customer + "',@siteid='" + site + "',@branch='" + branchId + "',@companyid='" + companyId + "',@FrqId='"+FrqId+"'", util.strElect);
                //var ds = util.Fill("select * from  beatmaster where beatid='" + id + "'", util.strElect);
                var dt = ds.Tables[0];
                var data = JsonConvert.SerializeObject(dt);
                return Json(data);
            }

        #region BindShifttoSide
        [HttpPost] 
        public JsonResult BindShifttoSide(string id)
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            var ds = util.Fill(@$"exec Dropdownlist 'BindShifttoSide', @id='{companyid}',@id2='{branchid}',@id3='{id}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));

        }
        [HttpPost] 
        public JsonResult BindShifttoSide2(string id)
        {
            var companyid = HttpContext.Session.GetString("companyid").ToString();
            var branchid = HttpContext.Session.GetString("branchid").ToString();
            var ds = util.Fill(@$"exec Dropdownlist 'BindShifttoSide2', @id='{companyid}',@id2='{branchid}',@id3='{id}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));

        }


        #endregion

        #region Frequency No

        public JsonResult Frequency(string RouteId ,string ShiftId)
        {
           
            var ds = util.Fill(@$"exec Dropdownlist 'BindFrequency', @id='{companyId}',@id2='{branchId}',@id3='{RouteId}',@id4='{ShiftId}'", util.strElect);
            var dt = ds.Tables[0];
            return Json(JsonConvert.SerializeObject(dt));   
        }
        #endregion

    }
}
