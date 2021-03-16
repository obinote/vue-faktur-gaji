<template>
  <div class="page-wrapper flex-center">
    <b-container>
      <b-row>
        <b-col class="solid-1"></b-col>
      </b-row>
      <b-row class="page-header">
        <b-col sm="1">
          <router-link :to="{ name: 'Home' }">
            <b-button 
              variant="link" 
              class="p-0 back-btn"
              >
              <b-icon-arrow-left></b-icon-arrow-left >
            </b-button>
          </router-link>
        </b-col>
        <b-col>
          <h5 id="header-title" @click="makeToast()">Detail pembayaran</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-1"></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-container>
            <b-row>
              <b-col class="text-left">
                <p>Sub Total Gaji</p>
              </b-col>
              <b-col class="text-right">
                <h5>{{`Rp ${this.formatNumber(this.SUB_TOTAL_GAJI)}`}}</h5>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-container>
            <b-row>
              <b-col class="text-left">
                <p>Sub Total Upah</p>
              </b-col>
              <b-col class="text-right">
                <h5>{{`Rp ${this.formatNumber(this.SUB_TOTAL_UPAH)}`}}</h5>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-container>
            <b-row>
              <b-col class="text-left">
                <p>Sub Total Komisi</p>
              </b-col>
              <b-col class="text-right">
                <h5>{{`Rp ${this.formatNumber(this.SUB_TOTAL_KOMISI)}`}}</h5>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row class="gaji-kotor">
        <b-col>
          <b-container>
            <b-row>
              <b-col class="text-left">
                <p>Gaji Kotor</p>
              </b-col>
              <b-col class="text-right sub-gaji-kotor">
                <h5>{{`Rp ${this.formatNumber(this.BRUTO_GAJI)}`}}</h5>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row class="tanggungan">
        <b-col>
          <b-container>
            <b-row>
              <b-col class="text-left bayar-tanggungan">
                <p>Tanggungan</p>
              </b-col>
              <b-col class="text-right bayar-tanggungan">
                <h5>{{`(-) Rp ${this.formatNumber(this.SUB_TOTAL_TANGGUNGAN)}`}}</h5>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row class="tanggungan">
        <b-col>
          <b-container>
            <b-row>
              <b-col class="text-left netton-gaji">
                <p>Total Gaji Bersih</p>
              </b-col>
              <b-col class="text-right netton-gaji">
                <h5>{{`Rp ${this.formatNumber(this.NET_GAJI)}`}}</h5>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
        <b-col class="text-left">
          <b-form @submit="(e) => {e.preventDefault()}" id="form-pembayaran">
            <label for="input-rekening">
              Bayar dari Rekening<span class="required-icon">*</span>
            </label>
            <b-input-group class="mb-3">
              <select 
                v-model="rekening" 
                name="rekening"
                class="custom-select" 
                placeholder="Pilih Rekening Bank"
                aria-required="true"
                @change="e => onChangeInput(e.target.value, 'rekening')"
              >
                <option disabled value="">Pilih Rekening Bank</option>
                <option v-for="listBank in this.LIST_BANK" :value="listBank.value" :key="listBank.value">
                  {{`${listBank.bank} (${listBank.pemilik})` }}
                </option>
              </select>
            </b-input-group>

            <label for="tanggal-catat">
              Dicatat Pada Tanggal<span class="required-icon">*</span>
            </label>
            <b-input-group class="mb-3">
              <b-form-input
                id="tanggal-catat"
                v-model="tglFormated"
                type="text"
                readonly
                placeholder="Pilih Tanggal"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="tglSelected"
                  button-only
                  :date-format-options="{ 'year': 'numeric', 'month': '2-digit', 'day': 'numeric' }"
                  right
                  placeholder="Pilih Tanggal"
                  class="tanggal-catat"
                  aria-controls="example-input"
                  @context="onContext"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
            <label for="input-keterangan">
              Keterangan
            </label>
            <b-input-group class="mb-3">
              <b-form-input
                v-model="keterangan"
                id="input-keterangan"
                autocomplete="off"
                type="text"
                placeholder="Tambah Keterangan"
                debounce="200"
                @update="onChangeInput($event, 'keterangan')"
              ></b-form-input>
            </b-input-group>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-3">
          <b-button block variant="primary" @click="beforeSubmit()">Submit Gaji</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'DetailPembayaran',
  data() {
    return {
      'rekening' : "",
      'tglSelected'  : "",
      'tglFormated' : "",
      'keterangan'  : "",
      'errors': []
    }
  },
  mounted() {
    this.loadRekening()
  },
  computed: {
    ...mapGetters([
      'LIST_BANK',
      'BRUTO_GAJI',
      'NET_GAJI',
      'SUB_TOTAL_GAJI',
      'SUB_TOTAL_KOMISI',
      'SUB_TOTAL_TANGGUNGAN',
      'SUB_TOTAL_UPAH',
      'formatNumber',
    ]),
  },
  methods: {
    ...mapActions({
      loadRekening: 'loadRekening',
      pembayaran: 'pembayaran'
    }),
    makeToast() {
      this.$bvToast.toast(`${this.errors[0]}`, {
        title: 'Error Message',
        autoHideDelay: 3000,
        variant: 'danger',
      })
    },
    beforeSubmit() {
      this.errors = []
      if (this.rekening === "") {
        this.errors.push("Rekening harus dipilih")
      }

      if (this.tglSelected === "") {
        this.errors.push("Tanggal tidak boleh kosong")
      }

      if (this.errors.length > 0) {
        this.makeToast()
      } else {
        this.submitGaji()
      }
    },
    submitGaji () {
      let that = this;
      if (this.tglSelected && this.rekening) {
        this.pembayaran({
          rekening     : JSON.parse(this.rekening),
          tanggal_catat: this.tglSelected,
          keterangan   : this.keterangan
        }).then(response => {
          if (response.data.success) {
            this.$router.push({ name: 'CetakFaktur' })
          } else {
            this.errors = Object.values(response.data.messages)
            this.makeToast()
          }
          
        }).catch(error => {
          console.log(error)
        })
      }
    },
    onChangeInput(event, target) {
      this[target] = event
    },
    onContext(ctx) {
      this.tglSelected = ctx.selectedYMD
      this.tglFormated = ctx.selectedDate === null ? "" : ctx.selectedFormatted
    }
  }
}
</script>

<style>
@import '../assets/style/faktur-gaji.css';

.gaji-kotor, .tanggungan {
  padding-top: 10px;
}

.back-btn {
  position: absolute;
  top: 5%;
  left: 30px;
  z-index: 100;
}

.tanggal-catat button {
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.required-icon {
  color: #007bff;
}

#form-pembayaran input:read-only{
  background-color: initial;
}
</style>