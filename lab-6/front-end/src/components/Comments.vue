<template>
  <div>
    <v-card
      class="comment-list"
      v-for="comment in item.comments"
      :key="comment._id"
      @click="setSelectedCommentId(comment._id)"
    >
      <v-text-field
        v-if="editting && selectedCommentId === comment._id"
        v-model="editComment"
      >
      </v-text-field>
      <v-card-title v-else>- {{ comment.comment }}</v-card-title>
      <div class="wrapper">
        <div class="username">By {{ comment.user.username }}</div>
        <div class="time">({{ formatDate(comment.created) }})</div>
      </div>
      <v-row v-if="comment.user.username === $root.user.username">
        <v-col class="center">
          <v-btn v-if="!editting" icon color="green" @click="editStart">
            Edit
            <v-icon>mdi-update</v-icon>
          </v-btn>
          <v-btn v-else icon color="blue" @click.prevent="uploadComment">
            upload
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
        <v-col class="center">
          <v-btn @click.prevent="deleteComment" icon color="red">
            Delete
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-footer class="footer">
      <v-container>
        <v-row class="row">
          <v-text-field
            label="Add comment"
            hide-details="auto"
            v-model="typedComment"
            width="80%"
          />
          <v-btn @click="addComment">submit</v-btn>
        </v-row>
      </v-container>
      <v-row v-if="errorMsg !== ''">
        <v-col>
          <div class="text-h4 text-center error" v-text="'ERROR'"></div>
          <div class="text-h5 text-center error" v-text="errorMsg"></div>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '../config';
import moment from 'moment';
export default {
  name: 'Comments',
  props: ['item'],
  data() {
    return {
      typedComment: '',
      errorMsg: '',
      selectedCommentId: '',
      editting: false,
      editComment: '',
    };
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else return moment(date).format('d MMMM YYYY');
    },
    setSelectedCommentId(value) {
      this.editComment = '';
      this.selectedCommentId = value;
    },
    async addComment() {
      await axios.post(`${serverUrl}/api/comments`, {
        comment: this.typedComment,
        user: this.$root.$data.user,
        board: this.item,
      });
      this.$emit('finishedAddComment');
      this.typedComment = '';
    },
    async uploadComment() {
      await axios.put(`${serverUrl}/api/comments`, {
        id: this.selectedCommentId,
        comment: this.editComment,
      });
      this.$emit('finishedAddComment');
      this.typedComment = '';
      this.editting = false;
    },
    async deleteComment() {
      await axios.delete(
        `${serverUrl}/api/comments/${this.selectedCommentId}`,
        {
          comment: this.typedComment,
          user: this.$root.$data.user,
          board: this.item,
        }
      );
      this.$emit('finishedAddComment');
      this.typedComment = '';
    },
    editStart() {
      this.editting = true;
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
}

.comment-list {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
}

.comment-list > .wrapper {
  display: flex;
  justify-content: space-between;
}

.center {
  display: flex;
  justify-content: center;
}
/* .add-comments {
  display: flex;
}

.add-comments > .explain {
  font-size: 34px;
  margin-right: 10px;
}

.add-comments > input {
  height: 34px;
}
.add-comments > button {
  height: 40px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 20px;
  margin-bottom: 10px;
}

.comment-list > .wrapper {
  display: flex;
}

.comment-list > .comment {
  font-size: 28px;
}

.comment-list > .wrapper > .username {
  font-size: 20px;
  margin-right: 20px;
}

.comment-list > .wrapper > .time {
  font-size: 20px;
} */
</style>
