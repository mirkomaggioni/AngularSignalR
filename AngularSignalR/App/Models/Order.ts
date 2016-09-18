namespace AngularSignalRApp.Models {
    "use strict";

    export interface IOrder {
        Id: string;
        Article: string;
        Amount: number;
        Customer: string;
        CreationDate: Date;
        Notes: string;
    }
}
