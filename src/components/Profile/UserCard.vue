<template>
  <div class="card-user">
    <div class="card-user__top">
      <v-avatar class="avatar" size="100">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
      <v-btn icon class="menu-opener">
        <v-icon style="color: #ff8a80">mdi-dots-vertical</v-icon>
      </v-btn>
    </div>
    <div class="card-user__name"><h2>Albert Feynman</h2></div>
    <div class="card-user__bottom">
      <div class="card-user__data">
        <p>Phone number</p>
        <span>+9999999999</span>
        <v-btn icon class="card-user_edit btn-edit">
          <v-icon style="color: #ff8a80">mdi-pencil</v-icon>
        </v-btn>
      </div>
      <div class="card-user__data">
        <p>Email</p>
        <span>example@mail.com</span>
        <v-btn icon class="card-user_edit btn-edit">
          <v-icon style="color: #ff8a80">mdi-pencil</v-icon>
        </v-btn>
      </div>
      <div class="card-user__data">
        <p>City</p>
        <span>San Francisco</span>
        <v-btn icon class="card-user_edit btn-edit">
          <v-icon style="color: #ff8a80">mdi-pencil</v-icon>
        </v-btn>
      </div>
      <div class="card-user__data">
        <p>Country</p>
        <span>USA</span>
        <v-btn icon class="card-user_edit btn-edit">
          <v-icon style="color: #ff8a80">mdi-pencil</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-user {
  margin: 20px;
  padding: 20px;
  min-height: 200px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  &__top {
    display: flex;
    .avatar {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .menu-opener {
      margin-left: auto;
    }
  }
  &__name {
    font-weight: 700;
    font-size: 18px;
    color: #ff6e40;
    text-align: center;
    margin-top: 20px;
  }
  &__bottom {
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 400;
    padding: 10px;
    margin-top: 23px;
  }
  &__data {
    display: flex;
    padding-bottom: 8px;
    align-items: center;
    p {
      margin-bottom: 0;
    }
    span {
      color: #ff6e40;
      margin-left: auto;
    }

    .btn-edit {
      font-size: 18px;
      padding-left: 20px;
    }
  }
}
</style>
