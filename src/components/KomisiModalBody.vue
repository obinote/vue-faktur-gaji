<template>
  <div class="d-block text-left">
    <b-container>
      <b-row>
        <b-col>
          <label for="ubah-nama-komisi" style="font-size: 12px">Nama Komisi</label>
          <b-form-input 
            v-model="dataModal.value.nama" 
            placeholder="Nama komisi" 
            id="ubah-nama-komisi"
            @change="handleInputChange($event, 'nama')">
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label for="ubah-nominal-komisi" style="font-size: 12px">Nominal</label>
          <b-input-group prepend="Rp" id="ubah-nominal-komisi">
            <b-form-input 
              v-if="visible === true"
              type="number" 
              v-model="dataModal.value.nominal" 
              @blur="onBlurNumber"
              @change="handleInputChange($event, 'nominal')">
            </b-form-input>
            <b-form-input 
              v-if="visible === false"
              type="text" 
              v-model="numberFormat"
              @focus="onFocusText">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'komisi-modal-body',
  data() {
    return {
      'visible' : false,
      'temp'    : ''
    }
  },
  computed: {
    ...mapGetters([
      'dataModal',
    ]),
    numberFormat () {
      let gaji = this.dataModal.value.nominal

      if (gaji !== '' || gaji !== undefined || gaji !== 0 || gaji !== '0' || gaji !== null) {
          return gaji.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
          return gaji;
      }
    }
  },
  methods: {
    handleInputChange (event, target) {
      this.$store.commit('onChangeKomisi', {
        value: event,
        target: target,
        index: this.dataModal.value.index
      })
    },
    onBlurNumber() {
      this.visible = false;
      this.temp = this.dataModal.value.nominal;
      this.$store.commit('onChangeKomisi', {
        value: this.numberFormat,
        target: 'nominal',
        index: this.dataModal.value.index
      })
    },
    onFocusText() {
      this.visible = true;
      this.$store.commit('onChangeKomisi', {
        value: this.temp,
        target: 'nominal',
        index: this.dataModal.value.index
      })
    },
  }
}
</script>