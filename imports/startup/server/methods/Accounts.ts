import { Meteor } from "meteor/meteor";
import { IRegisterUserReq } from "../../../types/models/User";
import { Accounts } from 'meteor/accounts-base'

export const createAcccount = ({name, email, password, confirmPassword}: IRegisterUserReq) =>{
    if(password !== confirmPassword){
        throw new Meteor.Error("Passwords doesn't match!");
    }
    const existingUser = Accounts.findUserByEmail(email);
    if(existingUser){
        throw new Meteor.Error("Email already exists!");
    }

    return Accounts.createUser({
        email,password,profile:{name}
    })
}


Meteor.methods({
    "accounts.create": createAcccount
})