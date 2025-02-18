using GuardTour;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GuardTour.Controllers
{
    public class ReportController : Controller
    {
        db_Utility util=new db_Utility();
        public JsonResult getPhotoAttendance(string todate, string empno)

        {
            var date = Convert.ToDateTime(todate).ToString("yyyy-MM-dd");
            var ds = util.Fill("select * from mytable1 where Date = CONVERT(VARCHAR, cast ('" + date + "'as date), 106) and EmployeeNumber='" + empno+"'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
           
        }

        public JsonResult getSupperAttendance(string month, string year)

        {
            
            var ds = util.Fill("select convert(varchar,a.date,106)as showdate ,a.* from AttendanceSupper a where  DATEPART(year, date)='" + year + "' and DATEPART(month, date)='" + month+"'", util.strElect);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);

        }
    }
}
