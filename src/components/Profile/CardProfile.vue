<template>
  <div class="card" :style="additionalStyle">
    <div class="card__header">
      <h2 class="title">{{ title }}</h2>
      <v-icon class="icon">{{ icon }}</v-icon>
    </div>
    <div class="card__products">
      <div class="product-item">
        <div
          class="product-item__image"
          v-for="(product, i) in firstTenProducts"
          :key="i"
        >
          <img :src="product.image" alt="" />
        </div>
        <div v-if="countOfHiddenPropucts" class="product-item__background">
          <p class="product-item__text">+{{ countOfHiddenPropucts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProfile",
  props: {
    title: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "mdi-heart-outline",
    },
    additionalStyle: {
      type: Object,
      default: () => {},
    },
    products: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    firstTenProducts() {
      return this.products.slice(0, 10);
    },
    countOfHiddenPropucts() {
      const hiddenProducts = this.products.splice(10);
      if (!hiddenProducts) return 0;
      return hiddenProducts.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 20px;
  padding: 20px;
  min-height: 200px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;

  &__products {
    margin-top: 50px;
  }
  &__header {
    display: flex;
    .title {
      color: white;
    }
    .icon {
      color: white;
      font-size: 28px;
      padding-left: 10px;
    }
  }
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.01);
}

.product-item {
  display: flex;
  &__image img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ffcdd2;
  }
  div:not(:first-child) img {
    margin-left: -20px;
  }
  &__background {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: #ffffff;
    margin-left: -20px;
    text-align: center;
    position: relative;
  }
  &__text {
    font-size: 16px;
    font-weight: 500;
    color: #ff6e40;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
}
</style>
