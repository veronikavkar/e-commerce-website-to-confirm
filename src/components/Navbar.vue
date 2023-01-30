<template>
  <v-app-bar
    hide-on-scroll
    absolute
    scroll-target="#scrolling-techniques-4"
    app
    color="#FF8A80"
    dark
  >
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-divider vertical class="ml-1 mr-3"></v-divider>

    <div class="shop-name">
      <h4><router-link to="/" replace>Veronika Market</router-link></h4>
    </div>
    <v-spacer></v-spacer>

    <v-divider vertical class=""></v-divider>
    <v-btn
      icon
      class="mx-1"
      @click="$router.push({ name: 'profile' }).catch((err) => {})"
    >
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
    <v-divider vertical class=""></v-divider>
    <v-btn icon class="mx-1" @click.stop="$emit('openCart')">
      <v-badge
        overlap
        color="#FF5252"
        :content="$store.getters.countOfShoppingCart"
        :value="$store.getters.countOfShoppingCart"
      >
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("initLocalStorage");
  },
};
</script>

<style lang="scss" scoped>
.shop-name {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 28px;
}
.v-application a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}
</style>
