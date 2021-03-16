<template>
  <div class="page-wrapper flex-center">
    <div class="header">
      <h5 id="header-title">Faktur Gaji</h5>
    </div>
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row class="text-left" align-v="start">
        <b-col sm="12" class="solid-1"></b-col>
        <!-- Pegawai  ========================================================================================== -->
        <b-col sm="12" class="pegawai-view">
          <h5>{{FAKTUR_GAJI.nama_karyawan}}</h5>
          <h6 class="text-muted mb">{{`${FAKTUR_GAJI.tanggal_awal} - ${FAKTUR_GAJI.tanggal_akhir}`}}</h6>
        </b-col>
        <b-col sm="12" class="dash-1"></b-col>
        <!-- Kehadiran  ========================================================================================== -->
        <b-col sm="12" class="kehadiran">
          <b-row class="cp-3">
            <b-col class="text-muted mb m-0">
              Masuk {{FAKTUR_GAJI.total_kehadiran > 0 ? FAKTUR_GAJI.total_kehadiran : "0"}} Hari
            </b-col>
            <b-col class="text-right">
              <b-button variant="link" class="p-0" @click="showModal('ubah-kehadiran')">Ubah Kehadiran</b-button>
            </b-col>
          </b-row>
        </b-col>
        <!-- Gaji  ========================================================================================== -->
        <b-col sm="12" class="solid-2"></b-col>
        <b-col sm="12" class="gaji">
          <h5 class="text-left cp-3">Gaji</h5>
          <b-container
            v-for="gaji in FAKTUR_GAJI.pengaturan_gaji" :key="`gaji-${gaji.id}`"
          >
            <b-row align-v="center" class="cp-1">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{gaji.nama}}
                </b-card-text>
                <b-card-text class="small text-muted">
                  {{`${formatNumber(gaji.nominal)} x ${gaji.id === 1 ? FAKTUR_GAJI.total_periode : dataKehadiran(FAKTUR_GAJI.total_kehadiran)} ${gaji.id === 1 ? "periode" : "kehadiran"}`}}
                </b-card-text>
              </b-col>
              <b-col class="text-right">
                <b-row>
                  <b-col class="p-0">
                    {{ gaji.id === 1 ? (gaji.nominal * FAKTUR_GAJI.total_periode).toLocaleString() : (gaji.nominal * FAKTUR_GAJI.total_kehadiran).toLocaleString() }}
                    <b-button 
                      variant="link" 
                      class="p-0" 
                      @click="showModal(`modal-gaji-${gaji.id}`)">
                      <b-icon-pencil-square></b-icon-pencil-square >
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col sm="12" class="dash-1"></b-col>
        <b-col sm="12" class="sub-total-gaji cp-3">
          <b-row>
            <b-col>
              <h5>Subtotal Gaji</h5>
            </b-col>
            <b-col class="text-right">
              <h5>{{`Rp ${this.formatNumber(this.SUB_TOTAL_GAJI)}`}}</h5>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" class="solid-2"></b-col>
        <!-- Borongan  ========================================================================================== -->
        <b-col sm="12" class="upah-borongan cp-3">
          <h5>Upah Borongan</h5>
        </b-col>
        <b-col sm="12" class="solid-1"></b-col>
        <b-col sm="12" class="item-borongan">
          <b-container v-for="borongan in FAKTUR_GAJI.pengaturan_upah" :key="`borongan-${borongan.id}`">
            <b-row class="cp-1">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{borongan.nama}}
                </b-card-text>
                <b-card-text class="small text-muted">
                  {{detailBorongan(borongan.id)}}
                </b-card-text>
              </b-col>
              <b-col class="text-right">
                <b-row>
                  <b-col class="p-0">
                    {{formatNumber(borongan.nominal)}}
                    <b-icon-slash-circle style="color: lightgrey;"></b-icon-slash-circle>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col sm="12" class="dash-1"></b-col>
        <b-col sm="12" class="sub-total-upah-borongan cp-3">
          <b-row>
            <b-col>
              <h5>Subtotal Upah</h5>
            </b-col>
            <b-col class="text-right">
              <h5>{{`Rp ${this.formatNumber(this.SUB_TOTAL_UPAH)}`}}</h5>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" class="solid-2"></b-col>
        <!-- Komisi  ========================================================================================== -->
        <b-col sm="12" class="komisi cp-3">
          <h5>Komisi</h5>
        </b-col>
        <b-col sm="12" class="solid-1"></b-col>
        <b-col sm="12" class="item-komisi">
          <b-container>
            <b-row>
              <b-col class="p-0">
                <b-button 
                  variant="link" 
                  class="p-0" 
                  name="tambah"
                  @click="showModal(`modal-komisi`, -1)">
                  <b-icon-plus-circle></b-icon-plus-circle >Tambah komisi lain...
                </b-button>
              </b-col>
            </b-row>
            <b-row class="cp-1" v-for="(komisi, index) in FAKTUR_GAJI.komisi" :key="`komisi-${index}`">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{komisi.nama}}
                </b-card-text>
              </b-col>
              <b-col class="text-right">
                <b-row>
                  <b-col class="p-0">
                    {{formatNumber(komisi.nominal)}} 
                    <b-button 
                      variant="link" 
                      class="p-0"
                      @click="showModal(`modal-komisi`, index)">
                      <b-icon-pencil-square></b-icon-pencil-square >
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col sm="12" class="dash-1"></b-col>
        <b-col sm="12" class="sub-total-komisi cp-3">
          <b-row>
            <b-col>
              <h5>Subtotal Komisi</h5>
            </b-col>
            <b-col class="text-right">
              <h5>{{`Rp ${this.formatNumber(this.SUB_TOTAL_KOMISI)}`}}</h5>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" class="solid-3"></b-col>
        <!-- Sub Gaji Kotor  ===================================================================================== -->
        <b-col sm="12" class="sub-gaji-kotor cp-3">
          <b-row>
            <b-col class="sub-gaji-kotor">
              <h5>Total Gaji Kotor</h5>
            </b-col>
            <b-col class="text-right sub-gaji-kotor">
              <h5>{{`Rp ${this.formatNumber(this.BRUTO_GAJI)}`}}</h5>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" class="solid-2"></b-col>
        <!-- Tanggungan  ========================================================================================== -->
        <b-col sm="12" class="tanggungan cp-3">
          <h5>Tanggungan</h5>
          <b-card-text class="small text-muted">
            {{`Karyawan ini memiliki tanggungan Rp ${this.formatNumber(SUB_TOTAL_TANGGUNGAN)}`}}
          </b-card-text>
        </b-col>
        <b-col sm="12" class="solid-1"></b-col>
        <b-col sm="12" class="item-tanggungan">
          <b-container>
            <b-row>
              <b-col class="p-0">
                <b-button 
                  variant="link" 
                  class="p-0" 
                  name="tambah"
                  @click="showModal(`modal-tanggungan`, -1)">
                  <b-icon-plus-circle></b-icon-plus-circle >Tambah pembayaran tanggungan...
                </b-button>
              </b-col>
            </b-row>
            <b-row class="cp-1" v-for="(tanggungan, index) in FAKTUR_GAJI.tanggungan" :key="`tanggungan-${index}`">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{tanggungan.nama}}
                </b-card-text>
                <b-card-text class="small text-muted">
                  {{tanggungan.keterangan}}
                </b-card-text>
              </b-col>
              <b-col class="text-right bayar-tanggungan">
                <b-row>
                  <b-col class="p-0">
                    {{formatNumber(tanggungan.nominal)}} 
                    <b-button 
                      variant="link" 
                      class="p-0"
                      @click="showModal(`modal-tanggungan`, index)">
                      <b-icon-pencil-square class="bayar-tanggungan"></b-icon-pencil-square >
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col sm="12" class="dash-1"></b-col>
        <b-col sm="12" class="sub-total-tanggungan cp-3">
          <b-row>
            <b-col>
              <h5>Tanggungan Dibayar</h5>
            </b-col>
            <b-col class="text-right bayar-tanggungan">
              <h5>{{`(-) Rp ${this.formatNumber(SUB_TOTAL_TANGGUNGAN)}`}}</h5>
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" class="solid-2"></b-col>
         <b-col sm="12" class="netto-gaji cp-3">
          <b-container>
            <b-row>
              <b-col class="p-0 text-left netton-gaji">
                <h5>Total Gaji Bersih<b-icon icon="check-circle-fill" variant="success"></b-icon></h5>
              </b-col>
              <b-col class="p-0 text-right netton-gaji">
                <h5>{{`Rp ${this.formatNumber(NET_GAJI)}`}}</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="p-0">
                <b-card-text class="small text-muted">
                  {{`Nominal akhir yang diterima karyawan setelah ditambah komisi dikurangi pembayaran tanggungan (jika ada).`}}
                </b-card-text>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col sm="12" class="p-2"></b-col>
        <b-col sm="12" class="detail-faktur">
          <router-link :to="{ name: 'Pembayaran' }">
            <b-button block variant="primary">Berikutnya</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
    <modal></modal>
  </div>
