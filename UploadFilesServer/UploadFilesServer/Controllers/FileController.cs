using Microsoft.AspNetCore.Mvc;
using UploadFilesServer.Services;

namespace UploadFilesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly FileService _fileService;
        public FileController(FileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadFile()
        {
            var file = await Request.ReadFormAsync();
            var isUploaded = await _fileService.UploadFile(file);

            return isUploaded ? Ok(isUploaded) : StatusCode(500, "Internal Server Error");
        }

        [HttpPost("upload/files"), RequestSizeLimit(500 * 1024 * 1024)]
        [RequestFormLimits(MultipartBodyLengthLimit = 500 * 1024 * 1024)]
        public IActionResult UploadFiles()
        {
            var files = Request.Form.Files;

            var result = _fileService.UploadMultipleFiles(files);

            return result ? Ok(result) : NoContent();
        }

        [HttpGet("{file}")]
        public IActionResult GetPhotos(string file)
        {
            var photos = _fileService.GetPhotos(file);

            return Ok(new { photos });
        }

        [HttpGet("getFile/{fileName}")]
        public IActionResult GetPhoto(string fileName)
        {
            var file = _fileService.GetFile(fileName);

            return Ok(new { file });
        }

        [HttpGet, DisableRequestSizeLimit]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string fileUrl)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), fileUrl);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            return File(await _fileService.GetMemoryStream(filePath), _fileService.GetContentType(filePath), filePath);
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("upload/file")]
        public async Task<IActionResult> UploadFile(List<IFormFile> files)
        {
            await _fileService.UploadFiles(files);

            return Ok();
        }

        [HttpPost("preview")]
        public ActionResult Preview(IFormFile file)
        {
            return File(_fileService.Preview(file), "application/pdf");
        }
    }
}
