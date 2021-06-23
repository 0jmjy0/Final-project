<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h3 text-center" v-text="'Sign-in'"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="signinUsername"
            name="input-10-1"
            label="Username"
            counter
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="signinPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="center">
          <v-btn depressed color="primary" @click.prevent="login">
            Sign in
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h3 text-center" v-text="'Sign-up'"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="signupUsername"
            name="input-10-3"
            label="Username"
            counter
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="signupPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            name="input-10-4"
            label="Password"
            counter
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="center">
          <v-btn depressed color="orange" @click.prevent="register">
            Sign up
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="errorMsg !== ''">
        <v-col>
          <div class="text-h4 text-center error" v-text="'ERROR'"></div>
          <div class="text-h5 text-center error" v-text="errorMsg"></div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '../config';
export default {
  name: 'Signin',
  data() {
    return {
      title: '',
      show1: false,
      show2: false,
      signinUsername: '',
      signinPassword: '',
      signupUsername: '',
      signupPassword: '',
      errorMsg: '',
    };
  },
  methods: {
    async register() {
      if (!this.signupUsername || !this.signupPassword) return;
      try {
        let response = await axios.post(`${serverUrl}/api/users`, {
          username: this.signupUsername,
          password: this.signupPassword,
        });
        this.$root.$data.user = response.data.user;
        this.$router.push('/');
      } catch (error) {
        this.errorMsg = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      if (!this.signinUsername || !this.signinPassword) return;
      try {
        let response = await axios.post(`${serverUrl}/api/users/login`, {
          username: this.signinUsername,
          password: this.signinPassword,
        });
        this.$router.push('/');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorMsg = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  },
};
</script>

<style scoped>
.logo {
  background-color: white;
  border-radius: 100px;
}

.center {
  display: flex;
  justify-content: center;
}

.error {
  color: black;
}
</style>
