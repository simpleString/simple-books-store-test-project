<template>
  <v-container class="home">
    <v-row>
      <v-col><v-btn @click="onClickAddButton">Create book</v-btn></v-col>
      <v-col
        ><v-btn @click="onClickSortingButton('public_year')"
          >Sort By Year</v-btn
        ></v-col
      >
      <v-col
        ><v-btn @click="onClickSortingButton('authors')"
          >Sort By Author</v-btn
        ></v-col
      >
      <v-col
        ><v-btn @click="onClickSortingButton('rating')"
          >Sort By Rating</v-btn
        ></v-col
      >
    </v-row>
    <v-row class="book-group" justify="center">
      <v-spacer />
      <v-col>Recommended book</v-col>
      <v-col>{{ getRecommendedBook.name }}</v-col>
      <v-spacer />
    </v-row>
    <hr />
    <template v-if="currentGroupByValue !== 'authors'">
      <div
        class="book-group"
        v-for="type in Object.keys(groupBy).sort((a, b) => b - a)"
        :key="type"
      >
        <v-col class="my-5" v-if="currentGroupByValue === 'authors'">
          {{ getAuthorNameById(type) }}
        </v-col>
        <v-col class="my-5" v-else>{{ type }}</v-col>
        <v-card
          class="book-row mb-3"
          v-for="book in groupBy[type]"
          :key="book.id"
        >
          <BookContainer :book="book" />
        </v-card>
      </div>
    </template>
    <template v-else>
      <div class="book-group" v-for="type in Object.keys(groupBy)" :key="type">
        <v-col class="my-5" v-if="currentGroupByValue === 'authors'">
          {{ getAuthorNameById(type) }}
        </v-col>
        <v-col class="my-5" v-else>{{ type }}</v-col>
        <v-card
          class="book-row mb-3"
          v-for="book in groupBy[type]"
          :key="book.id"
        >
          <BookContainer :book="book" />
        </v-card>
      </div>
    </template>
  </v-container>
</template>

<script>
import BookContainer from "../components/BookContainer.vue";

export default {
  name: "Home",

  data() {
    return {
      currentGroupByValue: "public_year",
    };
  },

  components: {
    BookContainer,
  },

  computed: {
    books() {
      return this.$store.state.books;
    },
    groupBy() {
      return this.$store.getters.groupBy(this.currentGroupByValue);
    },
    getRecommendedBook() {
      return this.$store.getters.getRecommendedBook;
    },
    getAuthorNameById() {
      return this.$store.getters.getAuthorById;
    },
  },

  methods: {
    onClickAddButton() {
      this.$router.push({ name: "Book" });
    },
    onClickSortingButton(value) {
      this.currentGroupByValue = value;
    },
  },
};
</script>
