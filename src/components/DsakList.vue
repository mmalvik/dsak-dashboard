<template>
  <div>
    <v-flex xs12 sm6>
      <v-text-field
        width="200"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-flex>

    <v-data-table
      :headers="headers"
      :items="saker"
      :search="search"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <dsak :dsak="props.item"></dsak>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Dsak from "./Dsak.vue";
import { EventBus } from "../main.js";
import { httpClient } from "../main.js";

export default {
  name: "DsakList",
  components: {
    Dsak
  },
  data: function() {
    return {
      search: "",
      headers: [
        { text: "", value: "" },
        { text: "Tittel", value: "title" },
        { text: "Prioritet", value: "priority" },
        { text: "Status", value: "status" },
        { text: "Kunde", value: "customer" },
        { text: "Produkt", value: "product" },
        { text: "Versjon", value: "version" }
      ],
      saker: [],
    };
  },
  methods: {
    getDsaker: function() {
      let vueInstance = this;
      httpClient
        .get("/teams/Team%20Musk")
        .then(function(response) {
          vueInstance.saker = response.data;
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    onTeamChanged: function() {
      this.getDsaker();
    }
  },
  beforeMount: function() {
    let vueInstance = this;
    EventBus.$on("teamChanged", function(payLoad) {
      vueInstance.onTeamChanged();
    });
  },
  mounted: function() {
    let vueInstance = this;
    // vueInstance.getDsaker();
    vueInstance.getTeams();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
