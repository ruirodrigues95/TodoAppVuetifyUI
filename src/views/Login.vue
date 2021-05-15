<template>
  <v-card class="pb-6 mt-10">
    <v-tabs fixed-tabs background-color="indigo" dark v-model="tab">
      <v-tab> Login </v-tab>
      <v-tab> Register </v-tab>

      <v-tab-item transition="fade-transition" class="px-10 mt-6">
        <login></login>
      </v-tab-item>
      <v-tab-item transition="fade-transition" class="px-10 mt-6">
        <register @registered="changeTab"></register>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Login from "@/components/Login";
import Register from "@/components/Register";

export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    Login,
    Register,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/todos");
    }
  },
  methods: {
    changeTab() {
      this.tab = 0
    }
  }
};
</script>