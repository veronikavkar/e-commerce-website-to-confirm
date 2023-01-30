<template>
  <v-navigation-drawer
    v-model="$store.state.drawer"
    absolute
    temporary
    right
    class="navigation-drawer"
    width="35%"
  >
    <v-toolbar flat outlined class="mb-10">
      <v-toolbar-title>Shopping Cart</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div v-if="!hasProduct" class="cart">
      <img class="cart__img" src="@/assets/trolley-cart.png" alt="" />
      <h4 class="cart__title">Your cart is empty</h4>
      <p class="cart__text">Looks like you haven't made your choice yet...</p>
    </div>
    <v-list two-line>
      <template>
        <v-list-item
          v-for="(product, i) in $store.state.cart"
          :key="i + 'product'"
          class="product_card"
        >
          <v-list-item-avatar rounded width="100" height="100">
            <img :src="product.image" contain />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ product.title | limitedStr(40) }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ product.category }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item>
              {{ (product.price * product.amount).toFixed(2) }}$</v-list-item
            >
            <v-list-item-subtitle>
              <div class="wrapper">
                <button
                  class="btn btn--minus"
                  @click="changeCounterOfProduct(-1, product.id)"
                  type="button"
                  name="button"
                  v-text="'-'"
                />
                <span class="quantity">{{ product.amount }}</span>
                <button
                  class="btn btn--plus"
                  @click="changeCounterOfProduct(+1, product.id)"
                  type="button"
                  name="button"
                  v-text="'+'"
                />
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="removeProduct(product)">
              <v-icon color="red lighten-4">mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
    <div class="cartCheck" v-if="hasProduct">
      <div class="summary">
        <div><strong>Summary</strong></div>
        <div class="total_price">
          <p>Total price:</p>
          <span class="text-h6">${{ calcTotalPrice }}</span>
        </div>
      </div>

      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-center">
              <v-btn
                class="button-buy"
                color="black"
                :loading="isLoading"
                :disabled="isLoading"
                @click="moveToOrders()"
              >
                BUY NOW
              </v-btn>
            </div>
          </template>

          <div v-if="!isLoading" class="pay-check">
            <div class="pay-check__top">
              <img class="pay-check__image" src="@/assets/check.png" />
              <h3 class="pay-check__title">Payment Successful!</h3>
            </div>

            <v-divider></v-divider>
            <div class="pay-check__bottom">
              <p class="pay-check__text">
                You will receive a delivery notification by phone number. Your
                purchases are in your account in the "Orders" section.
              </p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red accent-1"
                  text
                  @click="
                    dialog = false;
                    moveProductsToOrders();
                  "
                >
                  Bake to Home
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-dialog>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
      dialog: false,

      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },

  computed: {
    ...mapGetters(["countOfShoppingCart", "calcTotalPrice"]),

    hasProduct() {
      return this.countOfShoppingCart > 0;
    },
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

    formatPrice(price) {
      if (!parseInt(price)) {
        return "";
      }

      let formatPrice = parseInt(price).toLocaleString() + " $ ";

      return formatPrice;
    },
  },
  methods: {
    ...mapActions([
      "changeCounter",
      "removeProductFromCart",
      "moveProductsToOrders",
    ]),
    changeCounterOfProduct(value, productId) {
      this.changeCounter({ value, productId });
    },

    removeProduct(product) {
      this.removeProductFromCart(product);
    },
    moveToOrders() {
      this.isLoading = !this.isLoading;
      setTimeout(() => {
        this.isLoading = false;
        this.dialog = true;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-drawer {
  z-index: 100;
}
.v-toolbar__title {
  color: #ff8a80;
  font-size: 22px;
  font-weight: 600;
}
.wrapper {
  height: 30px;
  display: flex;
  color: black;
}
.quantity {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 30px;

  font-size: 16px;
  color: #43484d;
  font-weight: 300;
  border: 1px solid #e1e8ee;
}

.btn {
  border: 1px solid #e1e8ee;
  width: 30px;
  background-color: #e1e8ee;
  cursor: pointer;
}
button:focus,
input:focus {
  outline: 0;
}

.product_card .v-list--two-line .v-list-item {
  min-height: 30px;
  margin-bottom: 30px !important;
}
.v-list--two-line .v-list-item {
  min-height: 30px !important;
}
button.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.v-navigation-drawer .v-list {
  margin-bottom: 20px;
}
.cartCheck {
  margin: 20px;
  font-size: 20px !important;
}
.button-buy {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  color: white;
}
.summary {
  margin: 0 20px;
}
.total_price {
  display: flex;
  justify-content: space-between;
  color: #757575;
}
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__img {
    max-width: 100px;
    width: 100%;
  }
  &__title {
    font-weight: 600;
    padding: 15px 0px;
    color: #ff8a80;
    font-size: 20px;
  }
  &__text {
    color: #bdbdbd;
    font-size: 16px;
  }
}
.pay-check {
  background-color: white;
  display: flex;
  flex-direction: column;
  &__top {
    text-align: center;
    margin: 20px 0px;
  }
  &__image {
    width: 100%;
    max-width: 60px;
  }
  &__title {
    background: linear-gradient(90deg, rgb(0, 187, 0), rgb(115, 251, 185) 89%);
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-size: 20px;
    font-weight: 600;
    margin-top: 8px;
  }
  &__bottom {
    margin: 20px;
    text-align: center;
  }
  &__text {
    font-size: 14px;
    color: #757575;
  }
}
</style>
