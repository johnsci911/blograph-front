<template>
  <div class="home">
    <div>
      <h1>Posts</h1>
      <div v-if="$apollo.queries.posts.loading">Loading...</div>
      <ul v-else>
        <li v-for="post in posts.data" :key="post.id">
          <router-link :to="{ name: 'post', params: { id: post.id } }">{{
            post.title
          }}</router-link>
        </li>
      </ul>
      <div v-if="posts">
        <div>{{ posts.paginatorInfo.total }} total results</div>
        <router-link
          :to="`/?page=${posts.paginatorInfo.currentPage - 1}`"
          v-if="posts.paginatorInfo.currentPage != 1"
        >
          Previous
        </router-link>
        <router-link
          :to="`/?page=${posts.paginatorInfo.currentPage + 1}`"
          v-if="posts.paginatorInfo.hasMorePages"
        >
          Next
        </router-link>
        <div>
          Page {{ posts.paginatorInfo.currentPage }} of
          {{ posts.paginatorInfo.lastPage }}
        </div>
      </div>
    </div>
    <!--
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
     -->
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "HomeView",
  components: {},
  apollo: {
    posts: {
      query: gql`
        query getPosts($page: Int!) {
          posts(page: $page) {
            paginatorInfo {
              currentPage
              lastPage
              total
              hasMorePages
            }
            data {
              id
              title
              body
            }
          }
        }
      `,
      variables() {
        return {
          page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        };
      },
    },
  },
};
</script>
