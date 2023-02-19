using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Net.Http.Headers;
using Spire.Doc;

namespace UploadFilesServer.Services
{
    public class FileService
    {

        public async Task<bool> UploadFile(IFormCollection formCollection)
        {
            try
            {
                var folderName = Path.Combine("Uploaded", "Files");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                var file = formCollection.Files.FirstOrDefault();

                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (Directory.Exists(pathToSave))
                {
                    if (file.Length > 0)
                    {
                        string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
                        var fullPath = Path.Combine(pathToSave, fileName);

                        var dbPath = Path.Combine(folderName, fileName);

                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                            return true;
                        }
                    }
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        public bool UploadMultipleFiles(IFormFileCollection files)
        {
            var folderName = Path.Combine("Uploaded", "Files");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (files.Any(f => f.Length == 0))
                return false;

            foreach (var file in files)
            {
                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    return true;
                }
            }

            return false;
        }

        public string GetFile(string fileName)
        {
            var folderName = Path.Combine("Uploaded", "Files");
            var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            var filePath = Path.Combine(pathToRead, fileName);
            if (File.Exists(filePath))
            {
                var file = Path.Combine(folderName, fileName);
                return file;
            }

            return null;
        }

        public IEnumerable<string> GetPhotos(string file = null)
        {
            try
            {
                var folderName = Path.Combine("Uploaded", "Files");
                var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var photos = Directory.EnumerateFiles(pathToRead)
                    .Where(IsAPhotoFile)
                    .Select(fullPath => Path.Combine(folderName, Path.GetFileName(fullPath)));

                return photos;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private bool IsAPhotoFile(string fileName)
        {
            return fileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                || fileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                || fileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase);
        }

        public string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }

        public async Task<MemoryStream> GetMemoryStream(string filePath)
        {
            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return memory;
        }

        public async Task UploadFiles(List<IFormFile> files)
        {
            foreach (var file in files)
            {
                var fileName = file.FileName;
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploaded", "Files", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
        }

        public byte[] Preview(IFormFile file)
        {
            try
            {
                var extension = Path.GetExtension(file.FileName);

                if (extension == ".doc" || extension == ".docx")
                {
                    byte[] docBytesArray = new byte[] { };

                    using (var memoryStream = new MemoryStream())
                    {
                        file.CopyTo(memoryStream);

                        docBytesArray = memoryStream.ToArray();
                    }
                    using (var docStream = new MemoryStream(docBytesArray))
                    {
                        var document = new Document(docStream);

                        using (var pdfStream = new System.IO.MemoryStream())
                        {
                            document.SaveToStream(pdfStream, FileFormat.PDF);
                            return pdfStream.ToArray();
                        }
                    }
                }

                return null;
            }
            catch { return null; }
        }
    }
}
