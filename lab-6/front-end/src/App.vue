<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="footer">
      <v-container>
        <v-row>
          <v-col>
            <a
              href="https://github.com/0jmjy0/Final-project"
              class="text-h4 text-center "
              v-text="'Github'"
            ></a>
          </v-col>
          <v-col>
            <div class="text-h4 text-center " v-text="'14 Hours'"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: { Header },
};
</script>
