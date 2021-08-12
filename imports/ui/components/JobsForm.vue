<template>
  <form className="jobs-form" @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="Type to add new job"
      v-model="newJobs"
    />
    <button type="submit">Add Job</button>
  </form>
</template>

<script>
  import Vue from "vue";

  export default {
    data() {
      return {
        newJobs: ""
      }
    },
    methods: {
      handleSubmit(event) {
        if (this.newJobs.length === 0) return;

        Meteor.call('jobs.insert', this.newJobs.trim());

        // Clear form
        this.newJobs = "";
      }
    },
}
</script>