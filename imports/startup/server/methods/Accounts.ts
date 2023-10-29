import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { IUser } from "/imports/types/models/User";
import validateObject from "/imports/utils/validate-schema";
import { AccountsSchema } from "/imports/models/Accounts";

export const createAcccount = (user: IUser) =>{
    validateObject(AccountsSchema, user, "Inavlid account object!");
    const {emails, password, confirmPassword, profile } = user;
    if(!emails){
        throw new Meteor.Error("Email is required!");
    }
    if(!emails[0].address){
        throw new Meteor.Error("Email is required!");
    }
    const email = emails[0].address;
    if(!confirmPassword){
        throw new Meteor.Error("Confirm password is required!");
    }
    if(password !== confirmPassword){
        throw new Meteor.Error("Passwords doesn't match!");
    }
    const existingUser = Accounts.findUserByEmail(email );
    if(existingUser){
        throw new Meteor.Error("Email already exists!");
    }

    return Accounts.createUser({
        email,password,profile
    })
}


Meteor.methods({
    "accounts.create": createAcccount
})