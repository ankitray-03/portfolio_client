import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name:"root",
    initialState:{
        loading:false,
        portFolioData:null,
        reloadData:false,
    },
    reducers:{
        ShowLoading:(state,action)=>{
            state.loading = true;
        },
        HideLoading:(state,action)=>{
            state.loading = false;
        },
        SetPortFolioData:(state,action)=>{
            state.portFolioData = action.payload;
        },
        ReloadData:(state,action)=>{
            state.reloadData = action.payload;
        }
    }
});

export default rootSlice.reducer;
export const {ShowLoading,HideLoading,SetPortFolioData,ReloadData} = rootSlice.actions;
