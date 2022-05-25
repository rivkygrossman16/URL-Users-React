using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using URLReact.Data;

namespace URLReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [authorize]
        [HttpPost]
        [Route("addbookmark")]
        public void AddBookMark(Bookmark bookmark)
        {
            var repo = new BookmarkRepo(_connectionString);
            bookmark.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.AddBookmark(bookmark);
        }

        [HttpGet]
        [Route("gettop")]
        public List<MostUsedBookmarks> GetTop()
        {
            var repo = new BookmarkRepo(_connectionString);
             return repo.GetTopBookmarks();
        }


        [authorize]
        [HttpGet]
        [Route("getbookmarks")]
        public List<Bookmark> GetBookmarks()
        {
            var repo = new BookmarkRepo(_connectionString);
           var userId = repo.GetByEmail(User.Identity.Name).Id;
            return repo.GetBookmarks(userId);
        }

        [authorize]
        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.DeleteBookmark(bookmark);
        }


        [authorize]
        [HttpPost]
        [Route("editbookmark")]
        public void EditBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.EditBookmark(bookmark);
        }
    }
        }
