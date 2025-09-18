import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ConfigState{
    device_info: any | null,
    deviceInfoLastUpdate: number | null,
}

const initialState:ConfigState={
    device_info:null,
    deviceInfoLastUpdate: null
}

const configSlice= createSlice({
    name:"configs",
    initialState,reducers:{
         setDeviceInfo: (state, action: PayloadAction<any>) => {
            state.device_info = action.payload;
            state.deviceInfoLastUpdate = Date.now();
        },
    }
})

export const {setDeviceInfo}=configSlice.actions;
export default configSlice.reducer;