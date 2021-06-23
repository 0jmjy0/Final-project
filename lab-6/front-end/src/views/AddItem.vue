<template>
  <v-form>
    <v-container>
      <v-row cols="12" md="4">
        <v-text-field v-model="title" label="Title" required></v-text-field>
      </v-row>

      <v-row cols="12" md="4">
        <v-textarea
          v-model="description"
          outlined
          name="input-7-4"
          label="Description"
          value="Type detail infomation"
        ></v-textarea>
      </v-row>

      <v-row cols="12" md="4">
        <v-text-field
          v-model="price"
          label="Price"
          value="10.00"
          prefix="$"
        ></v-text-field>
      </v-row>

      <v-row cols="12" md="4">
        <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
          v-model="file"
        ></v-file-input>
      </v-row>

      <v-row cols="12" md="4" class="center">
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click.prevent="upload"
        >
          Upload
          <v-icon right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </v-row>
      <v-row v-if="errorMsg !== ''">
        <v-row>
          <div class="text-h4 text-center error" v-text="'ERROR'"></div>
          <div class="text-h5 text-center error" v-text="errorMsg"></div>
        </v-row>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '../config';
export default {
  name: 'Header',
  data() {
    return {
      title: '',
      description: '',
      price: '',
      file: null,
      errorMsg: '',
    };
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];

      this.url = URL.createObjectURL(this.file);
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('board', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('price', this.price);
        await axios.post(`${serverUrl}/api/boards`, formData);
        this.file = null;
        this.title = '';
        this.description = '';
        this.price = '';
        window.location.href = '/';
      } catch (error) {
        console.log('error : ', error);
        this.errorMsg = 'Error: ' + error.response.data.message;
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
</style>
