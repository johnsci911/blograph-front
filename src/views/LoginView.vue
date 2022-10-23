<template>
  <div>
    <h1>Login</h1>
    {{ error }}
    <form action="#" @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation login($input: LoginInput!) {
              login(input: $input) {
                token
              }
            }
          `,
          variables: {
            input: {
              email: this.email,
              password: this.password,
            },
          },
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("apollo-token", data.data.login.token);

          window.location.href = "/me";

          // this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.error = error.graphQLErrors[0].message;
        });
    },
  },
};
</script>
