<template>
  <v-container>
    <div v-if="$store.state.isLoading">
      <Loader />
    </div>
    <v-row v-else no-gutters>
      <v-col
        cols="12"
        sm="4"
        v-for="(product, i) in $store.state.products"
        :key="i"
        :class="product.class"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card height="300" align="center" flat outlined tile>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#ff8a80" small class="btn-small">{{
                product.price.toFixed(2)
              }}</v-btn>
            </v-card-actions>
            <v-img
              :src="product.image"
              width="175"
              height="175"
              contain
            ></v-img>

            <v-card-text class="card__title">
              <strong :class="hover ? 'red--text' : 'black--text'">{{
                product.title | limitedStr(40)
              }}</strong>
            </v-card-text>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out red lighten-5 v-card--reveal display-3 white--text"
                style="height: 100%"
                @click="openProduct(product)"
              >
                <div
                  class="counter"
                  v-if="product.amount && product.amount !== 0"
                >
                  <button
                    class="counter__btn"
                    @click.stop="changeCounterOfProduct(-1, product.id)"
                    type="button"
                    name="button"
                    v-text="'-'"
                  />
                  <span class="counter__quantity">{{ product.amount }}</span>
                  <button
                    class="counter__btn"
                    @click.stop="changeCounterOfProduct(+1, product.id)"
                    type="button"
                    name="button"
                    v-text="'+'"
                  />
                </div>
                <v-btn
                  v-else
                  rounded
                  color="white"
                  @click.stop="addProductToCart(product)"
                >
                  <v-icon color="black">mdi-cart-outline</v-icon>
                  <span
                    :style="{
                      color: 'black',
                      fontWeight: '700',
                    }"
                    >Buy</span
                  >
                </v-btn>
                <v-btn fab small color="white" class="ml-2">
                  <v-icon color="black">mdi-content-copy</v-icon>
                </v-btn>
                <v-btn
                  @click.stop="addToFavorites(product)"
                  fab
                  small
                  class="ml-2"
                  :color="product.isInFavorites ? 'red' : 'white'"
                >
                  <v-icon
                    color="black"
                    :color="product.isInFavorites ? 'white' : 'black'"
                    >mdi-heart-outline</v-icon
                  >
                </v-btn>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

import Loader from "@/components/Loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      loading: true,
      active: false,
    };
  },
  filters: {
    limitedStr(value, size) {
      if (!value) return "";
      value = value.toString();

      if (value.length <= size) {
        return value;
      }
      return value.substr(0, size) + "...";
    },
  },
  methods: {
    ...mapActions([
      "addProduct",
      "changeCounter",
      "is_Loading",
      "addProductToFavorites",
    ]),
    addProductToCart(product) {
      this.addProduct({ product });
    },
    changeCounterOfProduct(value, productId) {
      this.changeCounter({ value, productId });
    },
    addToFavorites(product) {
      this.addProductToFavorites(product);
    },
    handleClick() {
      this.active = !this.active;
    },
    openProduct(product) {
      this.$router.push(`/product/${product.id}/`);
    },
  },
  mounted() {
    this.$store.dispatch("fetchProducts");
    this.$store.dispatch("fetchCategories");
  },
};
</script>

<style lang="scss" scoped>
.btn-small {
  margin-top: 10px;
  margin-right: 10px;
  color: white;
  font-weight: 500;
}
.counter {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 40px;
  background-color: #ffffff !important;
  border-radius: 26px;
  color: black;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  &__btn {
    min-width: 40px;
    border-radius: 26px;
    border-color: #ffffff !important;
  }
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.card__title {
  font-weight: 500;
  color: #616161;
}
</style>
