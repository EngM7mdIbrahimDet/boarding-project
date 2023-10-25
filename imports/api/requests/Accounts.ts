import { ILoginUserReq, IRegisterUserReq } from "/imports/types/entities/User";
import callAsync from "/imports/utils/call-async";
import loginAsync from "/imports/utils/login-async";
import logoutAsync from "/imports/utils/logout-async";

export const login = async (user: ILoginUserReq) => {
    await loginAsync(user);
}

export const logout = async () => {
    await logoutAsync();
}

export const register = async (user: IRegisterUserReq) =>{
    await callAsync('accounts.create', user);
}