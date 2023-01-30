<template>
  <div>
    <v-card flat outlined tile>
      <v-list-group :value="true" class="pt-0 pb-0">
        <template v-slot:activator>
          <v-list-item-title class="filter">PRICE </v-list-item-title>
        </template>
        <v-spacer></v-spacer>
        <v-toolbar flat class="mt-3">
          <v-text-field
            :value="range[0]"
            @change="$set(range, 0, $event)"
            placeholder="$5"
            filled
            rounded
            dense
            class="mx-2"
          ></v-text-field>
          <v-text-field
            :value="range[1]"
            @change="$set(range, 1, $event)"
            placeholder="$2000"
            filled
            rounded
            dense
            class="mx-2"
          ></v-text-field>
        </v-toolbar>
        <v-range-slider
          v-model="range"
          color="red darken-4"
          :max="maxValue"
          :min="minValue"
          @start="isSliderMoving = true"
          @end="
            isSliderMoving = false;
            onPriceChange();
          "
        ></v-range-slider>
      </v-list-group>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      minValue: 0,
      maxValue: 1500,
      range: [0, 1500],
      isSliderMoving: false,
    };
  },
  watch: {
    range: {
      handler() {
        if (this.isSliderMoving) return;
        this.onPriceChange();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["filterProductsByPrice"]),
    onPriceChange() {
      this.filterProductsByPrice(this.range);
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
.v-snack {
  z-index: 99 !important;
}
</style>
