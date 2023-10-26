import { Meteor } from "meteor/meteor";
import handleMeteorError from "./handle-error";
import { NETWORK_DELAY } from "../constants/other";
function callAsync<Type>(methodName: string, arg: any): Promise<Type> {
  return new Promise<Type>((resolve, reject) =>
    Meteor.call(methodName, arg, (error: Meteor.Error, result: any) => {
      if (error) {
        setTimeout(() => {
          handleMeteorError(error);
          reject(error);
        }, NETWORK_DELAY);
      } else {
        setTimeout(() => {
          resolve(result);
        }, NETWORK_DELAY);
      }
    })
  );
}
export default callAsync;
