<template>
  <div>
    <h1>Register</h1>
    {{ error }}
    <form action="#" @submit.prevent="register">
      <div>
        <label for="name">Name</label>
        <input v-model="name" type="text" name="name" id="name" />
      </div>
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
        <label for="password">Password Confirmation</label>
        <input
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
        />
      </div>
      <div>
        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: null,
    };
  },
  methods: {
    register() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation login($input: RegisterInput!) {
              register(input: $input) {
                token
              }
            }
          `,
          variables: {
            input: {
              name: this.name,
              email: this.email,
              password: this.password,
              password_confirmation: this.password_confirmation,
            },
          },
        })
        .then((data) => {
          localStorage.setItem("apollo-token", data.data.register.token);

          window.location.href = "/me";
        })
        .catch((error) => {
          this.error = error.graphQLErrors[0].message;
        });
    },
  },
};
</script>
