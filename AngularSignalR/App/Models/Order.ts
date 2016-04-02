declare module AngularSignalRApp.Models {
    interface IOrder {
        Id: string,
        Article: string,
        Amount: number,
        Customer: string,
        CreationDate: Date,
        Notes: string
    }
}