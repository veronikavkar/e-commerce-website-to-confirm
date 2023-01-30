<template>
  <div>
    <v-card>
      <v-list class="pt-0 pb-0">
        <v-list-group :value="true">
          <template v-slot:activator>
            <v-list-item-title class="filter">CATEGORIES </v-list-item-title>
          </template>

          <v-spacer></v-spacer>
          <v-list-item-group active-class="bg-active">
            <v-list-item
              v-for="(categorie, index) in $store.state.categories"
              :key="index"
              class="px-4"
              link
              @click="selectCategorie(categorie)"
            >
              <v-list-item-title class="filter_name">{{
                categorie.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
              }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selectedCategorie: "",
      range: [0, 1500],
    };
  },
  methods: {
    ...mapActions(["fetchedProductsByCategorie"]),
    selectCategorie(categorie) {
      this.range = [0, 1500];
      this.selectedCategorie = categorie;
      this.fetchedProductsByCategorie(categorie);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  color: #c62828;
  font-weight: 600;
  &_name {
    font-size: 13px;
    font-weight: 500;
    color: #616161;
  }
}
.bg-active {
  background-color: #ffebee;
  color: white !important;
}
</style>
