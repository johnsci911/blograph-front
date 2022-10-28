<template>
  <h1>Create Post</h1>
  <div class="error">{{ error }}</div>
  <div>
    <form action="#" @submit.prevent="createPost">
      <div>
        <label for="title">Title</label>
        <input v-model="title" type="text" name="title" id="title" />
      </div>
      <div>
        <label for="body">Body</label>
        <textarea v-model="body" name="body" id="body"></textarea>
      </div>
      <div>
        <button>Create Post</button>
        <div v-if="loading">Loading...</div>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      title: "",
      body: "",
      error: null,
      loading: false,
    };
  },
  methods: {
    createPost() {
      this.loading = true;

      this.$apollo
        .mutate({
          mutation: gql`
            mutation createPostResolver($title: String!, $body: String!) {
              createPostResolver(title: $title, body: $body) {
                id
                body
              }
            }
          `,
          variables: {
            title: this.title,
            body: this.body,
          },
        })
        .then(() => {
          this.loading = false;

          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.loading = false;

          const key = Object.keys(
            error.graphQLErrors[0].extensions.validation
          )[0];
          this.error = error.graphQLErrors[0].extensions.validation[key][0];
        });
    },
  },
};
</script>

<style>
.error {
  color: red;
  margin-bottom: 12px;
}
</style>
