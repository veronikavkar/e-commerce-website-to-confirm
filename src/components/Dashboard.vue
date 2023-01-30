<template>
  <v-container class="container" fluid>
    <v-card class="card" tile flat id="scrolling-techniques-4">
      <v-row>
        <v-col cols="12" sm="12">
          <h4 class="text-center">ONLINE SHOPPING FOR YOUR LIFESTYLE</h4>
        </v-col>
      </v-row>
    </v-card>
    <v-card tile class="mx-16 mt-n10 card1" color="white">
      <Banners />

      <v-row>
        <v-col cols="3" class="py-0 pr-o mt-0,5">
          <CategoriesFilter />
          <PriceFilter />
          <BrandFilter />
          <SizeFilter />
        </v-col>
        <v-col cols="9" class="mt-0,5">
          <v-row no-gutters>
            <ProductCart />
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 pr-0 pb-0">
          <v-toolbar flat outlined> </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 px-0 pb-0">
          <v-toolbar flat outlined>
            <v-btn icon class="mr-1">
              <v-icon color="grey">mdi-chevron-up</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 px-0 pb-0">
          <v-toolbar flat outlined class="text-center">
            <v-pagination v-model="page" :length="4"> </v-pagination>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 pl-0 pb-0">
          <v-toolbar flat outlined>
            <v-btn icon class="mr-1">
              <v-icon color="grey">mdi-chevron-down</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Banners from "@/components/Banners.vue";
import ProductCart from "./ProductCart.vue";
import CategoriesFilter from "@/components/Filters/CategoriesFilter.vue";
import PriceFilter from "@/components/Filters/PriceFilter.vue";
import BrandFilter from "@/components/Filters/BrandFilter.vue";
import SizeFilter from "@/components/Filters/SizeFilter.vue";
export default {
  components: {
    Banners,
    ProductCart,
    CategoriesFilter,
    PriceFilter,
    BrandFilter,
    SizeFilter,
  },

  data() {
    return {
      page: 1,

      loading: true,
    };
  },

  methods: {
    ...mapActions([
      "addProduct",
      "changeCounter",
      "removeProductFromCart",
      "filterProductsByPrice",
      "is_Loading",
    ]),
  },

  mounted() {
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchCategories");
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/main.sass";

.container {
  padding: 0px !important;
}
.card {
  background-color: #ff8a80;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  color: white;
  margin-top: -24px;
}

.breadcrumbs {
  justify-content: center;
  margin-top: 14px;
}

.card1 {
  z-index: 10;
}
.card2 {
  z-index: 1;
}
</style>
