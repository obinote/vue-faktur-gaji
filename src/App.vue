<template>
  <div id="app">
    <b-container fluid class="text-center">
      <b-row align-h="center">
        <b-col sm="6"><router-view></router-view></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FakturGaji from './components/FakturGaji'

export default {
  name: 'App',
  components: {
    FakturGaji
  }
}
</script>