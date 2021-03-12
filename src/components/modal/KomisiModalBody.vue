<template>
  <div class="d-block text-left">
    <b-container>
      <b-row>
        <b-col>
          <label for="ubah-nama-komisi" style="font-size: 12px">Nama Komisi</label>
          <b-form-input 
            v-model="ACTIVE_MODAL.value.nama" 
            placeholder="Nama komisi" 
            autocomplete="off"
            id="ubah-nama-komisi"
            debounce="200"
            @update="handleInputChange($event, 'nama')">
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
              autocomplete="off"
              v-model="ACTIVE_MODAL.value.nominal" 
              @blur="onBlurNumber"
              @change="handleInputChange($event, 'nominal')">
            </b-form-input>
            <b-form-input 
              v-if="visible === false"
              type="text" 
              v-model="komisiFormated"
              @focus="onFocusText">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'komisi-modal-body',
  data() {
    return {
      'visible' : false,
      'temp'    : ''
    }
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      'ACTIVE_MODAL',
      'formatNumber'
    ]),
    komisiFormated() {
      let gaji = this.ACTIVE_MODAL.value.nominal

      return this.formatNumber(gaji);
    },
  },
  methods: {
    ...mapActions({
      onChangeModalInput: 'onChangeModalInput',
    }),
    handleInputChange (event, target) {
      this.onChangeModalInput({
        value: {val : event, target},
        target: "komisi",
        index: this.ACTIVE_MODAL.value.index
      })
    },
    onBlurNumber() {
      this.visible = false;
      this.temp = this.ACTIVE_MODAL.value.nominal;
      this.onChangeModalInput({
        value: {val : this.formatNumber(this.ACTIVE_MODAL.value.nominal), target : 'nominal'},
        target: ['komisi'],
        index: this.ACTIVE_MODAL.value.index
      })
    },
    onFocusText() {
      this.visible = true;
      this.onChangeModalInput({
        value: {val : this.temp, target : 'nominal'},
        target: ['komisi'],
        index: this.ACTIVE_MODAL.value.index
      })
    },
  }
}
</script>