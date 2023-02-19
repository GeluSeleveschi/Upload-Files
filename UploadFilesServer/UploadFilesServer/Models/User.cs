using System.ComponentModel.DataAnnotations;
using UploadFilesServer.Enums;

namespace UploadFilesServer.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public string? Address { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public GenderEnum Gender { get; set; }

        public string? Email { get; set; }

        public string? ImgPath { get; set; }
        public string? FilePath { get; set; }
    }
}
