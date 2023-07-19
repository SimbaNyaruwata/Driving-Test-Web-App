using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Driving_Test_Web_App.Models
{
    public class Question
    {
        [Key]
        public int QuestionId  { get; set; }

        [Column(TypeName ="nvarchar(500)")]
        public string QuestionInWords { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? ImageName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option1 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option2 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option3 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option4 { get; set; }

        public int QuestionAnswer { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string QnAnswer { get; set; }
    }
}
