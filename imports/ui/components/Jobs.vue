<template>
  <li v-bind:class="jobsClassName" class="jobs">
    <input
      type="checkbox"
      readOnly
      v-bind:checked="!!this.jobs.checked"
    @click="toggleChecked"
  />
  <span class="text">{{ this.jobs.text }}</span>
  <button class="delete" @click="deleteThisJobs">
  ×
  </button>
</li>
</template>

<script>
  export default {
      props: ["jobs"],
      data() {
      return {};
      },
      computed: {
        jobsClassName: function() {
          return this.jobs.checked ? "checked" : "";
        }
      },
      methods: {
        toggleChecked() {
          // Set the checked property to the opposite of its current value
          Meteor.call('jobs.setChecked', this.jobs._id, !this.jobs.checked);
        },
        deleteThisJobs() {
          Meteor.call('jobs.remove', this.jobs._id);
        }
      }
};
</script>