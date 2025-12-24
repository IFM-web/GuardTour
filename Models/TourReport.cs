namespace GuardTour.Models
{
    public class TourReport
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public DateTime ReportDate { get; set; }
        public string Summary { get; set; }
        public string Details { get; set; }

    }
}
