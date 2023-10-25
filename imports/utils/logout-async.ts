import { Meteor } from "meteor/meteor";
import handleMeteorError from "./handle-error";
function logoutAsync(): Promise<null> {
  return new Promise<null>((resolve, reject) =>
    Meteor.logout((error) => {
      if (error && error instanceof Meteor.Error) {
        handleMeteorError(error);
        reject(error);
      } else if (error) {
        console.log(error);
        const metoerError = new Meteor.Error("Something went wrong!");
        console.log(error.message);
        handleMeteorError(metoerError);
      } else {
        resolve(null);
      }
    })
  );
}
export default logoutAsync;
