<template>
  <div class="d-block text-left">
    <b-container>
      <b-row>
        <b-col class="p-1">
          <label for="nominal-tunjangan" style="font-size: 12px">Nominal</label>
        </b-col>
      </b-row>
      <b-row align-v="center">
        <b-col class="p-1">
          <b-input-group prepend="Rp" id="nominal-tunjangan">
            <b-form-input 
              v-if="visible === true"
              type="number" 
              v-model="ACTIVE_MODAL.value.nominal" 
              @blur="onBlurNumber"
              @change="handleInputChange($event, 'gaji_tunjangan')">
            </b-form-input>
            <b-form-input 
              v-if="visible === false"
              type="text" 
              v-model="gajiFormated"
              @focus="onFocusText">
            </b-form-input>
          
          </b-input-group>
        </b-col>
        <b-col class="p-1 text-center" sm="1">X</b-col>
        <b-col class="p-1">
          <b-col class="p-1">
            <label class="mb-0">{{`${ACTIVE_MODAL.value.kehadiran} Hari`}}</label>
          </b-col>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="dash-1"></b-col>
        <b-col class="p-1">
          <b-container>
            <b-row>
              <b-col class="p-0">Jumlah</b-col>
              <b-col class="p-0 text-right">{{countGaji}}</b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'gaji-tunjangan',
  data() {
    return {
      'visible' : false,
      'temp'    : ''
    }
  },
  computed: {
    ...mapGetters([
      'ACTIVE_MODAL',
      'formatNumber'
    ]),
    gajiFormated() {
      let gaji = this.ACTIVE_MODAL.value.nominal

      return this.formatNumber(gaji);
    },
    countGaji(){
      let totalGaji = this.ACTIVE_MODAL.value.nominal * this.ACTIVE_MODAL.value.kehadiran

      return `Rp ${this.formatNumber(totalGaji)}`
    }
  },
  methods: {
    ...mapActions({
      onChangeModalInput: 'onChangeModalInput',
    }),
    handleInputChange (event, target) {
      this.onChangeModalInput({
        value: [event],
        target: [target],
      })
    },
    onBlurNumber() {
      this.visible = false;
      this.temp = this.ACTIVE_MODAL.value.nominal;
      this.onChangeModalInput({
        value: [this.formatNumber(this.ACTIVE_MODAL.value.nominal)],
        target: ['gaji_tunjangan'],
      })
    },
    onFocusText() {
      this.visible = true;
      this.onChangeModalInput({
        value: [this.temp],
        target: ['gaji_tunjangan'],
      })
    },
  }
}
</script>