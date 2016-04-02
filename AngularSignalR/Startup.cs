using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(AngularSignalR.Startup))]
namespace AngularSignalR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}