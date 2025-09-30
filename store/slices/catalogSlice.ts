import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EventsState{
    userInterests:any[] | null,
    topBarContent:any | null
}

const initialState:EventsState = {
    userInterests: [],
    topBarContent: {}
}

const catalogSlice = createSlice({
    name:"catalog",
    initialState,
    reducers:{
        setUserInterests:(state,action: PayloadAction<any>)=>{
            state.userInterests=action.payload
        },
        setTopBarContent:(state,action: PayloadAction<any>)=>{
             state.topBarContent=action.payload
        }
    }
})

export const {
    setUserInterests,
    setTopBarContent
}=catalogSlice.actions;

export default catalogSlice.reducer;