import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    originalProducts: [],
    cart: [],
    categories: [],
    drawer: false,
    orders: [],
    favorites: [],
    selectedProduct: {
      id: null,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: null,
      rating: {
        rate: null,
        count: null,
      },
    },
  },
  getters: {
    countOfShoppingCart: (state) => state.cart.length,
    calcTotalPrice: (state) => {
      let total = 0;
      state.cart.forEach((product) => {
        total += product.price * product.amount;
      });
      return total.toFixed(2);
    },
  },
  mutations: {
    SET_PRODUCTS(state, { products, setOriginalProducts = false }) {
      // Проставляем amount всем продукатам, которые есть в корзине.
      state.cart.forEach((cartProduct) => {
        const product = products.find(
          (product) => product.id === cartProduct.id
        );
        if (product) Vue.set(product, "amount", cartProduct.amount);
      });

      // Проставляем isInFavorites всем продукатам, которые есть в избранных.
      state.favorites.forEach((favoriteProduct) => {
        const product = products.find(
          (product) => product.id === favoriteProduct.id
        );
        if (product)
          Vue.set(product, "isInFavorites", favoriteProduct.isInFavorites);
      });

      state.products = products;
      if (setOriginalProducts) state.originalProducts = products;
    },
    IS_LOADING(state, value) {
      state.isLoading = value;
    },
    ADD_PRODUCT(state, { product, isSelectedProduct = false }) {
      Vue.set(product, "amount", 1);
      const productCopy = _.cloneDeep(product);
      state.cart.push(productCopy);
      localStorage.setItem("cart", JSON.stringify(state.cart));

      if (!isSelectedProduct) return;
      const productInCart = state.cart.find((productInCart) => {
        return productInCart.id === product.id;
      });
      if (productInCart) state.selectedProduct = productInCart;
    },
    CHANGE_COUNTER(state, { value, productId }) {
      const product = state.products.find(
        (product) => product.id === productId
      );
      const productInCart = state.cart.find(
        (product) => product.id === productId
      );

      if (product) product.amount += value;
      if (productInCart) productInCart.amount += value;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    REMOVE_PRODUCT_FROM_CART(state, productId) {
      state.cart = state.cart.filter((product) => {
        return product.id != productId;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    FILTER_PRODUCTS_BY_PRICE(state, products) {
      selectedPrice = product.price;
    },
    MOVE_PRODUCTS_TO_ORDERS(state) {
      state.orders.push(state.cart);
      state.products.forEach((product) => (product.amount = 0));
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    ADD_PRODUCT_TO_FAVORITES(state, product) {
      const isProductInFavorites = state.favorites.find((favorite) => {
        return favorite.id === product.id;
      });
      if (!isProductInFavorites) {
        state.favorites.push(product);
        Vue.set(product, "isInFavorites", true);
      } else {
        const indexOfProductToDelete = state.favorites.findIndex(
          (favorite) => favorite.id === product.id
        );

        if (indexOfProductToDelete > -1) {
          state.favorites.splice(indexOfProductToDelete, 1);
        }
        Vue.set(product, "isInFavorites", false);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    SET_LOCAL_STORAGE(state, { cart, favorites, orders }) {
      state.cart = cart;
      state.favorites = favorites;
      state.orders = orders;
    },
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
      const productInCart = state.cart.find((productInCart) => {
        return productInCart.id === product.id;
      });
      if (productInCart) state.selectedProduct = productInCart;
    },
  },
  actions: {
    async fetchProducts({ commit, state }) {
      try {
        commit("IS_LOADING", true);
        const { data, status } = await axios.get(
          "https://fakestoreapi.com/products/"
        );
        if ([200, 201].includes(status))
          commit("SET_PRODUCTS", { products: data, setOriginalProducts: true });
      } catch (error) {
        console.log(error.response);
      }

      commit("IS_LOADING", false);
    },

    async fetchCategories({ commit, state }) {
      try {
        const { data, status } = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        if ([200, 201].includes(status)) commit("SET_CATEGORIES", data);
      } catch (error) {
        console.log(error.response);
      }
    },

    async fetchedProductsByCategorie({ commit, state }, categorie) {
      try {
        const { data, status } = await axios.get(
          `https://fakestoreapi.com/products/category/${categorie}`
        );
        if ([200, 201].includes(status))
          commit("SET_PRODUCTS", { products: data, setOriginalProducts: true });
      } catch (error) {
        console.log(error.response);
      }
    },
    async getProductById({ commit, state }, productId) {
      try {
        const { data, status } = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        if ([200, 201].includes(status)) {
          commit("SET_SELECTED_PRODUCT", data);
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    addProduct(context, { product, isSelectedProduct }) {
      context.commit("ADD_PRODUCT", { product, isSelectedProduct });
    },
    changeCounter({ commit, state }, { value, productId }) {
      let product = state.products.find((product) => product.id === productId);
      if (!product && state.selectedProduct.id === productId) {
        product = state.selectedProduct;
      }
      if (value < 0 && product?.amount === 1) {
        commit("CHANGE_COUNTER", { value, productId });
        commit("REMOVE_PRODUCT_FROM_CART", productId);
        return;
      }
      commit("CHANGE_COUNTER", { value, productId });
    },
    removeProductFromCart({ commit }, product) {
      commit("REMOVE_PRODUCT_FROM_CART", product.id);
    },
    filterProductsByPrice({ commit, state }, range) {
      const products = state.originalProducts.filter((product) => {
        return product.price <= range[1] && product.price >= range[0];
      });
      commit("SET_PRODUCTS", { products });
    },
    moveProductsToOrders({ commit }, product) {
      commit("MOVE_PRODUCTS_TO_ORDERS");
      commit("CLEAR_CART");
    },
    addProductToFavorites(context, product) {
      context.commit("ADD_PRODUCT_TO_FAVORITES", product);
    },
    initLocalStorage({ commit }) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      commit("SET_LOCAL_STORAGE", { cart, favorites, orders });
    },
  },
  modules: {},
});
