using Microsoft.AspNetCore.Mvc;

namespace GuardTour.Controllers
{
    public class APIDOCController : Controller
    {
        public IActionResult APIDocs()
        {

            return View();
        }

		public IActionResult ApiDocMaster()
		{
			return View();
		}

        
	}
}
