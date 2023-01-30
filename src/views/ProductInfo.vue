<template>
  <div class="container">
    <div class="product">
      <div>
        <img class="product__image" :src="product.image" alt="" />
      </div>
      <div class="product__info">
        <h1 class="product__title">{{ product.title }}</h1>
        <p class="product__text">{{ product.description }}</p>

        <v-divider></v-divider>
        <div>
          <v-rating
            class="mt-5 mb-5"
            v-model="product.rating.rate"
            color="yellow darken-3"
            background-color="yellow darken-3"
            empty-icon="$ratingEmpty"
            half-increments
            readonly
          ></v-rating>

          <div class="product__bottom">
            <p class="product__bottom__price">
              ${{ product.price.toFixed(2) }}
            </p>
            <div
              class="product__bottom__counter"
              v-if="product.amount && product.amount !== 0"
            >
              <button
                class="counter__btn"
                @click.stop="changeCounterOfProduct(-1, product.id)"
                type="button"
                name="button"
                v-text="'-'"
              />
              <span>{{ product.amount }}</span>
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
              class="mt-5"
              width="200"
              color="white"
              @click.stop="addProductToCart(product)"
            >
              <v-icon color="red accent-1">mdi-cart-outline</v-icon>
              <span
                :style="{
                  color: '#FF8A80',
                  fontWeight: '700',
                }"
                >Buy</span
              >
            </v-btn>

            <v-btn
              class="mt-5"
              width="200"
              :color="product.isInFavorites ? 'red' : 'white'"
              @click.stop="addToFavorites(product)"
            >
              <v-icon :color="product.isInFavorites ? 'white' : 'red accent-1'"
                >mdi-heart-outline</v-icon
              >
              <h4 class="product__bottom__btn">Add To Favorite</h4>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      clicked: false,
    };
  },
  name: "ProductInfo",

  computed: {
    product() {
      return this.$store.state.selectedProduct;
    },
  },
  async mounted() {
    await this.$store.dispatch("getProductById", this.$route.params.id);
  },
  methods: {
    ...mapActions(["addProduct", "changeCounter", "addProductToFavorites"]),
    addProductToCart(product) {
      this.addProduct({ product, isSelectedProduct: true });
    },
    changeCounterOfProduct(value, productId) {
      this.changeCounter({ value, productId });
    },
    addToFavorites(product) {
      this.addProductToFavorites(product);
      this.clicked = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
.product {
  display: flex;
  align-items: center;
  &__image {
    width: 100%;
    max-height: 550px;
  }
  &__info {
    margin-left: 40px;
  }
  &__title {
    font-size: 24px;
    font-weight: 600;
    color: #ff8a80;
    padding-bottom: 10px;
  }
  &__text {
    width: 600px;
    font-size: 16px;
    color: #757575;
  }

  &__bottom {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    &__price {
      color: #ff8a80;
      font-weight: 600;
      font-size: 20px;
    }
    &__btn {
      color: #ff8a80;
      font-weight: 600;
    }
    &__btn:active {
      color: white;
    }
    &__counter {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;
      width: 100%;
      max-width: 150px;
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
  }
}
</style>
