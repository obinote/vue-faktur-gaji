import Home from './pages/Home'
import Pembayaran from './pages/Pembayaran'
import CetakFaktur from './pages/CetakFaktur'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pembayaran',
    name: 'Pembayaran',
    component: Pembayaran
  },
  {
    path: '/cetak',
    name: 'CetakFaktur',
    component: CetakFaktur
  },

]

export default routes
