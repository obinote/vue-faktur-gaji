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
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'kehadiran-body',
  computed:{
    ...mapGetters([
      'ACTIVE_MODAL',
    ]),
    dataKehadiran: {
      get () {
        return this.ACTIVE_MODAL.value.kehadiran > 0 ? this.ACTIVE_MODAL.value.kehadiran : 0;
      },
      set (newVal) {
        return newVal
      }
    }
  },
  methods: {
    ...mapActions({
      onChangeModalInput: 'onChangeModalInput',
    }),
    handleInputChange (event, target) {
      this.onChangeModalInput({
        value: event,
        target,
      })
    }
  }
}
</script>