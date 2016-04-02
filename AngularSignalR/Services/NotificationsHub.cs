using System;
using Microsoft.AspNet.SignalR;

namespace AngularSignalR.Services
{
    public class NotificationsHub : Hub
    {
        public void OrderChanges()
        {
            Clients.Others.NotifyOrderChanges();
        }
    }
}