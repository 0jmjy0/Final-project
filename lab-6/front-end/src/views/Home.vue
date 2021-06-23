<template>
  <div>
    <ItemList :onClick="openDialog" :items="items" />
    <ItemDetail
      :item="selectedItem"
      :dialog="dialog"
      @setDialog="setDialog"
      @finishedAddComment="finishedAddComment"
    />
    <v-btn class="mx-2 add-btn" fab dark color="orange" @click="toAddItem">
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '../config';
import ItemList from '../components/ItemList.vue';
import ItemDetail from '../components/ItemDetail.vue';
export default {
  name: 'Home',
  components: {
    ItemList,
    ItemDetail,
  },
  data() {
    return {
      items: [],
      error: '',
      dialog: false,
      selectedItem: {},
    };
  },
  created() {
    this.getPhotos();
  },
  methods: {
    setDialog(value) {
      this.dialog = value;
    },
    openDialog(selectedItem) {
      this.setDialog(true);
      this.selectedItem = selectedItem;
      this.getComments();
    },
    toAddItem() {
      this.$router.push('/additem');
    },
    async getPhotos() {
      try {
        let response = await axios.get(`${serverUrl}/api/boards/all`);
        this.items = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getComments() {
      try {
        const response = await axios.get(
          `${serverUrl}/api/comments/${this.selectedItem._id}`
        );
        this.selectedItem = {
          ...this.selectedItem,
          comments: response.data,
        };
      } catch (error) {
        this.errorMsg = error.response.data.message;
      }
    },
    finishedAddComment() {
      this.getComments();
    },
  },
};
</script>

<style scoped>
.add-btn {
  position: fixed;
  bottom: 100px;
  right: 50px;
}
</style>
