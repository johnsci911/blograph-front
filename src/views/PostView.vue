<template>
  <div>
    <h1>This is the post page for id: {{ $route.params.id }}</h1>

    <div>
      <div v-if="$apollo.queries.post.loading">Loading...</div>
      <div v-else>
        <div v-if="post">
          <h2>{{ post.title }}</h2>
          <div>{{ post.body }}</div>
        </div>
        <div v-else>
          <h2>No post was found</h2>
        </div>
      </div>
    </div>
    <div>
      <h2>Apollo Query Component</h2>
      <ApolloQuery
        :query="
          (gql) => gql`
            query getPost($id: ID!) {
              post(id: $id) {
                title
                body
              }
            }
          `
        "
        :variables="{ id: $route.params.id }"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <div v-if="loading">Loading...</div>
          <div v-if="error">Error occured</div>
          <div v-if="data">
            <h2>{{ data.post.title }}</h2>
            <div>{{ data.post.body }}</div>
          </div>
          <div v-else>No result ...</div>
        </template>
      </ApolloQuery>
    </div>
    <div>
      <router-link :to="{ name: 'update', params: { id: $route.params.id } }">
        Update
      </router-link>
      <button @click="deletePost">Delete Post</button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "PostView",
  date() {
    return {
      loading: false,
    };
  },
  apollo: {
    post: {
      query: gql`
        query getPost($id: ID!) {
          post(id: $id) {
            title
            body
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  },
  methods: {
    deletePost() {
      this.loading = true;

      this.$apollo
        .mutate({
          mutation: gql`
            mutation deletePost($id: ID!) {
              deletePost(id: $id) {
                id
                title
                body
              }
            }
          `,
          variables: {
            id: this.$route.params.id,
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
