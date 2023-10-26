import { Meteor } from "meteor/meteor";
import { IArticle } from "/imports/types/models/Article";
import { Articles } from "/imports/models/Articles";
import { IRegisterUserReq } from "/imports/types/models/User";
import { Accounts } from "meteor/accounts-base";
import randNum from "/imports/utils/random-number";

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addArticles = (data: IArticle) => {
  console.log(`  Adding: ${data.title} (${data.text})`);
  Articles.collection.insert(data);
};

const addAccounts = (data: IRegisterUserReq) => {
  console.log(`  Adding: ${data.name} (${data.email})`);
  Accounts.createUser({
    email: data.email,
    password: data.password,
    profile: { name: data.name },
  });
};
const fillAccounts = () => {
  // Initialize the ArticlesCollection if empty.
  if (Meteor.users.find().count() === 0) {
    if (Meteor.settings.defaultData) {
      console.log("Creating default accounts ....");
      Meteor.settings.defaultData.defaultAccounts.forEach((data: any) =>
        addAccounts(data)
      );
    } else {
      console.log(
        "No default accounts found to be added and the accounts collection is empty."
      );
    }
  }
};
const fillArticles = () => {
  // Initialize the ArticlesCollection if empty.
  if (Articles.collection.find().count() === 0) {
    if (Meteor.settings.defaultData) {
      console.log("Creating default articles ....");
      const users = Meteor.users.find().fetch();
      if (users.length === 0) {
        console.log("No users found to be added articles");
        return;
      }

      Meteor.settings.defaultData.defaultArticles.forEach((data: any) =>
        addArticles({
          ...data,
          createdById: users[randNum(0, users.length - 1)]._id,
        })
      );
    } else {
      console.log(
        "No default articles found to be added and the articles collection is empty."
      );
    }
  }
};

export const fillDefaultData = () => {
  fillAccounts();
  fillArticles();
};
