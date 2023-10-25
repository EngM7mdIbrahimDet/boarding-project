export interface ILoginUserReq {
    email: string;
    password: string;
}
export interface IRegisterUserReq {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
