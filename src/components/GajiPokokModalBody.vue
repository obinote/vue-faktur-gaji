<template>
  <div class="d-block text-left">
    <b-container>
      <b-row>
        <b-col class="p-1">
          <label style="font-size: 12px">Nominal</label>
        </b-col>
      </b-row>
      <b-row align-v="center">
        <b-col class="p-1">
          <b-input-group prepend="Rp">
            <b-form-input 
              v-if="visible === true"
              type="number" 
              v-model="dataModal.value.nominal" 
              @blur="onBlurNumber"
              @change="handleInputChange($event, 'gaji')">
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
          <b-input-group append="Periode">
            <b-form-input type="number" v-model="dataModal.value.periode" @change="handleInputChange($event, 'total_periode')"></b-form-input>
          </b-input-group>
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
import { mapGetters } from 'vuex'

export default {
  name: 'gaji-pokok',
  data() {
    return {
      'visible' : false,
      'temp'    : ''
    }
  },
  computed:{
    ...mapGetters([
      'dataModal',
      'formatNumber'
    ]),
    gajiFormated() {
      let gaji = this.dataModal.value.nominal

      return this.formatNumber(gaji);
    },
    countGaji(){
      let totalGaji = this.dataModal.value.nominal * this.dataModal.value.periode

      return `Rp ${this.formatNumber(totalGaji)}`
    }
  },
  methods: {
    handleInputChange (event, target) {
      this.$store.commit('onChangeInput', {
        value: event,
        target
      })
    },
    onBlurNumber() {
    	this.visible = false;
      this.temp = this.dataModal.value.nominal;
      this.$store.commit('onChangeInput', {
        value: this.formatNumber(this.dataModal.value.nominal),
        target: 'gaji',
      })
    },
    onFocusText() {
    	this.visible = true;
      this.$store.commit('onChangeInput', {
        value: this.temp,
        target: 'gaji',
      })
    },
  }
}
</script>