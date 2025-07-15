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
		[Route("ManuRight")]
        public IActionResult ManuRight()
        {
            string? data = ""; int flag = 0;
            try
            {
                string Data = Request.Form["jsonData"].ToString();
                string url = Request.Form["UrlEncript"].ToString();
                string encryption = Util.cryption(url);


                DataSet ds = Util.Fill("exec Usp_ManuRights N'" + Data.Replace("'", "''") + "'", Util.strElect);
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





		
	}







}
