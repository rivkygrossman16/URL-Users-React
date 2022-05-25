﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLReact.Data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string URL { get; set; }
        public string Title { get; set; }

        public User user { get; set; }
    }
}
