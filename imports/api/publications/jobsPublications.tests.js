import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { JobsColl } from '/imports/db/JobsColl';
import '/imports/api/methods/jobsMethod';

if (Meteor.isServer) {
  describe('Jobs', () => {
    describe('methods', () => {
      const userId = Random.id();
      let jobsId;

      beforeEach(() => {
        JobsColl.remove({});
        jobsId = JobsColl.insert({
          text: 'Test jobs',
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned jobs', () => {
        mockMethodCall('jobs.remove', jobsId, { context: { userId } });

        assert.equal(JobsColl.find().count(), 0);
      });
      it(`can't delete jobs without an user authenticated`, () => {
        const fn = () => mockMethodCall('jobs.remove', jobsId);
        assert.throw(fn, /Not authorized/);
        assert.equal(JobsColl.find().count(), 1);
      });

      it(`can't delete jobs from another owner`, () => {
        const fn = () =>
          mockMethodCall('jobs.remove', jobsId, {
            context: { userId: 'somebody-else-id' },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(JobsColl.find().count(), 1);
      });

      it('can change the status of a jobs', () => {
        const originalJobs = JobsColl.findOne(jobsId);
        mockMethodCall('jobs.setChecked', jobsId, !originalJobs.isChecked, {
          context: { userId },
        });

        const updatedJobs = JobsColl.findOne(jobsId);
        assert.notEqual(updatedJobs.checked, originalJobs.checked);
      });

      it('can insert new jobs', () => {
        const text = 'New Jobs';
        mockMethodCall('jobs.insert', text, {
          context: { userId },
        });

        const jobs = JobsColl.find({}).fetch();
        assert.equal(jobs.length, 2);
        assert.isTrue(jobs.some(jobs => jobs.text === text));
      });
    });
  });
}