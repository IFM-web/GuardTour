namespace GuardTour.Models
{
    public class Points
    {
        public string EmployeeId { get; set; }      
        public DateTime TimeStamp { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }


    public static class  Calculationdistinace
    {
        public static double CalculateDistanceMeters(
    double lat1, double lon1,
    double lat2, double lon2)
        {
            const double EarthRadius = 6371000;

            double dLat = ToRadians(lat2 - lat1);
            double dLon = ToRadians(lon2 - lon1);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(ToRadians(lat1)) *
                       Math.Cos(ToRadians(lat2)) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return EarthRadius * c;
        }

        private static double ToRadians(double deg)
        {
            return deg * Math.PI / 180;
        }

        public static Dictionary<string, double> CalculateTotalDistancePerGuard(
    List<Points> locations)
        {
            var result = new Dictionary<string, double>();

            var groupedGuards = locations
                .OrderBy(l => l.TimeStamp)
                .GroupBy(l => l.EmployeeId);

            foreach (var guard in groupedGuards)
            {
                double totalDistance = 0;
                var records = guard.ToList();

                for (int i = 1; i < records.Count; i++)
                {
                    totalDistance += CalculateDistanceMeters(
                        records[i - 1].Latitude, records[i - 1].Longitude,
                        records[i].Latitude, records[i].Longitude);
                }

                result[guard.Key] = totalDistance / 1000;
            }

            return result; 
        }


    }




}
