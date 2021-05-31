<template>
  <v-app v-if="bookLoaded">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import db from "./firebase";

export default {
  created() {
    this.$store.dispatch("initData");
    db.collection("books").onSnapshot((book) => {
      const bookInstance = book.docs[0].data();
      console.log(bookInstance);
    });
  },
  computed: {
    bookLoaded() {
      return this.$store.state.booksLoaded;
    },
  },
};
</script>

<style lang="scss">
@import url("//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
