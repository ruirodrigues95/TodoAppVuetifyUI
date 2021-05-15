<template>
  <v-form ref="form" :value="valid" lazy-validation>
    {{ message }}
    <v-text-field v-model="username" label="Username" required></v-text-field>

    <v-text-field v-model="password" type="password" label="Password" required></v-text-field>

    <v-text-field v-model="confirmPassword" type="password" label="Confirm Password" required></v-text-field>


    <v-btn :disabled="!valid" color="success" class="mr-4" @click="register"> Register </v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      message: "",
    };
  },
  computed: {
    valid() {
      return (
        this.username != "" &&
        this.password != "" &&
        this.password === this.confirmPassword
      );
    },
  },
  methods: {
    register() {
      if(this.valid) {
        this.$store
          .dispatch("auth/register", {
            username: this.username,
            password: this.password,
          })
          .then(
            () => {
              this.$emit('registered')
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
      }
    }
  }
};
</script>