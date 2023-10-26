import { Meteor } from 'meteor/meteor';
import "/imports/startup/server/methods/Accounts";
import "/imports/startup/server/methods/Articles";

//Default Data
import "./default-data"
import defaultData from './sampledata.json'
import { fillDefaultData } from './default-data';

Meteor.startup(async () => {
  Meteor.settings.defaultData = defaultData;
  fillDefaultData();
});
