import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EventsState{
    userInterests:any[] | null,
    topBarContent:any | null,
    catalog:any[] | null,
    videoHome:any[] | null,
    musicHome:any[] | null,
    partners:any[] | null
}

const initialState:EventsState = {
    userInterests: [],
    topBarContent: {},
    catalog:[],
    videoHome:[],
    musicHome:[],
    partners:[]
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
             state.videoHome=action.payload
        },
        setMusicHome:(state,action: PayloadAction<any>)=>{
             state.musicHome=action.payload
        },
        setPartners:(state,action: PayloadAction<any>)=>{
             state.partners=action.payload
        }
    }
})

export const {
    setUserInterests,
    setTopBarContent,
    setCatalog,
    setVideoHome,
    setMusicHome,
    setPartners
}=catalogSlice.actions;

export default catalogSlice.reducer;