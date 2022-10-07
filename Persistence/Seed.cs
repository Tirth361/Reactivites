
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context , UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob" ,UserName = "bob" , Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom" ,UserName = "tom" , Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane" ,UserName = "jane" , Email = "jane@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user,"Pa$$w0rd");
                }
            }
            if (context.Activities.Any()) return;

            var activites = new List<Activity>
            {
                new Activity{
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 month ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub"
                },
                new Activity{
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre"
                },
                new Activity{
                    Title = "Past Activity 3",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 month future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema"
                }
            };
            await context.Activities.AddRangeAsync(activites);
            await context.SaveChangesAsync();
        }
    }
}