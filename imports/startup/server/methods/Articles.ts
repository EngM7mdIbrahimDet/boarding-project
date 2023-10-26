import { Meteor } from "meteor/meteor";
import { Articles } from "/imports/models/Articles";

const getAllArticles = () =>{
    return Articles.collection.find({}).fetch();
}

Meteor.methods({
    "articles.getAll": getAllArticles
});