import {createSlice,PayloadAction} from '@reduxjs/toolkit';

interface AuthState{
    user: any | null,
    registrationState: any | null,
    userProfiles: any[] | null,
    activeProfile: any | null,
    loading: boolean,
    isAuthenticated: boolean | null,
    error: boolean | null,
    token: string | null,
    
}

const initialState: AuthState = {
    user:null,
    registrationState:null,
    userProfiles:[],
    activeProfile:null,
    loading:false,
    isAuthenticated:false,
    error:null,
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
    logout,
    
}=authSlice.actions;
export default authSlice.reducer;