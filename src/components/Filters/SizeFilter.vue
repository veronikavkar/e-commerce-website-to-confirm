<template>
  <div>
    <v-card flat outlined>
      <v-snackbar v-model="snackbar" :multi-line="multiLine" centered>
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-list-group :value="true" class="pt-0 pb-0">
        <template v-slot:activator>
          <v-list-item-title class="filter">SIZE </v-list-item-title>
        </template>
        <v-spacer></v-spacer>
        <v-chip-group
          column
          multiple
          active-class="red darken-4 white--text"
          class="ml-2 pb-5"
        >
          <v-chip
            v-for="size in sizes"
            :key="size"
            :value="size"
            @click="snackbar = true"
            class="size"
            :style="{
              display: 'flex',
              justifyContent: 'center',
            }"
          >
            {{ size }}
          </v-chip>
        </v-chip-group>
      </v-list-group>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizes: [
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
      ],
      multiLine: true,
      snackbar: false,
      text: `This filter does not work, it's just a design element`,
    };
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
.v-chip-content {
  margin: 0 auto;
}
.v-chip.v-size--default {
  border-radius: 50px !important;
  font-size: 14px !important;
  height: 40px !important;
  width: 40px !important;
}
.v-snack {
  z-index: 99 !important;
}
</style>
