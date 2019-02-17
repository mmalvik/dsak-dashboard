<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-5">
    <a class="navbar-brand" href="#">d:sak Dashboard</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-4">
        <li class="nav-item dropdown active">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Velg team</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a v-for="team in teams" @click="raiseTeamChanged" class="dropdown-item" href="#"> {{ team.name }}</a>
            <a class="dropdown-item" href="#">Team rockSOLID</a>
            <a class="dropdown-item" href="#">Team Nidelven</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { EventBus } from "../main.js";
import { httpClient } from "../main.js";

export default {
  name: "Header",
  data: function() {
    return {
      // teams: ['Team rockSOLID', 'Team Nidelven']
      teams: []
    }
  },
  methods: {
    raiseTeamChanged: function() {
      EventBus.$emit("teamChanged", this);
    },
    getTeams: function() {
      let vueInstance = this;
      httpClient
        .get("/teams")
        .then(function(response) {
          vueInstance.teams = response.data;
          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  beforeMount: function() {
    let vueInstance = this;
    vueInstance.getTeams();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
