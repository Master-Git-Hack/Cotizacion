import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {initialState} from "../../types/storage";

export const slice = createSlice({
    name:"cotizacion",
    initialState,
    reducers:{
        setAuth(state,action:PayloadAction<any>){
            const {token,name} = action.payload;
            state.auth ={
                name,
                publicId:token
            }
        },
        logOut(state){
            state = initialState
        },
        addDataRow(state){
            state.data.push({
                quantity:1,
                concept:"",
                price:1,
                total:1
            })
            state.result.subTotal = state.data.reduce((previous:number,current:any)=>previous+current.total,0);

            const {subTotal} =state.result;
            const {tax, hasTax} = state.result.tax;
            state.result.tax.value = Number((subTotal*tax).toFixed(2));
            state.result.total = Number((subTotal+(hasTax ?state.result.tax.value:0)).toFixed(2));
        },
        removeDataRow(state){
            if(state.data.length>1){
                state.data.pop()
            }
            state.result.subTotal = state.data.reduce((previous:number,current:any)=>previous+current.total,0);

            const {subTotal} =state.result;
            const {tax, hasTax} = state.result.tax;
            state.result.tax.value = Number((subTotal*tax).toFixed(2));
            state.result.total = Number((subTotal+(hasTax ?state.result.tax.value:0)).toFixed(2));
        },
        setData(state,action){
            const {index,key,value}=action.payload;
            state.data[index][key]=value;
            state.data.map((item:any)=>{
                const {quantity,price} = item;
                item.total = Number((quantity*price).toFixed(2));
                return item
            })
            state.result.subTotal = state.data.reduce((previous:number,current:any)=>previous+current.total,0);

            const {subTotal} =state.result;
            const {tax,hasTax} = state.result.tax;
            state.result.tax.value = Number((subTotal*tax).toFixed(2));
            state.result.total = Number((subTotal+(hasTax ?state.result.tax.value:0)).toFixed(2));
            
        },setTax(state){
            const {hasTax} = state.result.tax;
            state.result.tax.hasTax = !hasTax;

            state.result.subTotal = state.data.reduce((previous:number,current:any)=>previous+current.total,0);

            const {subTotal} =state.result;
            const {tax} = state.result.tax;
            state.result.tax.value = Number((subTotal*tax).toFixed(2));
            state.result.total = Number((subTotal+(!hasTax ?state.result.tax.value:0)).toFixed(2));
        },setCustomer(state,action:PayloadAction<any>){
            const {key,value} = action.payload;
            state.customer[key] = value;
        }
    }
})
export const {setAuth,logOut,setData,addDataRow,removeDataRow,setTax,setCustomer} =slice.actions;
export const getState = (state:RootState)=>state.cotizacion;

export default slice.reducer;