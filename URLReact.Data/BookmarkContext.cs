using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLReact.Data
{
    public class BookmarkContext:DbContext
    {
        private readonly string _connectionString;

        public BookmarkContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbSet<Bookmark> BookMarks { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
