import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { JobsColl } from '/imports/db/JobsColl';

if (Meteor.isServer) {
  describe('Jobs', () => {
    describe('methods', () => {
      const userId = Random.id();
      let jobsId;

      beforeEach(() => {
        JobsColl.remove({});
        jobsId = JobsColl.insert({
          text: 'Test Jobs',
          createdAt: new Date(),
          userId,
        });
      });
    });
  });
}