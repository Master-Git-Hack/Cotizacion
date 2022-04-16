import { LoginProperties } from "./login/login";
import { StateProperties } from "./state/state";
import moment from "moment";
const date = moment()
interface CustomerProperties{ 
    [key: string]: string;
}
export interface StorageProperties{
    auth:LoginProperties;
    data:Array<StateProperties>;
    result:{
        tax:{
            hasTax:boolean;
            tax:number;
            value:number;
        },
        subTotal:number;
        total:number;
    }
    customer:CustomerProperties;
}
export const initialState:StorageProperties = {
    auth:{
        publicId: "",
        name:""
    },
    data:[{
        quantity:1,
        concept:"",
        price:1,
        total:1
    }],
    customer:{
        company:"",
        name:"",
        email:"",
        date:date.format("yyyy-MM-DD"),
        effectiveness:date.add({days:7}).format("yyyy-MM-DD"),
    },
    result:{
        tax:{
            hasTax:true,
            tax:0.16,
            value:0.16
        },
        subTotal:1,
        total:1.16
    }
}