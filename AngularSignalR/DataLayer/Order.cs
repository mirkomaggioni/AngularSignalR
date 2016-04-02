using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularSignalR.DataLayer
{
    [Table("Orders")]
    public class Order
    {
        public Guid Id { get; set; }
        public string Article { get; set; }
        public decimal Amount { get; set; }
        public string Customer { get; set; }
        public DateTime CreationDate { get; set; }
        public string Notes { get; set; }
    }
}