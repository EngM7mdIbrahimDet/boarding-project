import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export default function useCurrentUser(){
    const { currentUser } = useTracker(() => {
        return {
          currentUser: Meteor.user()?.username ?? null,
        };
      });
    return currentUser;
}