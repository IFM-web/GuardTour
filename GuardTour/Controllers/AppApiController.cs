using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Security.Cryptography.Xml;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GuardTour.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AppApiController : ControllerBase
	{

		db_Utility util = new db_Utility();
		ClsUtility csutil = new ClsUtility();
		[Route("fetchData")]
		public IActionResult fetchData(string? Data)
		{
			string? data = ""; int flag = 0;
			try
			{
				if (Data == null)
				{

					 data = Request.Form["jsonData"].ToString();
					string url = Request.Form["UrlEncript"].ToString();
					string encryption = util.cryption(url);
				}
				else
				{
					data = Data;
				}
				

					DataSet ds = util.Fill("exec Usp_ApiProcedure N'" + data.Replace("'", "''") + "'", util.strElect);
					data = ds.Tables[0].Rows[0]["Data"].ToString();

			
				if (flag == 1)
				{
					DataTable mailds = JsonConvert.DeserializeObject<DataTable>(ds.Tables[0].Rows[0]["mail"].ToString());
					if (mailds.Rows.Count > 0)
					{
						for (int i = 0; i < mailds.Rows.Count; i++)
						{

							string OtpStatus = csutil.SendMailViaIIS_html(mailds.Rows[0]["from"].ToString(), mailds.Rows[0]["to"].ToString(), mailds.Rows[0]["cc"].ToString(), mailds.Rows[0]["bcc"].ToString(), mailds.Rows[0]["subject"].ToString(), "", mailds.Rows[0]["_body"].ToString(), null, mailds.Rows[0]["MAIL_PASSWORD"].ToString(), mailds.Rows[0]["Host"].ToString());
						}
					}
					Random _rdm = new Random();
					string genNum = _rdm.Next(1000, 9999).ToString();
					csutil.SMSAPInewwithmsg(ds.Tables[0].Rows[0]["sms"].ToString());
				}
			}
			catch (Exception ex)
			{
				data = "{\"Message\":\"" + ex.Message + "\",\"Status\":\"error\",\"Data\":\"[]\"}";
			}

			return Content(data, "application/json");
		}

		#region ForgetPassword
		[Route("ForgetPassword")]
		[HttpPost]	
		
		public  IActionResult ForgetPassword()
		{
			try
			{
			
			string username = Request.Form["username"].ToString();
			string oldpwd = Request.Form["oldpwd"].ToString();
			string confpwd = Request.Form["confpwd"].ToString();
			string ecnpwd = EncryptionHelper.Encrypt(confpwd);
			string oldpwden = EncryptionHelper.Encrypt(oldpwd);
		
			var ds =  util.Fill("exec Udp_Forgetpassword @username='" + username.Trim() + "',@oldpwd='" + oldpwden.Trim() + "',@confpwd='" + ecnpwd.Trim() + "'", util.strElect);
			string errmsg = ds.Tables[0].Rows[0][1].ToString();
			if(errmsg== "Password Updated SuccessFully")
				return Ok(errmsg);
			else
			return BadRequest(errmsg);
			}
			catch(Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
		#endregion

	}
}
