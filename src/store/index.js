import Vue from "vue";
import Vuex from "vuex";
import db from "../firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    booksLoaded: false,
    books: [],
    authors: [],
  },
  mutations: {
    deleteBook(state, payload) {
      state.books = state.books.filter((book) => book.id !== payload);
    },

    updateBook(state, payload) {
      state.books = state.books.map((book) => {
        if (book.id != payload.id) return book;
        return payload;
      });
    },
  },
  actions: {
    async initData({ dispatch }) {
      await dispatch("getBooks");
      await dispatch("getAuthors");
    },

    async getBooks({ state }) {
      const books = await db.collection("books").get();
      books.forEach((book) => {
        if (!state.books.some((books) => books.id === book.id)) {
          const data = {
            id: book.id,
            ...book.data(),
          };
          state.books.push(data);
        }
      });
      state.booksLoaded = true;
    },

    async getAuthors({ state }) {
      const authors = await db.collection("authors").get();
      authors.forEach((author) => {
        const data = {
          id: author.id,
          ...author.data(),
        };
        state.authors.push(data);
      });
    },

    async createBook({ dispatch }, payload) {
      const result = await db.collection("books").add(payload);
      await dispatch("getBooks");
      return result;
    },

    async deleteBook({ commit }, payload) {
      await db
        .collection("books")
        .doc(payload)
        .delete();
      commit("deleteBook", payload);
    },

    async editeBook({ commit }, payload) {
      await db
        .collection("books")
        .doc(payload.id)
        .update(payload);
      commit("updateBook", payload);
      return Promise.resolve();
    },
  },
  getters: {
    groupBy: (s) => (key) => {
      let result = {};
      s.books.forEach((item) => {
        if (key == "authors" && Array.isArray(item[key])) {
          item[key].forEach((author) => {
            if (!result[author]) {
              result[author] = [];
            }
            result[author].push(item);
          });
        } else {
          if (!result[item[key]]) {
            result[item[key]] = [];
          }
          result[item[key]].push(item);
        }
      });

      if (result[""] && key === "public_year") {
        Object.defineProperty(
          result,
          "Books without a year",
          Object.getOwnPropertyDescriptor(result, "")
        );
        delete result[""];
      }

      for (let obj in result) {
        result[obj] = result[obj].sort((a, b) => (a.name > b.name ? 1 : -1));
      }
      return result;
    },

    getRecommendedBook: (s) => {
      const filter_result = s.books.filter((book) => {
        return new Date().getFullYear() - book.public_year >= 3;
      });
      const max = Math.max.apply(
        Math,
        filter_result.map(function(o) {
          return o.rating;
        })
      );
      const resultObject = filter_result.find((book) => book.rating === max);
      return typeof resultObject === "undefined" ? "" : resultObject.name;
    },

    getAuthorById: (s) => (id) => {
      return s.authors.find((author) => author.id == id).name;
    },

    getBookById: (s) => (id) => {
      return s.books.find((book) => book.id == id);
    },
  },
});
