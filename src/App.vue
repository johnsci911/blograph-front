<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/me">Me</router-link> |
    <router-link to="/register">Register</router-link> |
    <a href="#" @click.prevent="logout">Logout</a>
  </nav>
  <router-view />
</template>

<script>
import gql from "graphql-tag";

export default {
  methods: {
    logout() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation {
              logout {
                message
              }
            }
          `,
        })
        .then((data) => {
          console.log(data);
          localStorage.removeItem("apollo-token");

          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

ul {
  padding-left: 0;
}

ul > li {
  list-style-type: none;
}
</style>
