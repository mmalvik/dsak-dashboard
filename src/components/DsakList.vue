<template>
  <v-container fluid>
    <v-layout row wrap mx-1 justify-space-between>
      <v-flex xs12 sm4 mr-5>
        <v-select
          :items="teams"
          v-model="selectedTeam"
          @change="onTeamChanged"
          item-text="name"
          label="Velg team"
          error="selectTeamError"
          error-messages="selectTeamErrorMessages"
        ></v-select>
        <v-card v-if="error" red class="pa-1">
          <v-card-title>
            Feil
          </v-card-title>
          <v-card-text class="text-left">
            Kunne ikke laste data fra server
          </v-card-text>
        </v-card>
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

      <v-flex mt-2>
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
        { text: "", value: "" },
        { text: "Tittel", value: "title" },
        { text: "Prioritet", value: "priority" },
        { text: "Status", value: "status" },
        { text: "Kunde", value: "customer" },
        { text: "Produkt", value: "product" },
        { text: "Versjon", value: "version" }
      ],
      teams: [],
      saker: [],
      selectTeamError: false,
      selectTeamErrorMessages: ""

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
          // handle error
          selectTeamError = true;
          selectTeamErrorMessages = 'Kunne ikke laste team';
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
      // error = true;
      this.getDsaker();
    }
  },
  beforeMount: function() {
    let vueInstance = this;
    vueInstance.selectTeamError = false;
    vueInstance.selectTeamErrorMessages = []
    vueInstance.getTeams();
    console.log('beforeMount');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
