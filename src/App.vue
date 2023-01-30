<template>
  <v-app>
    <Navbar
      class="index"
      @openCart="$store.state.drawer = !$store.state.drawer"
    />
    <!-- <router-view /> -->
    <v-main>
      <router-view />
    </v-main>
    <Popupcart @updateDrawer="updateDrawer" />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Popupcart from "@/components/Popupcart.vue";
export default {
  name: "App",
  components: { Navbar, Popupcart },
  data() {
    return {};
  },
  methods: {
    updateDrawer(value) {
      this.$store.state.drawer = value;
    },
  },
};
</script>

<style>
@import "@/assets/reset.css";
</style>
