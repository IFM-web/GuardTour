namespace GuardTour.Models
{
    public class Adm_User
    {

        public string email { get; set; }
        public string password { get; set; }
        public string deviceid { get; set; }

        public string Captcha { get; set; }
        public string gencap { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string address { get; set; }
    }

}
