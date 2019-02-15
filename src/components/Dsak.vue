<template>
  <!-- <div class="card" style="width: 20rem;">
    <div class="card-body">
      <h5 class="card-title">{{dask.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p
        class="card-text"
      >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div> -->

  <div>
    <h4>{{dsak.title}}</h4>
    <p>Prioritet: {{dsak.priority}} </p>
    <p>Status: {{dsak.status}} </p>
    <p>Kategori: {{dsak.category}} </p>
    <p>Customer: {{dsak.customer}} </p>
    <p>Produkt: {{dsak.product}} </p>
    <p>Versjon: {{dsak.version}} </p>
    <p>Produkt: {{dsak.product}} </p>
    
  </div>
</template>

<script>
export default {
  name: "Dsak",
  props: {
    dsak: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.red {
  background-color: lightcoral;
}
</style>
