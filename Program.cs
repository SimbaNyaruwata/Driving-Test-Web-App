using Driving_Test_Web_App.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ApplicationDbContext>(optionsActions => optionsActions.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));
var app = builder.Build();

app.UseCors(options =>
    options.WithOrigins("http://localhost:5269")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials()
);


if (!app.Environment.IsDevelopment())
{
}

app.UseRouting();

app.UseHttpsRedirection();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
