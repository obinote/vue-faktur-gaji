<template>
  <div class="modal">
    <b-modal 
      :id="dataModal.id"
      @show="handleShow"
      @hidden="handleHidden"
      @ok="handleSimpan"
    >
      <template #modal-header="{hide}">
        <b-container>
          <b-row align-h="center">
            <b-col class="p-0">
              <h5 class="modal-header" style="text-align: center">{{modalHeader}}</h5>
            </b-col>
          </b-row>
          <b-row class="btn-close">
            <b-col class="p-1 text-right">
              <b-button size="sm" variant="link" @click="hide()">
                <b-icon icon="x" scale="2"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <template>
        <kehadiran-modal-body v-if="dataModal.body ==='kehadiran'"></kehadiran-modal-body>
        <gaji-pokok-modal-body v-if="dataModal.body === 'gaji' && dataModal.id === 'modal-gaji-1'">
        </gaji-pokok-modal-body>
        <tunjangan-modal-body v-if="dataModal.body === 'gaji' && dataModal.id !== 'modal-gaji-1'" >
        </tunjangan-modal-body>
        <komisi-modal-body v-if="dataModal.body === 'komisi'"></komisi-modal-body>
        <tanggungan-modal-body v-if="dataModal.body === 'tanggungan'" ref="tanggungan"></tanggungan-modal-body>
      </template>
      <template #modal-footer="{ ok }">
        <b-container>
          <b-row>
            <b-col v-if="dataModal.footer ==='hapus-simpan'" class="p-1">
              <b-button block variant="outline-danger" @click="handleHapus">
                Hapus
              </b-button>
            </b-col>
            <b-col class="p-1">
              <b-button block variant="primary" @click="ok()">
                Simpan
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GajiPokokModalBody from './GajiPokokModalBody.vue'
import KehadiranModalBody from './KehadiranModalBody.vue'
import TunjanganModalBody from './TunjanganModalBody.vue'
import KomisiModalBody from './KomisiModalBody'
import TanggunganModalBody from './TanggunganModalBody'

export default {
  components: { 
    KehadiranModalBody, 
    GajiPokokModalBody,
    TunjanganModalBody,
    TanggunganModalBody,
    KomisiModalBody 
  },
  name: 'modal',
  computed: {
    ...mapGetters([
      'dataModal',
      'beforeEdit',
      'tempAddKomisi'
    ]),
    modalHeader() {
      let modalHeader = this.dataModal.header
      if (this.dataModal.id === 'modal-komisi') {
        if (this.dataModal.value.index === -1) {
          modalHeader = `Tambah ${modalHeader}`
        } else {
          modalHeader = `Ubah ${modalHeader}`
        }
      }
      return modalHeader
    }
  },
  methods: {
    handleShow (e) {
      switch (e.componentId) {
        case "ubah-kehadiran":
          this.$store.commit('setBeforeEdit', {
            target : ["ubah-kehadiran"],
            value  : {
              target : ["total_kehadiran"],
              value  : [this.dataModal.value.kehadiran]
            }
          })
          break;
        case "modal-gaji-1":
          this.$store.commit('setBeforeEdit', {
            target : ["total_periode", "gaji"],
            value  : [this.dataModal.value.periode, this.dataModal.value.nominal]
          })
        case "modal-gaji-2":
        case "modal-gaji-3":
        case "modal-gaji-4":
        case "modal-gaji-5":
          this.$store.commit('setBeforeEdit', {
            target : ["gaji"],
            value  : [this.dataModal.value.nominal]
          })
          break;
        case "modal-komisi":
          if (this.dataModal.value.index !== -1) {
            this.$store.commit('setBeforeEdit', {
              target : ["komisi"],
              value  : [this.dataModal.value.index, this.dataModal.value.nama, this.dataModal.value.nominal]
            })
          }
          break;
      }
    },
    handleHidden (e) {
      switch (e.componentId) {
        case "ubah-kehadiran":
          this.$store.commit('onChangeInput', {
            value: this.beforeEdit.total_kehadiran,
            target: "total_kehadiran",
          })
          break;
        case "modal-gaji-1":
          this.$store.commit('onChangeInput', {
            target : "total_periode",
            value  : this.beforeEdit.total_periode
          })
          this.$store.commit('onChangeInput', {
            target : "gaji",
            value  : this.beforeEdit.gajiValue
          })
          break;
        case "modal-gaji-2":
        case "modal-gaji-3":
        case "modal-gaji-4":
        case "modal-gaji-5":
          this.$store.commit('onChangeInput', {
            target : "gaji",
            value  : this.beforeEdit.gajiValue
          })
          break;
        case "modal-komisi":
          if (this.beforeEdit.komisi.index !== -1) {
            this.$store.commit('onChangeKomisi', {
              value: this.beforeEdit.komisi.nominal,
              target: "nominal",
              index: this.beforeEdit.komisi.index
            })
            this.$store.commit('onChangeKomisi', {
              value: this.beforeEdit.komisi.nama,
              target: "nama",
              index: this.beforeEdit.komisi.index
            })
          }
          break;
      }
    },
    handleSimpan (e) {
      switch (e.componentId) {
        case "ubah-kehadiran":
          this.$store.commit('setBeforeEdit', {
            target : ["ubah-kehadiran"],
            value  : {
              target : ["total_kehadiran"],
              value  : [this.dataModal.value.kehadiran]
            }
          })
          break;
        case "modal-gaji-1":
          this.$store.commit('setBeforeEdit', {
            target : ["total_periode", "gaji"],
            value  : [this.dataModal.value.periode, this.dataModal.value.nominal]
          })
          break;
        case "modal-gaji-2":
        case "modal-gaji-3":
        case "modal-gaji-4":
        case "modal-gaji-5":
          this.$store.commit('setBeforeEdit', {
            target : ["gaji"],
            value  : [this.dataModal.value.nominal]
          })
          break;
        case "modal-komisi":
          if (this.dataModal.value.index === -1) {
            this.$store.commit('tambahKomisi', this.tempAddKomisi)
          } else {
            this.$store.commit('setBeforeEdit', {
              target : ["komisi"],
              value  : [this.dataModal.value.index, this.dataModal.value.nama, this.dataModal.value.nominal]
            })
          }
          break;
        case "modal-tanggungan":
          this.$refs.tanggungan.handleSimpan()
          break;
      }
    },
    handleHapus () {
      let modalId = this.dataModal.id
      switch (modalId) {
        case "ubah-kehadiran":
          this.$store.commit('setBeforeEdit', {
            target : ["ubah-kehadiran"],
            value  : {
              target : ["total_kehadiran"],
              value  : [0]
            }
          })
          this.$bvModal.hide(modalId);
          break;
        case "modal-komisi":
          this.$store.commit('hapusKomisi', {
            index : this.dataModal.value.index
          })
          this.$bvModal.hide(modalId)
          break;
        case "modal-tanggungan":
          this.$store.commit('hapusTanggungan', {
            index : this.dataModal.value.index
          })
          this.$bvModal.hide(modalId)
          break;
      }
      // this.$bvModal.hide('ubah-kehadiran')
    },
  }

}
</script>