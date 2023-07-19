using Microsoft.EntityFrameworkCore;

namespace Driving_Test_Web_App.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        { }
        public  DbSet<Question> Questions { get; set; }
        public  DbSet<Participant> Participants { get; set; }   
    }
    
} 

