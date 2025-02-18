using GuardTour;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections;
using System.Data;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GuardTour.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ApiServicesController : ControllerBase
    {
        
		//New_utility UtilOracle = new New_utility();
		db_Utility Util = new db_Utility();
		ClsUtility ClsUtil = new ClsUtility();


        [Route("saveDataWithFile")]
		[HttpPost]
		public IActionResult saveDataWithFile(IFormFile? file)
		{
			string? data = ""; int flag = 0;
			try
			{
				string Data = Request.Form["jsonData"].ToString();
				string url = Request.Form["UrlEncript"].ToString();
				string filename = Request.Form["fname"].ToString();
				//IFormFile file= Request.Form.Files[0];
				string encryption = Util.cryption(url);
				string folderNameFPho = Request.Form["folder"].ToString();

				DataSet ds = Util.Fill("exec Usp_ApiProcedure N'" + Data.Replace("'", "''") + "'", Util.strElect);
				data = ds.Tables[0].Rows[0]["Data"].ToString();
				DataTable mailds = JsonConvert.DeserializeObject<DataTable>(ds.Tables[0].Rows[0]["mail"].ToString());
				if (file != null)
				{
					if (!Directory.Exists(folderNameFPho))
					{
						Directory.CreateDirectory(folderNameFPho);
					}
					string newPath = Path.Combine(folderNameFPho, filename);
					using (var fileStream = new FileStream(newPath, FileMode.Create))
					{
						file.CopyTo(fileStream);
					}
				}
				if (flag == 1)
				{
					if (mailds.Rows.Count > 0)
					{
						for (int i = 0; i < mailds.Rows.Count; i++)
						{

							string OtpStatus = ClsUtil.SendMailViaIIS_html(mailds.Rows[0]["from"].ToString(), mailds.Rows[0]["to"].ToString(), mailds.Rows[0]["cc"].ToString(), mailds.Rows[0]["bcc"].ToString(), mailds.Rows[0]["subject"].ToString(), "", mailds.Rows[0]["_body"].ToString(), null, mailds.Rows[0]["MAIL_PASSWORD"].ToString(), mailds.Rows[0]["Host"].ToString());
						}
					}
					Random _rdm = new Random();
					string genNum = _rdm.Next(1000, 9999).ToString();
					ClsUtil.SMSAPInewwithmsg(ds.Tables[0].Rows[0]["sms"].ToString());
				}
			}
			catch (Exception ex)
			{
				data = "{\"Message\":\"" + ex.Message + "\",\"Status\":\"error\",\"Data\":\"[]\"}";
			}

			return Content(data, "application/json");
		}


		[Route("Save")]
        public IActionResult SaveData()
        {
            string? data = ""; int flag = 0;
            try
            {
                string Data = Request.Form["jsonData"].ToString();
                string url = Request.Form["UrlEncript"].ToString();
                string encryption = Util.cryption(url);


                DataSet ds = Util.Fill("exec Usp_ApiProcedure N'" + Data.Replace("'", "''") + "'", Util.strElect);
                data = ds.Tables[0].Rows[0]["Data"].ToString();


                if (flag == 1)
                {
                    DataTable mailds = JsonConvert.DeserializeObject<DataTable>(ds.Tables[0].Rows[0]["mail"].ToString());
                    if (mailds.Rows.Count > 0)
                    {
                        for (int i = 0; i < mailds.Rows.Count; i++)
                        {

                            string OtpStatus = ClsUtil.SendMailViaIIS_html(mailds.Rows[0]["from"].ToString(), mailds.Rows[0]["to"].ToString(), mailds.Rows[0]["cc"].ToString(), mailds.Rows[0]["bcc"].ToString(), mailds.Rows[0]["subject"].ToString(), "", mailds.Rows[0]["_body"].ToString(), null, mailds.Rows[0]["MAIL_PASSWORD"].ToString(), mailds.Rows[0]["Host"].ToString());
                        }
                    }
                    Random _rdm = new Random();
                    string genNum = _rdm.Next(1000, 9999).ToString();
                    ClsUtil.SMSAPInewwithmsg(ds.Tables[0].Rows[0]["sms"].ToString());
                }
            }
            catch (Exception ex)
            {
                data = "{\"Message\":\"" + ex.Message + "\",\"Status\":\"error\",\"Data\":\"[]\"}";
            }

            return Content(data, "application/json");
        }

        [Route("PostData")]
        public IActionResult GetRawContent()
        {
            //string type = RouteData.Values["type"].ToString();
            //string name = RouteData.Values["name"].ToString();
            string rawContent =  Request.Form["jsonData"].ToString();
			string UserData = Request.Form["UserData"].ToString();
			
			//using (var reader = new StreamReader(Request.Body,
			//              encoding: Encoding.UTF8, detectEncodingFromByteOrderMarks: false))
			//{
			//    rawContent = reader.ReadToEnd();
			//}

			string data = "", query = "";
            Hashtable HashTab = new Hashtable();
            DataSet Ds = new DataSet();
            DataTable mailds=new DataTable();
            //UtilOracle.Fill1("select * from ADM_USER_BRANCH_PROFILE;");
            //query = " API_DATA.API_EXTERNAL_INTEGRATION.PRC_API_WEBHOOKS (:VAR_JSONDATA, :VAR_VENDORNAME, :VAR_WEBHOOKTYPE, :RET_CUR) ; ";
            query = " PKG_Admin.AdminProcedure(:VAR_JSONDATA, :VAR_USERDATA,:RET_CUR) ; ";

            HashTab.Add("SQL", query);
            HashTab.Add("IN:VAR_JSONDATA", rawContent);
            HashTab.Add("IN:VAR_USERDATA", UserData);
            //var jsondata = JArray.Parse((rawContent == "" ? "[]" : rawContent));
            //var UserJData = JArray.Parse((UserData == "" ? "[]" : UserData));
           
            //var textpass = jsondata[0]["type"].ToString();


            HashTab.Add("OUT:RET_CUR", "CURSOR");

           // HashTab = Util.InsertTran(HashTab, "");
            Ds = (DataSet)HashTab["DS"];
            if (HashTab["INVALIDCODE"].ToString() != "")
            {
                data = HashTab["INVALIDCODE"].ToString();
            }
            else
            {
                data = Ds.Tables[0].Rows[0]["Data"].ToString();
                mailds = JsonConvert.DeserializeObject<DataTable>(Ds.Tables[0].Rows[0]["mail"].ToString());
                mailds = JsonConvert.DeserializeObject<DataTable>(mailds.Rows[0]["Mail"].ToString());
                // mailds = JsonConvert.DeserializeObject<DataTable>(mailds.Rows[0]["Mail"].ToString());

                if (Convert.ToInt32(mailds.Rows[0]["Flag"]) == 1)
                {
                    if (mailds.Rows.Count > 0)
                    {
                        for (int i = 0; i < mailds.Rows.Count; i++)
                        {

                            string Status = ClsUtil.SendMailViaIIS_html(mailds.Rows[i]["from"].ToString(), mailds.Rows[i]["To"].ToString(), mailds.Rows[i]["cc"].ToString(), mailds.Rows[i]["bcc"].ToString(), mailds.Rows[i]["subject"].ToString(), "", mailds.Rows[i]["Body"].ToString(), null, mailds.Rows[i]["MAIL_PASSWORD"].ToString(), mailds.Rows[i]["Host"].ToString());
                        }
                    }
                }
            }
            return Content(data, "application/json");

        }


		[Route("ReportData")]
		public IActionResult Report()
		{
			//string type = RouteData.Values["type"].ToString();
			//string name = RouteData.Values["name"].ToString();
			string rawContent = Request.Form["jsonData"].ToString();
			string UserData = Request.Form["UserData"].ToString();

			//using (var reader = new StreamReader(Request.Body,
			//              encoding: Encoding.UTF8, detectEncodingFromByteOrderMarks: false))
			//{
			//    rawContent = reader.ReadToEnd();
			//}

			string data = "", query = "";
			Hashtable HashTab = new Hashtable();
			DataSet Ds = new DataSet();
			//UtilOracle.Fill1("select * from ADM_USER_BRANCH_PROFILE;");
			//query = " API_DATA.API_EXTERNAL_INTEGRATION.PRC_API_WEBHOOKS (:VAR_JSONDATA, :VAR_VENDORNAME, :VAR_WEBHOOKTYPE, :RET_CUR) ; ";
			query = " mid_report.PKG_Report.RPT_ALL(:VAR_JSONDATA, :VAR_USERDATA,:RET_CUR) ; ";

			HashTab.Add("SQL", query);
			HashTab.Add("IN:VAR_JSONDATA", rawContent);
			HashTab.Add("IN:VAR_USERDATA", UserData);

			HashTab.Add("OUT:RET_CUR", "CURSOR");

			//HashTab = UtilOracle.InsertTran(HashTab, "");
			Ds = (DataSet)HashTab["DS"];
			if (HashTab["INVALIDCODE"].ToString() != "")
			{
				data = HashTab["INVALIDCODE"].ToString();
			}
			else
			{
				data = Ds.Tables[0].Rows[0]["Data"].ToString();
			}
			return Content(data, "application/json");

		}
	}
}
