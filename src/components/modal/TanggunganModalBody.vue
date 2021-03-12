<template>
  <div class="d-block text-left">
    <b-container>
      <b-row>
        <b-col>
          <label for="ubah-nama-tanggungan" style="font-size: 12px">Nama Tanggungan</label>
          <b-form-input 
            v-model="namaTanggungan" 
            placeholder="Nama Tanggungan" 
            id="ubah-nama-tanggungan"
            autocomplete="off"
            :readonly="getIndexData !== -1"
            debounce="200"
            @update="handleInputChange($event, 'nama')">
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label for="ubah-nominal-komisi" style="font-size: 12px">Nominal Pembayaran</label>
          <b-input-group prepend="Rp" id="ubah-nominal-komisi">
            <b-form-input 
              v-if="visible === true"
              type="number" 
              v-model="nominalTanggungan" 
              :disabled="getIndexData !== -1"
              @blur="onBlurNumber"
              @change="handleInputChange($event, 'nominal')">
            </b-form-input>
            <b-form-input 
              v-if="visible === false"
              type="text" 
              :disabled="getIndexData !== -1"
              v-model="tanggunganFormated"
              @focus="onFocusText">
            </b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label for="ubah-keterangan" style="font-size: 12px">Keterangan</label>
          <b-form-input 
            v-model="keteranganTanggungan" 
            debounce="200"
            autocomplete="off"
            placeholder="Keterangan" 
            :readonly="getIndexData !== -1"
            id="ubah-keterangan"
            @update="handleInputChange($event, 'keterangan')">
          ></b-form-input>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'tanggungan-modal-body',
  data() {
    return {
      'visible' : false,
      'temp'    : '',
      'nama'    : "",
      'nominal' : 0,
      'keterangan' : ""
    }
  },
  computed: {
    ...mapGetters([
      'ACTIVE_MODAL',
      'formatNumber'
    ]),
    getIndexData () {
      return this.ACTIVE_MODAL.value.index
    },
    tanggunganFormated () {
      if (this.getIndexData === -1) {
        return this.formatNumber(this.temp);
      }
      return this.formatNumber(this.ACTIVE_MODAL.value.nominal)
    },
    namaTanggungan: {
      get() {
        if (this.getIndexData === -1) {
          return this.nama;
        }
  
        return this.ACTIVE_MODAL.value.nama
      },
      set(newValue) {
        this.nama = newValue
      }
    },
    nominalTanggungan : {
      get () {
        if (this.getIndexData === -1) {
          return this.nominal;
        }

        return this.ACTIVE_MODAL.value.nominal
      },
      set(newValue) {
        this.nominal = newValue
      }
    },
    keteranganTanggungan : {
      get() {
        if (this.getIndexData === -1) {
          return this.keterangan;
        }
  
        return this.ACTIVE_MODAL.value.keterangan ? this.ACTIVE_MODAL.value.keterangan : " "
      },
      set(newValue) {
        if (this.getIndexData === -1) {
          this.keterangan = newValue;
        }
      }
    }
  },
  methods: {
    ...mapActions({
      tambahTanggungan: 'tambahTanggungan',
    }),
    handleInputChange (event, target) {
      if (this.getIndexData === -1) {
        this[target] = event;
      }
    },
    onBlurNumber() {
      this.visible = false;
      this.temp = this.nominalTanggungan;
      this.nominal = this.formatNumber(this.temp)
    },
    onFocusText() {
      this.visible = true;
      this.nominal = this.temp;
    },
    handleSimpan() {
      if (this.nama && this.temp > 0) {
        this.tambahTanggungan({
          nama      : this.nama,
          nominal   : this.temp,
          keterangan: this.keterangan
        })
      }
    }
  }
}
</script>

<style>
.form-control:read-only {
  background-color: initial;
}
</style>