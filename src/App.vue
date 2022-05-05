<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { configCloud } from "src/services/cloud";
export default {
  name: "App",
  mounted() {
    configCloud();
  },
};
</script>
