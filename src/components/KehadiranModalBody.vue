<template>
  <div class="d-block text-left">
    <label for="hari-kehadiran" style="font-size: 12px">Durasi Keterlambatan</label>
    <b-form-spinbutton 
      id="hari-kehadiran" 
      name="total_kehadiran"
      v-model="dataKehadiran"
      min="1" 
      max="50"
      @change="handleInputChange($event, 'total_kehadiran', 0)"
    ></b-form-spinbutton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'kehadiran-body',
  computed:{
    ...mapGetters([
      'dataModal',
    ]),
    dataKehadiran() {
      return this.dataModal.value.kehadiran > 0 ? this.dataModal.value.kehadiran : 0;
    }
  },
  methods: {
    handleInputChange (event, target) {
      this.$store.commit('onChangeInput', {
        value: event,
        target,
      })
    }
  }
}
</script>