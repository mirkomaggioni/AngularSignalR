using System.Configuration;
using Owin;
using Microsoft.Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartup(typeof(AngularSignalR.Startup))]
namespace AngularSignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["ServiceBus"].ConnectionString;
            GlobalHost.DependencyResolver.UseServiceBus(connectionString, "NotificationsHub");
            app.MapSignalR();
        }
    }
}