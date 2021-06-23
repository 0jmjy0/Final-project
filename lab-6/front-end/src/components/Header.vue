<template>
  <v-app-bar app color="orange" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Logo"
        class="logo shrink mr-2"
        contain
        :src="carrotImg"
        transition="scale-transition"
        width="40"
        height="40"
        @click="toRoot()"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      v-if="user === null && route !== '/signin'"
      target="_blank"
      text
      @click="toSignin"
    >
      <span class="mr-1">Sign-in</span>
    </v-btn>
    <div v-else-if="user !== null">
      <v-btn target="_blank" text>
        <span class="mr-1">{{ user.username }}</span>
      </v-btn>
      <v-btn target="_blank" text @click.prevent="signout">
        <span class="mr-1">LOGOUT</span>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import carrotImg from '../images/carrot.png';
import axios from 'axios';
import { serverUrl } from '../config';
export default {
  name: 'Header',
  data() {
    return {
      carrotImg,
      route: '',
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    toRoot() {
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/');
        this.route = '/';
      }
    },
    toSignin() {
      this.$router.push('/signin');
      this.route = '/signin';
    },
    async signout() {
      try {
        await axios.delete(`${serverUrl}/api/users`);
        this.$root.$data.user = null;
        window.location.href = '/';
      } catch (error) {
        console.error(error);
      }
    },
    async getUserInfo() {
      try {
        let response = await axios.get(`${serverUrl}/api/users`);
        this.$root.$data.user = response.data.user;
      } catch (e) {
        //empty
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.logo {
  background-color: white;
  border-radius: 100px;
  cursor: pointer;
}
</style>
