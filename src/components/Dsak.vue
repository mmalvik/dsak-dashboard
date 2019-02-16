<template>
  <tbody>
    <tr :class="{ 'table-danger': istypeC, 'table-warning': istypeD }">
      <td class="xyz">
        <font-awesome-icon icon="link" size="1x"></font-awesome-icon>
      </td>
      <td>{{dsak.title}}</td>
      <td>{{shortenedPriority}}</td>
      <td>{{dsak.status}}</td>
      <td>{{dsak.customer}}</td>
      <td>{{shortenedProduct}}</td>
      <td>{{dsak.version}}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "Dsak",
  props: {
    dsak: Object
  },
  computed: {
    istypeA: function() {
      return this.dsak.priority.includes("Feil-A");
    },
    istypeB: function() {
      return this.dsak.priority.includes("Feil-B");
    },
    istypeC: function() {
      return this.dsak.priority.includes("Feil-C");
    },
    istypeD: function() {
      return this.dsak.priority.includes("Feil-D");
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
      } else if (this.dsak.priority.includes("Ønske")) {
        return "Ønske";
      } else if (this.dsak.priority.includes("Brukerstøtte")) {
        return "Brukerstøtte";
      } else {
        return this.dsak.priority;
      }
    },
    shortenedProduct: function() {
      if (this.dsak.product.includes("Arena")) {
        return "Arena";
      }
      else if (this.dsak.product.includes("EPJ/PAS")) {
        return "Classic";
      }
      else if (this.dsak.product.includes("ContextSync")) {
        return "ContextSync";
      }
      else {
        return this.dsak.product;
      }
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
  text-align: center;
}
</style>
