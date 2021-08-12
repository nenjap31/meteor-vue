import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { JobsColl } from '/imports/db/JobsColl';
import '/imports/api/methods/jobsMethod';
import '/imports/api/publications/jobsPublications';

const insertJobs = (jobsText, user) =>
  JobsColl.insert({
    text: jobsText,
    userId: user._id,
    checked: false,
    createdAt: new Date(),
  });
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (JobsColl.find().count() === 0) {
    [
      'First Job',
      'Second Job',
      'Third Job',
      'Fourth Job',
      'Fifth Job',
      'Sixth Job',
      'Seventh Job'
    ].forEach(jobsText => insertJobs(jobsText, user));
  }
});
