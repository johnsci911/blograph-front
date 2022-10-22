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