</template>

<script>
import Modal from './modal/Modal.vue'
import { mapGetters, mapActions } from "vuex"

export default {
  components: { 
    Modal,
  },
  name: 'FakturGaji',
  created() {
    this.loadFakturGaji()
  },
  computed: {
    ...mapGetters([
      'ACTIVE_MODAL',
      'FAKTUR_GAJI',
      'LIST_BANK',
      'LIST_MODAL',
      'BRUTO_GAJI',
      'NET_GAJI',
      'SUB_TOTAL_GAJI',
      'SUB_TOTAL_KOMISI',
      'SUB_TOTAL_TANGGUNGAN',
      'SUB_TOTAL_UPAH',
      'formatNumber',
      'detailBorongan',
    ]),
    dataKehadiran(state) {
      return kehadiran => {
        return kehadiran > 0 ? kehadiran : 0;
      }
    }
  },
  methods: {
    ...mapActions({
      loadFakturGaji: 'loadFakturGaji',
      setActiveModal: 'setActiveModal'
    }),
    showModal(modalId, dataIndex) {
      let modal = this.LIST_MODAL.find(modal => modal.id === modalId);

      let value = {
        nominal  : null,
        periode  : null,
        kehadiran : null
      }
      switch (modalId) {
        case "modal-gaji-1":
          let dataId= modalId.match(/\d+/)[0];
          let gaji = this.FAKTUR_GAJI.pengaturan_gaji.find(gaji => gaji.id === parseInt(dataId))
          value = {
            nominal  : gaji.nominal,
            periode  : this.FAKTUR_GAJI.total_periode,
            kehadiran : this.FAKTUR_GAJI.total_kehadiran,
          }
          break;
        case "modal-gaji-2":
        case "modal-gaji-3":
        case "modal-gaji-4":
        case "modal-gaji-5":
          dataId = modalId.match(/\d+/)[0];
          gaji = this.FAKTUR_GAJI.pengaturan_gaji.find(gaji => gaji.id === parseInt(dataId))
          value = {
            nominal  : gaji.nominal,
            kehadiran : this.FAKTUR_GAJI.total_kehadiran,
          }
          break;
      
        case "ubah-kehadiran":
          value = {
            nominal  : 0,
            periode  : 0,
            kehadiran : this.FAKTUR_GAJI.total_kehadiran,
          }
          break;
        case "modal-komisi":
          let dataKomisi = this.FAKTUR_GAJI.komisi[dataIndex];
          value = {
            index : dataIndex,
            nominal: dataIndex === -1 ? 0 : dataKomisi.nominal,
            nama: dataIndex === -1 ? "" : dataKomisi.nama
          }
          break;
        case "modal-tanggungan":
          let dataTanggungan = this.FAKTUR_GAJI.tanggungan[dataIndex];
          value = {
            index : dataIndex,
            nominal: dataIndex === -1 ? 0 : dataTanggungan.nominal,
            nama: dataIndex === -1 ? "" : dataTanggungan.nama,
            keterangan: dataIndex === -1 ? "" : dataTanggungan.keterangan
          }
          break;
      }
      let data = {
        ...modal,
        value
      }

      this.setActiveModal(data)

      setTimeout(() => {
        this.$bvModal.show(modal.id);
      })
    },
  }
}
</script>

<style>
  @import '../assets/style/faktur-gaji.css';
</style>