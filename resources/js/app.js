import './bootstrap';

import { createApp, h } from 'vue'
import { createInertiaApp, Head, Link, router } from '@inertiajs/vue3'
import Layout from './Layouts/Layout.vue'
import {ZiggyVue} from '../../vendor/tightenco/ziggy'
import { Vue3Lottie } from 'vue3-lottie';
import VueSelect from 'vue-select';
import VueDatepicker from '@vuepic/vue-datepicker';
import Home from './Pages/Home.vue';
import Matches from './Pages/Matches.vue';

createInertiaApp({
  title: (title) => `${title} Srpska Tenis Liga`,

  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    let page = pages[`./Pages/${name}.vue`];
    
    page.default.layout = page.default.layout || Layout;
    
    return page;
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .component('Lottie', Vue3Lottie)
      .component('Head', Head)
      .component('Link', Link)
      .component('vSelect', VueSelect)
      .component('datepicker', VueDatepicker)
      .component('PlayerTable', Home)
      .component('MatchTable', Matches)
      .mount(el)
  },
})
