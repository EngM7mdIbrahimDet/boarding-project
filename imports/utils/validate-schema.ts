import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export default function validateObject(
  schema: SimpleSchema,
  object: any,
  errorMessage: string
) {
  try {
    schema.validate(object);
  } catch (e: any) {
    console.log("Schema Validation Error:", e);
    if (e?.constructor?.name === "ClientError") {
      throw new Meteor.Error(e.details[0].message);
    } else {
      throw new Meteor.Error(errorMessage);
    }
  }
}
