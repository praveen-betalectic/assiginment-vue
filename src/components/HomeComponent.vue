<template>
  <div>
    <h1 class="text-xl font-bold">Wellcome to Favorate NPM Packages</h1>
    <button
      v-if="favPackages.length"
      class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-5"
      @click="pushRoute"
    >
      Add Fav
    </button>

    <div
      v-if="!favPackages.length"
      class="flex flex-col items-center justify-center border-2 border-slate-400 h-72 p-2 mt-16"
    >
      <h2 class="text-center">You don't have any favs yet. Please add.</h2>
      <button
        class="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-5"
        @click="pushRoute"
      >
        Add Fav
      </button>
    </div>

    <div class="flex flex-col" v-else>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Package
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(fav, index) in favPackages"
                  :key="index"
                  class="border-b"
                >
                  <td
                    class="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    {{ fav.package.name }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                      @click="deletePackage(index)"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        favPackages: [],
      };
    },
    mounted() {
      this.getPackages();
    },
    methods: {
      getPackages() {
        this.favPackages = JSON.parse(localStorage.getItem("favPackages"));
      },
      pushRoute() {
        this.$router.push("add-fav-package");
      },
      deletePackage(index) {
        console.log(index);
        if (index > -1) {
          this.favPackages.splice(index, 1);
        }
        localStorage.setItem("favPackages", JSON.stringify(this.favPackages));
        console.log(this.favPackages);
      },
    },
  };
</script>
