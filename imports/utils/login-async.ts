import { Meteor } from "meteor/meteor";
import handleMeteorError from "./handle-error";
import { IUser } from "../types/models/User";
import { NETWORK_DELAY } from "../constants/other";
function loginAsync({ emails, password }: IUser): Promise<null> {
  return new Promise<null>((resolve, reject) => {
    if (!emails || emails.length === 0 || emails[0]?.address === undefined) {
      const metoerError = new Meteor.Error("Email is required!");
      console.log(metoerError.reason);
      handleMeteorError(metoerError);
      reject(metoerError);
      return;
    }
    if (!password) {
      const metoerError = new Meteor.Error("Password is required!");
      console.log(metoerError.reason);
      handleMeteorError(metoerError);
      reject(metoerError);
      return;
    }
    const email = emails[0].address;
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
    });
  });
}
export default loginAsync;
