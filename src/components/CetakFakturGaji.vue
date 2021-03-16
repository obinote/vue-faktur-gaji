<template>
  <div class="page-wrapper flex-left">
    <b-container class="cp-4">
      <b-row>
        <b-col>
          <h5>Cetak Faktur Gaji</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="pegawai-view text-left" sm="12">
          <h5>{{AFTERSAVE.id_karyawan}}</h5>
        </b-col>
        <b-col sm="12" class="text-left">
          <p class="text-muted mb-0">Dicatat : {{`${AFTERSAVE.tanggal_catat}`}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="pegawai-view text-left" sm="12">
          <h5>{{AFTERSAVE.nama_karyawan}}</h5>
        </b-col>
        <b-col sm="12" class="text-left">
          <p class="text-muted mb-0">Periode : {{`${AFTERSAVE.tanggal_awal} - ${AFTERSAVE.tanggal_akhir}`}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
        <b-col>
          <h5 class="text-left cp-3">Gaji</h5>
          <b-container
            v-for="gaji in AFTERSAVE.pengaturan_gaji" :key="`gaji-${gaji.id}`"
          >
            <b-row align-v="center" class="cp-1">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{gaji.nama}}
                </b-card-text>
                <b-card-text class="small text-muted">
                  {{`${formatNumber(gaji.nominal)} x ${gaji.id === 1 ? AFTERSAVE.total_periode : dataKehadiran(AFTERSAVE.total_kehadiran)} ${gaji.id === 1 ? "periode" : "kehadiran"}`}}
                </b-card-text>
              </b-col>
              <b-col class="text-right">
                <b-row>
                  <b-col class="p-0">
                    {{ gaji.id === 1 ? (gaji.nominal * AFTERSAVE.total_periode).toLocaleString() : (gaji.nominal * AFTERSAVE.total_kehadiran).toLocaleString() }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="text-left">
          <h5>Subtotal Gaji</h5>
        </b-col>
        <b-col class="text-right">
          <h5>{{`Rp ${formatNumber(SUB_GAJI)}`}}</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="upah-borongan cp-3 text-left">
          <h5>Upah Borongan</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="item-borongan">
          <b-container v-for="borongan in AFTERSAVE.pengaturan_upah" :key="`borongan-${borongan.id}`">
            <b-row class="cp-1">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{borongan.nama}}
                </b-card-text>
                <b-card-text class="small text-muted">
                  {{itemBorongan(borongan.id)}}
                </b-card-text>
              </b-col>
              <b-col class="text-right">
                <b-row>
                  <b-col class="p-0">
                    {{formatNumber(borongan.nominal)}}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="text-left">
          <h5>Subtotal Upah</h5>
        </b-col>
        <b-col class="text-right">
          <h5>{{`Rp ${formatNumber(SUB_UPAH)}`}}</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="komisi cp-3 text-left">
          <h5>Komisi</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-1"></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-container>
            <b-row class="cp-1" v-for="(komisi, index) in AFTERSAVE.komisi" :key="`komisi-${index}`">
              <b-col class="text-left p-0">
                <b-card-text class="m-0">
                  {{komisi.nama}}
                </b-card-text>
              </b-col>
              <b-col class="text-right">
                <b-row>
                  <b-col class="p-0">
                    {{formatNumber(komisi.nominal)}} 
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="text-left">
          <h5>Subtotal Komisi</h5>
        </b-col>
        <b-col class="text-right">
          <h5>{{`Rp ${formatNumber(SUB_KOMISI)}`}}</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="text-left sub-gaji-kotor">
          <h5>Total Gaji Kotor</h5>
        </b-col>
        <b-col class="text-right sub-gaji-kotor">
          <h5>{{`Rp ${formatNumber(GAJI_KOTOR)}`}}</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
         <b-col sm="12" class="tanggungan cp-3 text-left">
          <h5 class="mb-0">Tanggungan</h5>
         </b-col>
         <b-col>
          <b-card-text class="small text-muted text-left">
            {{`Karyawan ini memiliki tanggungan Rp ${formatNumber(SUB_TANGGUNGAN)}`}}
          </b-card-text>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="item-tanggungan">
          <b-container>
            <b-row class="cp-1" v-for="(tanggungan, index) in AFTERSAVE.tanggungan" :key="`tanggungan-${index}`">
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
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="dash-1"></b-col>
      </b-row>
      <b-row>
        <b-col class="text-left">
          <h5>Tanggungan Dibayar</h5>
        </b-col>
        <b-col class="text-right bayar-tanggungan">
          <h5>{{`(-) Rp ${formatNumber(SUB_TANGGUNGAN)}`}}</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
        <b-col class="netto-gaji cp-3">
          <b-container>
            <b-row>
              <b-col class="p-0 text-left netton-gaji">
                <h5>Total Gaji Bersih<b-icon icon="check-circle-fill" variant="success"></b-icon></h5>
              </b-col>
              <b-col class="p-0 text-right netton-gaji">
                <h5>{{`Rp ${formatNumber(GAJI_BERSIH)}`}}</h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="p-0 text-left">
                <b-card-text class="small text-muted">
                  {{`Nominal akhir yang diterima karyawan setelah ditambah komisi dikurangi pembayaran tanggungan (jika ada).`}}
                </b-card-text>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="solid-2"></b-col>
      </b-row>
      <b-row>
        <b-col sm="12" class="text-left">
          <p class="text-muted small mb-0">Keterangan</p>
        </b-col>
        <b-col sm="12" class="text-left">
          <p class="mb-4">Lebih Semangat Lagi Ya!</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button block variant="info">Cetak</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters([
      'AFTERSAVE',
      'SUB_GAJI',
      'SUB_UPAH',
      'SUB_TANGGUNGAN',
      'SUB_KOMISI',
      'GAJI_KOTOR',
      'GAJI_BERSIH',
      'formatNumber',
      'itemBorongan'
    ]),
    dataKehadiran(state) {
      return kehadiran => {
        return kehadiran > 0 ? kehadiran : 0;
      }
    }
  },
}
</script>
<style>
  @import '../assets/style/faktur-gaji.css';
</style>