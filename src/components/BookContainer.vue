<template>
  <v-row>
    <v-col>{{ book.name }}</v-col>
    <v-col><v-btn @click="editeBook(book.id)">Edit</v-btn></v-col>
    <v-col><v-btn @click="deleteBook(book.id)">Delete</v-btn></v-col>
  </v-row>
</template>

<script>
export default {
  name: "book-conrainer",

  props: ["book"],

  methods: {
    deleteBook(id) {
      this.$store.dispatch("deleteBook", id);
    },

    editeBook(id) {
      this.$router.push({ name: "Book", params: { id } });
    },
  },
};
</script>
