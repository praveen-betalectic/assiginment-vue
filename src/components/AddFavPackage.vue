<template>
  <div>
    <span class="py-5" @click="backToHome"> Back</span>

    <p>Search for NPM Packages</p>
    <input
      type="text"
      id="name"
      placeholder="ReactJs"
      v-model="packageName"
      class="w-full p-1 border border-slate-400 rounded-lg mt-5"
    />

    <div
      class="p-5 h-48 max-h-48 overflow-auto my-5 border border-2 border-slate-400 rounded-lg"
    >
      <div v-for="(npmPackage, index) in allPackages" :key="index">
        <input
          type="radio"
          name="fav_package"
          :value="npmPackage.package"
          v-model="favPackage"
          class="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 focus:ring-violet-500 focus:ring-2"
        />
        <label for="html" class="ml-2 text-sm font-medium text-gray-900">{{
          npmPackage.package.name
        }}</label>
      </div>
    </div>

    <div>
      <label
        for="fav-message"
        class="form-label inline-block mb-2 text-gray-700"
        >Why is this your Favorate ?</label
      >
      <textarea
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="fav-message"
        rows="3"
        placeholder="Your message"
        v-model="favMessage"
      ></textarea>

      <button
        class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-5"
        @click="addFavPackage"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    watch: {
      packageName: function () {
        this.fetchPackage();
      },
    },
    data() {
      return {
        packageName: null,
        allPackages: null,
        favPackage: null,
        favMessage: null,
      };
    },
    methods: {
      backToHome() {
        this.$router.push("/");
      },

      fetchPackage() {
        axios
          .get(`https://api.npms.io/v2/search?q=${this.packageName}`)
          .then((response) => {
            this.allPackages = response.data.results;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      addFavPackage() {
        let finalPayload = [];
        let payload = {
          package: this.favPackage,
          message: this.favMessage,
        };
        let storedPackages = JSON.parse(localStorage.getItem("favPackages"));
        if (storedPackages) {
          finalPayload = [payload, ...storedPackages];
        } else {
          finalPayload = [payload];
        }

        localStorage.setItem("favPackages", JSON.stringify(finalPayload));
        this.backToHome();
      },
    },
  };
</script>
