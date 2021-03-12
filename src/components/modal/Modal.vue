<template>
  <div class="modal">
    <b-modal 
      :id="ACTIVE_MODAL.id"
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
        <kehadiran-modal-body v-if="ACTIVE_MODAL.body ==='kehadiran'"></kehadiran-modal-body>
        <gaji-pokok-modal-body v-if="ACTIVE_MODAL.body === 'gaji' && ACTIVE_MODAL.id === 'modal-gaji-1'">
        </gaji-pokok-modal-body>
        <tunjangan-modal-body v-if="ACTIVE_MODAL.body === 'gaji' && ACTIVE_MODAL.id !== 'modal-gaji-1'" >
        </tunjangan-modal-body>
        <komisi-modal-body v-if="ACTIVE_MODAL.body === 'komisi'"></komisi-modal-body>
        <tanggungan-modal-body v-if="ACTIVE_MODAL.body === 'tanggungan'" ref="tanggungan"></tanggungan-modal-body>
      </template>
      <template #modal-footer="{ ok }">
        <b-container>
          <b-row>
            <b-col v-if="ACTIVE_MODAL.footer ==='hapus-simpan'" class="p-1">
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
import { mapGetters, mapActions } from "vuex"

import KehadiranModalBody from './KehadiranModalBody'
import GajiPokokModalBody from './GajiPokokModalBody'
import TunjanganModalBody from './TunjanganModalBody'
import KomisiModalBody from './KomisiModalBody'
import TanggunganModalBody from './TanggunganModalBody'

export default {
  components: { 
    KehadiranModalBody, 
    GajiPokokModalBody,
    TunjanganModalBody,
    KomisiModalBody, 
    TanggunganModalBody,
  },
  name: 'modal',
  computed: {
    ...mapGetters([
      'ACTIVE_MODAL',
      'FAKTUR_GAJI',
      'CACHE_EDIT',
      'TEMP_ADD_KOMISI',
    ]),
    modalHeader() {
      let modalHeader = this.ACTIVE_MODAL.header
      if (this.ACTIVE_MODAL.id === 'modal-komisi') {
        if (this.ACTIVE_MODAL.value.index === -1) {
          modalHeader = `Tambah ${modalHeader}`
        } else {
          modalHeader = `Ubah ${modalHeader}`
        }
      }
      return modalHeader
    }
  },
  methods: {
    ...mapActions({
      onSubmitModal : 'onSubmitModal',
      hapusKehadiran: 'hapusKehadiran',
      hapusKomisi : 'hapusKomisi',
      hapusTanggungan: 'hapusTanggungan'
    }),
    handleSimpan (e) {
      let payload = {}

      switch (e.componentId) {
        case "ubah-kehadiran":
          payload = {
            target : ["total_kehadiran"],
            value  : [this.ACTIVE_MODAL.value.kehadiran]
          }
          break;
        case "modal-gaji-1":
          payload = {
            target : ["total_periode", "gaji_pokok"],
            value  : [this.ACTIVE_MODAL.value.periode, this.ACTIVE_MODAL.value.nominal]
          }
          break;
        case "modal-gaji-2":
        case "modal-gaji-3":
        case "modal-gaji-4":
        case "modal-gaji-5":
          payload = {
            target : [e.componentId],
            value  : [this.ACTIVE_MODAL.value.nominal]
          }
          break;
        case "modal-komisi":
          payload = {
            target : ["komisi"],
            value  : [this.ACTIVE_MODAL.value.index, this.ACTIVE_MODAL.value.nama, this.ACTIVE_MODAL.value.nominal]
          }
          break;
        case "modal-tanggungan":
          this.$refs.tanggungan.handleSimpan()
          break;
      }

      if (payload.target) {
        this.onSubmitModal(payload)
      }
    },
    handleHapus () {
      let modalId = this.ACTIVE_MODAL.id
      switch (modalId) {
        case "ubah-kehadiran":
          this.hapusKehadiran()
          break;
        case "modal-komisi":
          this.hapusKomisi({
            index : this.ACTIVE_MODAL.value.index
          })
          break;
        case "modal-tanggungan":
          this.hapusTanggungan({
            index : this.ACTIVE_MODAL.value.index
          })
          break;
      }

      this.$bvModal.hide(modalId)
    },
  }

}
</script>