namespace AngularSignalR.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatingTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Article = c.String(),
                        Amount = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Customer = c.String(),
                        CreationDate = c.DateTime(nullable: false),
                        Notes = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Orders");
        }
    }
}
