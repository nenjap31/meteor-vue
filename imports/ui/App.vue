<template>
  <div class="app">
    <header>
      <div className="app-bar">
        <div className="app-header">
          <h1>
            Todo List
            <span v-if="incompleteCount > 0">({{incompleteCount}})</span>
          </h1>

        </div>
      </div>
    </header>
    <div class="main">
        <template v-if="currentUser">
          <div class="user" v-on:click="logout">
            {{currentUser.username}} 🚪
          </div>
          <JobsForm />
          <div class="filter">
            <button
                v-model="hideCompleted"
                @click="toggleHideCompleted"
            >
              <span v-if="hideCompleted">Show All</span>
              <span v-else>Hide Completed Jobs</span>
            </button>
          </div>
          <div class="loading" v-if="!$subReady.jobs">Loading...</div>

          <ul class="job">
            <Jobs
              class="jobs"
              v-for="job in listjob"
              v-bind:key="job._id"
              v-bind:jobs="job"
            />
          </ul>
        </template>
        <template v-else>
          <LoginForm />
        </template>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import Jobs from "./components/Jobs.vue";
  import JobsForm from "./components/JobsForm.vue";
  import LoginForm from "./components/LoginForm.vue";
  import { JobsColl } from "../db/JobsColl";

  export default {
      components: {
        Jobs,
        JobsForm,
        LoginForm
      },
      data() {
          return {
            hideCompleted: false
          };
      },
      methods: {
          toggleHideCompleted() {
            this.hideCompleted = !this.hideCompleted;
          },
          logout() {
            Meteor.logout();
          }
      },
      meteor: {
        $subscribe: {
          'jobs': []
        },
        listjob() {
          if (!this.currentUser) {
            return [];
          }

          const hideCompletedFilter = { checked: { $ne: true } };

          const userFilter = this.currentUser ? { userId: this.currentUser._id } : {};

          const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
          return JobsColl.find(
            this.hideCompleted ? pendingOnlyFilter : userFilter,
            {
              sort: { createdAt: -1 },
            }
          ).fetch();
        },
        incompleteCount() {
          if (!this.currentUser) {
            return 0;
          } else {
            return JobsColl.find({ checked: { $ne: true }, userId: this.currentUser._id }).count();
          }
        },
        currentUser() {
          return Meteor.user();
        }
      }
};
</script>