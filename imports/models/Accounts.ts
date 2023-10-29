import SimpleSchema from "simpl-schema";

export const AccountsSchema = new SimpleSchema({
  emails: Array,
  "emails.$": Object,
  "emails.$.address": String,
  "emails.$.verified": {
    type: Boolean,
    optional: true,
  },
  password: String,
  confirmPassword: {
    type: String,
    optional: true,
  },
  profile: {
    type: Object,
    optional: true,
  },
  "profile.name": String,
});
