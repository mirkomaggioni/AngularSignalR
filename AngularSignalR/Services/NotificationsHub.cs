using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace AngularSignalR.Services
{
    public class NotificationsHub : Hub
    {
        public async Task OrderChanges()
        {
            await Clients.Others.NotifyOrderChanges();
        }
    }
}