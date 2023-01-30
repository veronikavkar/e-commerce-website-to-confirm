<template>
  <div class="main-container">
    <div class="cards">
      <div class="cards__left">
        <CardProfile
          title="Favorites"
          icon="mdi-heart-outline"
          :additionalStyle="{
            background: `radial-gradient(circle, 
						rgba(239, 154, 154, 1) 0%,
						rgba(255, 138, 128, 1) 100%,
						rgba(14, 3, 0, 1) 100%)`,
          }"
          :products="$store.state.favorites.flat(1)"
        />

        <CardProfile
          title="My Orders"
          icon="mdi-package-variant-closed-check"
          :additionalStyle="{
            background: `radial-gradient(
							circle,
							rgba(255, 171, 145, 1) 0%,
							rgba(255, 138, 101, 1) 100%
						)`,
          }"
          :products="$store.state.orders.flat(1)"
        />
      </div>
      <div class="cards__right">
        <UserCard />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/Profile/UserCard.vue";
import CardProfile from "@/components/Profile/CardProfile.vue";
export default {
  components: {
    UserCard,
    CardProfile,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  padding: 10px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;

  &__left {
    flex-direction: column;
    min-width: 625px;
  }

  &__right {
    margin-left: 40px;
    min-width: 400px;
  }
}

@media (max-width: 1600px) {
  .cards {
    justify-content: center;
  }
}
</style>
