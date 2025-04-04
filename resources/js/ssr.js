import "./bootstrap";

import { createSSRApp, h } from "vue";
import { createInertiaApp, Head, Link, router } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import Layout from "./Layouts/Layout.vue";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import VueSelect from "vue-select";
import VueDatepicker from "@vuepic/vue-datepicker";
import Home from "./Pages/Home.vue";
import Matches from "./Pages/Matches.vue";
import eventBus, { bus } from "vue3-eventbus";
import Dropdown from "./Pages/components/Dropdown.vue";

router.on("finish", () => {
    bus.emit("resetScroll");
});

createServer((page) => {
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} Srpska Tenis Liga`,

        resolve: (name) => {
            const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
            let page = pages[`./Pages/${name}.vue`];

            page.default.layout = page.default.layout || Layout;

            return page;
        },

        setup({ el, App, props, plugin }) {
            createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue)
                .use(eventBus)
                .component("Head", Head)
                .component("Link", Link)
                .component("Dropdown", Dropdown)
                .component("vSelect", VueSelect)
                .component("datepicker", VueDatepicker)
                .component("PlayerTable", Home)
                .component("MatchTable", Matches)
                .mount(el);
        },
    });
});
