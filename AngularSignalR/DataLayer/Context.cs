using System;
using System.Data.Entity;

namespace AngularSignalR.DataLayer
{
    public class Context : DbContext
    {
        public Context() : base()
        {
        }

        public DbSet<Order> Orders { get; set; }
    }
}