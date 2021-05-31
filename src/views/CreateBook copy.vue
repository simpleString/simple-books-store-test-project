<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="formData.name"
        :rules="rules.nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-select
        v-model="formData.authors"
        :rules="[(v) => !!v || 'Item is required', (v) => v.length > 0]"
        :items="authors"
        item-text="name"
        item-value="id"
        label="Authors"
        multiple
        chips
        persistent-hint
        required
      ></v-select>

      <v-text-field
        v-model.number="formData.public_year"
        :rules="rules.yearRules"
        label="Publication year"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model.number="formData.rating"
        label="Rating"
        :rules="rules.ratingRules"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="formData.ISBN"
        label="ISBN"
        :rules="[(v) => !v || isValidIsbn(v) || 'ISBN not valid']"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Save
      </v-btn>

      <v-btn class="mr-4" @click="leave">
        Cancel
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "create-book",
  data() {
    return {
      formData: {
        name: "",
        authors: [],
        public_year: "",
        rating: 0,
        ISBN: "",
      },
      rules: {
        nameRules: [
          (v) => !!v || "Name is required",
          (v) =>
            (v && v.length <= 100) || "Name must be less than 10 characters",
        ],
        yearRules: [(v) => !v || v > 1800 || "Value must be greater that 1800"],
        ratingRules: [
          (v) => typeof v === "number" || "Value must be number",
          (v) => (!v && v >= 0) || "Value must be greater that 0",
          (v) => (!v && v < 11) || "Value must be smaller that 11",
        ],
      },
      valid: true,
      title: "Create",
    };
  },

  computed: {
    authors() {
      return this.$store.state.authors;
    },
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const result = await this.$store.dispatch("createBook", this.formData);
        if (!result) console.log(result);
        this.$router.push({ name: "Home" });
      }
    },
    leave() {
      this.$router.push({ name: "Home" });
    },

    isValidIsbn(str) {
      var sum, weight, digit, check, i;

      str = str.replace(/[^0-9X]/gi, "");

      if (str.length != 10 && str.length != 13) {
        return false;
      }

      if (str.length == 13) {
        sum = 0;
        for (i = 0; i < 12; i++) {
          digit = parseInt(str[i]);
          if (i % 2 == 1) {
            sum += 3 * digit;
          } else {
            sum += digit;
          }
        }
        check = (10 - (sum % 10)) % 10;
        return check == str[str.length - 1];
      }

      if (str.length == 10) {
        weight = 10;
        sum = 0;
        for (i = 0; i < 9; i++) {
          digit = parseInt(str[i]);
          sum += weight * digit;
          weight--;
        }
        check = (11 - (sum % 11)) % 11;
        if (check == 10) {
          check = "X";
        }
        return check == str[str.length - 1].toUpperCase();
      }
    },
  },
};
</script>
