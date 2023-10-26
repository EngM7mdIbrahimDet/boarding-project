import { UseMutationOptions, useMutation } from "react-query";
import { ILoginUserReq, IRegisterUserReq } from "../../types/models/User";
import { login, logout, register } from "/imports/api/requests/Accounts";

export const useLoginUser = (
  options?: UseMutationOptions<any, unknown, any, unknown>
) => {
  return useMutation<any, any, ILoginUserReq, any>(
    ["login"],
    (user) => login(user),
    {
      ...options,
    }
  );
};

export const useLogoutUser = (
  options?: UseMutationOptions<any, unknown, any, unknown>
) => {
  return useMutation<any, any, any, any>(
    ["logout"],
    () => logout(),
    {
      ...options,
    }
  );
};

export const useRegisterUser = (
  options?: UseMutationOptions<any, unknown, any, unknown>
) =>{
  return useMutation<any, any, IRegisterUserReq, any>(
    ["register"],
    (user) => register(user),
    {
      ...options,
    }
  );
}
