import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EventsState{
    userInterests:any[] | null,
    topBarContent:any | null,
    catalog:any[] | null,
    videoHome:any[] | null
}

const initialState:EventsState = {
    userInterests: [],
    topBarContent: {},
    catalog:[],
    videoHome:[]
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
        },
        setCatalog:(state,action: PayloadAction<any>)=>{
             state.catalog=action.payload
        },
        setVideoHome:(state,action: PayloadAction<any>)=>{
             state.catalog=action.payload
        },
        setMusicHome:(state,action: PayloadAction<any>)=>{
             state.catalog=action.payload
        }
    }
})

export const {
    setUserInterests,
    setTopBarContent,
    setCatalog,
    setVideoHome,
    setMusicHome
}=catalogSlice.actions;

export default catalogSlice.reducer;