import { Meteor } from "meteor/meteor";
import handleMeteorError from "./handle-error";
import { ILoginUserReq } from "../types/models/User";
import { NETWORK_DELAY } from "../constants/other";
function loginAsync({ email, password }: ILoginUserReq): Promise<null> {
  return new Promise<null>((resolve, reject) =>
    Meteor.loginWithPassword(email, password, (error) => {
      if (error && error instanceof Meteor.Error) {
        setTimeout(() => {
          handleMeteorError(error);
          reject(error);
        }, NETWORK_DELAY);
      } else if (error) {
        console.log(error);
        const metoerError = new Meteor.Error("Something went wrong!");
        console.log(error.message);
        handleMeteorError(metoerError);
      } else {
        setTimeout(() => {
          resolve(null);
        }, NETWORK_DELAY);
      }
    })
  );
}
export default loginAsync;
