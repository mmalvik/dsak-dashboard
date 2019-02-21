<template>
  <v-container fluid>
    <v-layout row wrap mx-1 justify-space-between>
      <v-flex xs12 sm4 mr-5>
        <v-select
          :items="teams"
          :error-messages="selectTeamErrorMessages"
          v-model="selectedTeam"
          @change="onTeamChanged"
          item-text="name"
          label="Velg team"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Filtrer i saker"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>

      <v-flex xs12 mt-2>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Dsak from "./Dsak.vue";
import { httpClient } from "../main.js";

export default {
  name: "DsakList",
  components: {
    Dsak
  },
  data: function() {
    return {
      search: "",
      selectedTeam: null,
      headers: [
        { text: "" },
        { text: "Tittel", value: "title", sortable: true },
        { text: "Prioritet", value: "priority", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Kunde", value: "customer", sortable: false },
        { text: "Produkt", value: "product", sortable: false },
        { text: "Versjon", value: "version", sortable: false },
        { text: "Sist endret", value: "lastChanged", sortable: false }
      ],
      teams: [],
      saker: [],
      selectTeamErrorMessages: []
    };
  },
  methods: {
    getTeams: function() {
      let vueInstance = this;
      httpClient
        .get("/teams")
        .then(function(response) {
          let x = this;
          vueInstance.teams = response.data;
          console.log(response);
        })
        .catch(function(error) {
          vueInstance.selectTeamErrorMessages.push("Kunne ikke laste team");
          console.log(error);
        });
    },
    getDsaker: function() {
      let vueInstance = this;
      httpClient
        .get("/teams/" + vueInstance.selectedTeam)
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
    vueInstance.selectTeamErrorMessages = [];
    vueInstance.getTeams();
    console.log("beforeMount");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
