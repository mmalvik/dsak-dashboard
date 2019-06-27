<template>
  <v-container fluid>
    <v-layout row wrap justify-space-between mx-1>
      <v-flex xs12 sm5 md4>
        <v-select
          :items="teams"
          :error-messages="selectTeamErrorMessages"
          v-model="selectedTeam"
          @change="onTeamChanged"
          item-text="name"
          label="Velg team"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm5 md4>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Filtrer i saker"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-start mx-1 mt-4>
      <v-flex xs3 sm2 md1>
        <v-card flat :color="'red lighten-4'" max-height="100">
          <v-card-title class="pa-1 ma-1">
            <span class="font-weight-light">A-feil</span>
          </v-card-title>
          <v-card-text class="display-1 font-weight-bold pt-0">{{ aFeilCount }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 sm2 md1>
        <v-card flat :color="'amber lighten-4'" max-height="100">
          <v-card-title class="pa-1 ma-1">
            <span class="font-weight-light">B-feil</span>
          </v-card-title>
          <v-card-text class="display-1 font-weight-bold pt-0">{{ bFeilCount }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 sm2 md1>
        <v-card flat :color="'grey lighten-3'" max-height="100">
          <v-card-title class="pa-1 ma-1">
            <span class="font-weight-light">C-feil</span>
          </v-card-title>
          <v-card-text class="display-1 font-weight-bold pt-0">{{ cFeilCount }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 sm2 md1>
        <v-card flat :color="'grey lighten-4'" max-height="100">
          <v-card-title class="pa-1 ma-1">
            <span class="font-weight-light">D-feil</span>
          </v-card-title>
          <v-card-text class="display-1 font-weight-bold pt-0">{{ dFeilCount }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap mx-1>
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
          <template slot="no-data">
            <v-alert
              :value="dSakError && !isLoading"
              color="error"
              icon="warning"
              outline
            >Kunne ikke hente d-saker :-(</v-alert>
            <v-alert
              :value="!dSakError && saker.length === 0 && selectedTeam !== null && !isLoading"
              color="info"
              icon="info"
              outline
            >Det valgte teamet har ingen d-saker</v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Dsak from "./Dsak.vue";
import { httpClient } from "../main.js";
import { async } from "q";

export default {
  name: "DsakList",
  components: {
    Dsak
  },
  data: function() {
    return {
      search: "",
      selectedTeam: null,
      teams: [],
      saker: [],
      selectTeamErrorMessages: [],
      dSakError: false,
      isLoading: false,
      headers: [
        { text: "Id", value: "id", sortable: true },
        { text: "Tittel", value: "title", sortable: true },
        { text: "Prioritet", value: "priority", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Kunde", value: "customer", sortable: false },
        { text: "Produkt", value: "product", sortable: false },
        { text: "Versjon", value: "version", sortable: false },
        { text: "Sist endret", value: "lastChanged", sortable: true }
      ]
    };
  },
  computed: {
    aFeilCount: function() {
      return this.saker.filter(
        sak => sak.priority === "Feil-A - Svært alvorlige feil"
      ).length;
    },
    bFeilCount: function() {
      return this.saker.filter(
        sak => sak.priority === "Feil-B - Alvorlige feil"
      ).length;
    },
    cFeilCount: function() {
      return this.saker.filter(
        sak => sak.priority === "Feil-C - Mindre alvorlige feil"
      ).length;
    },
    dFeilCount: function() {
      return this.saker.filter(sak => sak.priority === "Feil-D - Småfeil")
        .length;
    }
  },
  methods: {
    getTeams: function() {
      let vueInstance = this;
      vueInstance.isLoading = true;
      httpClient
        .get("/teams")
        .then(function(response) {
          vueInstance.teams = response.data;
        })
        .catch(function(error) {
          vueInstance.selectTeamErrorMessages.push("Kunne ikke laste team");
        });
      vueInstance.isLoading = false;
    },
    getDsaker: async function() {
      let vueInstance = this;
      vueInstance.isLoading = true;
      vueInstance.dSakError = false;
      try {
        const response = await httpClient.get("/teams/" + vueInstance.selectedTeam);
        vueInstance.saker = response.data;
      } catch (error) {
        vueInstance.saker = [];
        vueInstance.dSakError = true;
      } finally {
        vueInstance.isLoading = false;
      }
    },
    onTeamChanged: function() {
      this.getDsaker();
    }
  },
  beforeMount: function() {
    let vueInstance = this;
    vueInstance.selectTeamErrorMessages = [];
    vueInstance.getTeams();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
