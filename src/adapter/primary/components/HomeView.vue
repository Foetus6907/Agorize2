<script>
export default {
  name: "HomeView",
};
</script>
<script setup lang="ts"></script>

<template>
  <q-page-container class="row flex justify-center">
    <q-card class="col-8">
      <q-card-section>
        <h5>Intervention Schedule</h5>
        <h6>Plomberie FAURE</h6>
      </q-card-section>
      <q-card-section>
        <q-btn label="Go to About" to="/" />
      </q-card-section>
    </q-card>
  </q-page-container>
</template>

<style lang="sass" scoped>
#logo
  width: 15%
</style>
