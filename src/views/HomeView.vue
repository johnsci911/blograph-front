<template>
  <div class="home">
    <div>
      <div v-if="$apollo.queries.posts.loading">Loading...</div>
      <ul v-else>
        <li v-for="post in posts.data" :key="post.id">
          <router-link :to="{ name: 'post', params: { id: post.id } }">{{
            post.title
          }}</router-link>
        </li>
      </ul>
    </div>
    <div>
      <h2>Apollo query component</h2>
      <ApolloQuery
        :query="
          (gql) => gql`
            query {
              posts {
                data {
                  id
                  title
                }
              }
            }
          `
        "
      >
        <template v-slot="{ result: { loading, error, data } }">
          <div v-if="loading">Loading...</div>
          <div v-if="error">Error occured</div>
          <div v-if="data">
            <ul>
              <li v-for="post in data.posts.data" :key="post.id">
                <router-link :to="{ name: 'post', params: { id: post.id } }">{{
                  post.title
                }}</router-link>
              </li>
            </ul>
          </div>
          <div v-else>No result ...</div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "HomeView",
  components: {},
  apollo: {
    posts: gql`
      query {
        posts {
          data {
            id
            title
            body
          }
        }
      }
    `,
  },
};
</script>
