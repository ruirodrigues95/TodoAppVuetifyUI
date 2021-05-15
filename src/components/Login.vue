<template>
  <v-form ref="form" :value="valid" lazy-validation>
    {{ message }}
    <v-text-field v-model="username" label="Username" required></v-text-field>

    <v-text-field v-model="password" type="password" label="Password" required></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
      Login
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  computed: {
    valid() {
      return this.username != "" && this.password != "";
    },
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store
          .dispatch("auth/login", {
            username: this.username,
            password: this.password,
          })
          .then(
            () => {
              this.$router.push("/todos");
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
      }
    },
  },
};
</script>