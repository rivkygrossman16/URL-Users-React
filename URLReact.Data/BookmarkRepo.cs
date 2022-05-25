using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLReact.Data
{
   public class BookmarkRepo
    {
        private readonly string _connectionString;

        public BookmarkRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var ctx = new BookmarkContext(_connectionString);
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }

        public User GetByEmail(string email)
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }



        public void AddBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.BookMarks.Add(bookmark);
            ctx.SaveChanges();
        }


        public List<MostUsedBookmarks> GetTopBookmarks()
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.BookMarks.GroupBy(p => p.URL)
                 .Select(g => new MostUsedBookmarks
                 {
                     Count = g.Count(),
                     URL = g.Key

                 })
                   .OrderByDescending(p => p.Count)
                   .Take(5)
                   .ToList();
        }

        public List<Bookmark> GetBookmarks(int userId)
        {
            using var ctx = new BookmarkContext(_connectionString);
            return ctx.BookMarks.Where(b => b.UserId == userId).ToList();
         }

        public void DeleteBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.BookMarks.Remove(bookmark);
            ctx.SaveChanges();
        }


        public void EditBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkContext(_connectionString);
            ctx.BookMarks.Update(bookmark);
            ctx.SaveChanges();
        }
    }
}
