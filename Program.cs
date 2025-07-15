using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using GuardTour.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
DbConnect.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSession(options =>
{
    // Set a short timeout for easy testing.
    options.IdleTimeout = TimeSpan.FromMinutes(180);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    // options.Cookie.Name = ".ToolsAppSession";
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{

    serverOptions.Limits.MaxRequestBodySize = null;


});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
   
    app.UseHsts();
}


app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseRouting();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Login}/{id?}");

app.Run();
