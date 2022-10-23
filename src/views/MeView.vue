<template>
  <div>
    <h1>My info</h1>
    {{ error }}
    <div v-if="me">
      <div>{{ me.name }}</div>
      <div>{{ me.email }}</div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "MeView",
  data() {
    return {
      error: null,
    };
  },
  apollo: {
    me: {
      query: gql`
        query {
          me {
            name
            email
          }
        }
      `,
      error(error) {
        this.error = error.message;
      },
    },
  },
};
</script>
