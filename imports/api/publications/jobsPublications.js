import { Meteor } from 'meteor/meteor';
import { JobsColl } from '/imports/db/JobsColl';

Meteor.publish('jobs', function publishJobs() {
  return JobsColl.find({ userId: this.userId });
});