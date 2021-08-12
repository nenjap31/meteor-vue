import { check } from 'meteor/check';
import { JobsColl } from '../../db/JobsColl';

Meteor.methods({
  'jobs.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    JobsColl.insert({
      text,
      createdAt: new Date,
      userId: this.userId,
    })
  },

  'jobs.remove'(jobsId) {
    check(jobsId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const jobs = JobsColl.findOne({ _id: jobsId, userId: this.userId });

    if (!jobs) {
      throw new Meteor.Error('Access denied.');
    }

    JobsColl.remove(jobsId);
  },

  'jobs.setChecked'(jobsId, checked) {
    check(jobsId, String);
    check(checked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const jobs = JobsColl.findOne({ _id: jobsId, userId: this.userId });

    if (!jobs) {
      throw new Meteor.Error('Access denied.');
    }

    JobsColl.update(jobsId, {
      $set: {
        checked
      }
    });
  }
});