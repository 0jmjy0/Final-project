<template>
  <v-container>
    <v-card
      v-for="item in items"
      :key="item._id"
      max-width="374"
      class="mx-auto mb-10"
      @click="onClick(item)"
    >
      <v-img height="250" :src="item.path" :alt="item.title" />
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>$ {{ item.price }}</v-card-subtitle>
      <v-card-text>{{ item.user.username }}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ItemList',
  props: ['items', 'onClick'],
};
</script>

<style scoped></style>
