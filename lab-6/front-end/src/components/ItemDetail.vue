<template>
  <v-row justify="center">
    <v-dialog
      v-model="Dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="orange">
          <v-btn icon dark @click="Dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ item.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-card v-if="item.title">
            <v-img height="500" :src="item.path" :alt="item.title" />
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-subtitle>$ {{ item.price }}</v-card-subtitle>
            <v-card-text>{{ item.user.username }}</v-card-text>
            <v-card-text style="font-size: 20px; ">{{
              item.description
            }}</v-card-text>
          </v-card>
          <router-link
            v-if="item.user.username === $root.user.username"
            :to="{ name: 'EditItem', params: { id: item._id, item: item } }"
          >
            <v-btn color="blue-grey" class="ma-2 white--text">
              Edit
              <v-icon right dark>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </router-link>
        </v-list>
        <Comments :item="item" @finishedAddComment="finishedAddComment" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Comments from './Comments.vue';
export default {
  name: 'ItemDetail',
  props: ['item', 'dialog'],
  components: {
    Comments,
  },
  computed: {
    Dialog: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit('setDialog', value);
      },
    },
  },
  methods: {
    finishedAddComment() {
      this.$emit('finishedAddComment');
    },
  },
};
</script>

<style scoped></style>
