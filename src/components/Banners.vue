<template>
  <div>
    <v-row>
      <v-col cols="12" sm="8" class="pr-0">
        <v-card height="250px" tile flat color="#FFAB91">
          <v-row>
            <v-col cols="12" sm="4">
              <v-btn color="red darken-4" class="withoutuppercase" small tile
                >NEW
              </v-btn>
              <h6 class="white--text1 mt-8">MOUNTAIN BIKE</h6>
              <h3 class="white--text2 mt-4">Trek Speed Concept</h3>
              <v-btn
                rounded
                color="#FFCCBC"
                dark
                elevation="4"
                class="btn-round"
              >
                More Info
              </v-btn>
            </v-col>

            <v-col cols="12" sm="8" class="mx-auto my-auto">
              <v-img
                src="bike.png"
                width="100%"
                height="100%"
                max-height="250"
                contain
                class="mt-n4"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" class="pl-0">
        <v-card height="249px" tile color="deep-purple lighten-2">
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn
                color="purple darken-4"
                dark
                class="withoutuppercase"
                small
                tile
              >
                NEW
              </v-btn>
              <h6 class="white--text1 mt-8">DOWN JACKET</h6>
              <h3 class="white--text2 mt-5">Sale Collection 2015</h3>
              <v-btn
                rounded
                color="deep-purple lighten-4"
                dark
                class="btn-round"
              >
                More Info
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-img
                src="jacket2.png"
                max-height="360"
                max-width="360"
                contain
                class="mt-n5"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.withoutuppercase {
  text-decoration: none;
  padding-left: 8px;
  margin-top: 10px;
  margin-left: 15px;
  color: white;
}
.white--text1 {
  font-size: 10px;
  font-weight: 600;
  margin-left: 15px;
  color: white;
}
.white--text2 {
  margin-left: 15px;
  font-weight: 600;
  font-size: 18px;
  color: white;
}
.btn-round {
  color: white;
  padding: 0px 40px;
  margin-left: 15px;
  margin-top: 40px;
  font-weight: 600;
}
</style>
