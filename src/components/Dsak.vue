<template>
  <tr :class="{ 'red lighten-3': istypeA, 'amber lighten-3': istypeB }">
    <td>
      <font-awesome-icon icon="link"></font-awesome-icon>
    </td>
    <td class="text-xs-left" >{{ dsak.title }}</td>
    <td class="text-xs-left">{{ shortenedPriority }}</td>
    <td class="text-xs-left">{{ dsak.status }}</td>
    <td class="text-xs-left">{{ dsak.customer }}</td>
    <td class="text-xs-left">{{ shortenedProduct }}</td>
    <td class="text-xs-left">{{ dsak.version }}</td>
    <td class="text-xs-left">{{ date }}</td>
  </tr>
</template>

<script>
export default {
  name: "Dsak",
  props: {
    dsak: Object
  },
  computed: {
    date: function() {
      const dateOptions = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      let date = new Date(this.dsak.lastChanged);
      return date.toLocaleDateString('no-NB', dateOptions);
    },
    istypeA: function() {
      return this.dsak.priority.includes("Feil-A");
    },
    istypeB: function() {
      return this.dsak.priority.includes("Feil-B");
    },
    shortenedPriority: function() {
      if (this.dsak.priority.includes("Feil-A")) {
        return "A-feil";
      } else if (this.dsak.priority.includes("Feil-B")) {
        return "B-feil";
      } else if (this.dsak.priority.includes("Feil-C")) {
        return "C-feil";
      } else if (this.dsak.priority.includes("Feil-D")) {
        return "D-feil";
      } else if (this.dsak.priority.includes("Ønske 1")) {
        return "Ønske 1 - Ønskelig";
      } else if (this.dsak.priority.includes("Ønske 2")) {
        return "Ønske 2 - Sterkt ønskelig";
      } else if (this.dsak.priority.includes("Ønske 3")) {
        return "Ønske 3 - Meget viktig";
      } else if (this.dsak.priority.includes("Brukerstøtte")) {
        return "Brukerstøtte";
      } else {
        return this.dsak.priority;
      }
    },
    shortenedProduct: function() {
      if (this.dsak.product.includes("Arena")) {
        return "Arena";
      } else if (this.dsak.product.includes("EPJ/PAS")) {
        return "Classic";
      } else if (this.dsak.product.includes("ContextSync")) {
        return "ContextSync";
      } else {
        return this.dsak.product;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
