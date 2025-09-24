import {createSlice,PayloadAction} from '@reduxjs/toolkit';

interface AuthState{
    user: any | null,
    registrationState: any | null,
    userProfiles: any[] | null,
    activeProfile: any | null,
    loading: boolean,
    isAuthenticated: boolean | null,
    error: boolean | null,
    HEData: IHEData | null,
    token: string | null,
    
}
interface IHEData {
    access_token?: string,
    expires_on?: number,
    msisdn: string
}


const initialState: AuthState = {
    user:null,
    registrationState:null,
    userProfiles:[],
    activeProfile:null,
    loading:false,
    isAuthenticated:false,
    error:null,
    HEData: null,
    token: null,
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setRegistrationState:(state,action:PayloadAction<any>)=>{
            state.registrationState=action.payload;
        },
        setUser:(state,action:PayloadAction<any>)=>{
            state.user=action.payload;
            if (action.payload) {
                state.isAuthenticated = true;
            }
        },
        setUserProfiles:(state,action:PayloadAction<any[]>)=>{
            state.userProfiles=action.payload;
        },
        setActiveProfile: (state, action: PayloadAction<any>) => {
            state.activeProfile = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setHEData: (state, action: PayloadAction<any>) => {
            const expires_on = Date.now() + (50 * 60 * 1000);
            state.HEData = {...action.payload, expires_on};
        },
        login: (state, action: PayloadAction<{ user: any, token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout:(state)=>{
            state.user=null;
            state.registrationState=null;
            state.isAuthenticated=false;
            state.userProfiles=null;
            state.activeProfile=null;
            state.loading=false;
            state.error=null;
            state.token = null;
        }

    }
})

export const{
    setUser,
    setRegistrationState,
    setUserProfiles,
    setActiveProfile,
    setLoading,
    setToken,
    setHEData,
    logout,
    
}=authSlice.actions;
export default authSlice.reducer;