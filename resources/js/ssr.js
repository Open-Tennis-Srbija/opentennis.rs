import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import createServer from '@inertiajs/vue3/server';
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import Layout from './Layouts/Layout.vue';
import VueSelect from 'vue-select';
import VueDatepicker from '@vuepic/vue-datepicker';
import eventBus, { bus } from 'vue3-eventbus';
import Dropdown from '@components/Dropdown.vue';
import Home from './Pages/players/Players.vue';
import Matches from '@matches/Matches.vue';
import clickOutside from './directives/click-outside.js';

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} Srpska Tenis Liga`,
    resolve: (name) => {
      const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
      const resolved = pages[`./Pages/${name}.vue`];

      if (!resolved) {
        throw new Error(`Page not found: ./Pages/${name}.vue`);
      }

      resolved.default.layout = resolved.default.layout || Layout;
      return resolved;
    },
    setup({ App, props, plugin }) {
      const app = createSSRApp({ render: () => h(App, props) });
      app
        .use(plugin)
        .use(eventBus)
        .directive('click-outside', clickOutside)
        .component('Head', Head)
        .component('Link', Link)
        .component('Dropdown', Dropdown)
        .component('vSelect', VueSelect)
        .component('datepicker', VueDatepicker)
        .component('PlayerTable', Home)
        .component('MatchTable', Matches);

      return app;
    },
  }));
