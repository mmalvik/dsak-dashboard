<template>
  <div class="red">
    <!-- <h4>{{dsak.title}}</h4>
    <p>Prioritet: {{dsak.priority}}</p>
    <p>Status: {{dsak.status}}</p>
    <p>Kategori: {{dsak.category}}</p>
    <p>Customer: {{dsak.customer}}</p>
    <p>Produkt: {{dsak.product}}</p>
    <p>Versjon: {{dsak.version}}</p>
    <p>Produkt: {{dsak.product}}</p>-->
    <!-- <div class="card mt-4">
  <div class="card-body">
    <h5 class="card-title">{{dsak.title}}</h5>
    <p class="card-text">{{dsak.category}}</p>
    <p class="card-text">{{dsak.customer}}</p>
    <p class="card-text">{{dsak.product}}</p>
    <a href="#" class="btn btn-primary">Åpne i d:sak</a>
  </div>
    </div>-->
    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" :data-target="'#index' + dsak.id"  >{{dsak.title}}</button>
          </h5>
        </div>

        <div :id="'index' + dsak.id" class="collapse " data-parent="#accordion">
          <div class="card-body">
            <p>Prioritet: {{dsak.priority}}</p>
            <p>Status: {{dsak.status}}</p>
            <p>Kategori: {{dsak.category}}</p>
            <p>Customer: {{dsak.customer}}</p>
            <p>Produkt: {{dsak.product}}</p>
            <p>Versjon: {{dsak.version}}</p>
            <p>Produkt: {{dsak.product}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dsak",
  props: {
    dsak: Object
  },
  computed: {
    istypeA: function() {
      return this.dsak.priority.includes('Feil-A')
    },
    istypeB: function() {
      return this.dsak.priority.includes('Feil-B')
    },
    istypeC: function() {
      return this.dsak.priority.includes('Feil-C')
    },
    istypeD: function() {
      return this.dsak.priority.includes('Feil-D')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red {
  background-color: lightcoral;
}

.xyz {
  min-height: 260px;
}
</style>
