using NuGet.Packaging.Signing;
using System;
using static QRCoder.PayloadGenerator;

namespace GuardTour.Models
{
    public static class DistanceCalculator
    {
        public static double GetDistanceInMeters(double lat1, double lon1, double lat2, double lon2)
        {
            double R = 6371000; // Radius of Earth in meters
            double dLat = ToRadians(lat2 - lat1);
            double dLon = ToRadians(lon2 - lon1);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c; // distance in meters
        }

        private static double ToRadians(double angle)
        {
            return angle * Math.PI / 180.0;
        }


        public static Dictionary<string, double> TotalDistancePerEmployee(List<TourPoint> tourPoints)
        {
            // Group by employee
            var employeeGroups = tourPoints
                .GroupBy(t => new { t.Employee });

            var result = new Dictionary<string, double>();

            foreach (var group in employeeGroups)
            {
                // Order points by EntryDate
                var orderedPoints = group.OrderBy(p => p.EntryDate).ToList();
                double totalDistance = 0;

                for (int i = 1; i < orderedPoints.Count; i++)
                {
                    totalDistance += GetDistanceInMeters(
                        orderedPoints[i - 1].Latitude,
                        orderedPoints[i - 1].Longitude,
                        orderedPoints[i].Latitude,
                        orderedPoints[i].Longitude
                    );
                }

                result.Add(group.Key.Employee, Math.Round(totalDistance, 2)); // rounded meters
            }

            return result;
        }
    }
    }

