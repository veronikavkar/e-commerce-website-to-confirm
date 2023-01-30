<template>
  <div>
    <v-card flat outlined tile>
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
          <v-list-item-title class="filter">BRAND</v-list-item-title>
        </template>
        <v-spacer></v-spacer>
        <v-list-item v-for="brand in brands" :key="brand.title" class="px-4">
          <v-list-item-content>
            <v-list-item-title class="filter_name">{{
              brand.title.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
            }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox
              @click="snackbar = true"
              color="primary"
              v-model="brand.state"
            ></v-checkbox>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multiLine: true,
      snackbar: false,
      text: `This filter does not work, it's just a design element`,
      brands: [
        { title: "Lifestyle", state: true },
        { title: "Running", state: false },
        { title: "Training & Gym", state: true },
        { title: "Basketball", state: false },
      ],
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
</style>
