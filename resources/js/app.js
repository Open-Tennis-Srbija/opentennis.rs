import "./bootstrap";

import { createApp, h } from "vue";
import { createInertiaApp, Head, Link, router } from "@inertiajs/vue3";
import Layout from "./Layouts/Layout.vue";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import VueSelect from "vue-select";
import VueDatepicker from "@vuepic/vue-datepicker";
import Players from "./Pages/players/Players.vue";
import Matches from "@matches/Matches.vue";
import eventBus, { bus } from "vue3-eventbus";
import Dropdown from "@components/Dropdown.vue";
import AddSingle from "@matches/AddSingle.vue";
import clickOutside from "./directives/click-outside.js";
import AddDouble from "@matches/AddDouble.vue";

router.on("finish", () => {
    bus.emit("resetScroll");
});

createInertiaApp({
    title: (title) => `${title} Open Tennis Srbija`,

    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        let page = pages[`./Pages/${name}.vue`];

        page.default.layout = page.default.layout || Layout;

        return page;
    },

    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, {
                Ziggy: props.initialPage.props.ziggy, // THIS is key
            })
            .use(eventBus)
            .directive("click-outside", clickOutside)
            .component("Head", Head)
            .component("Link", Link)
            .component("Dropdown", Dropdown)
            .component("vSelect", VueSelect)
            .component("AddSingleMatch", AddSingle)
            .component("AddDoubleMatch", AddDouble)
            .component("datepicker", VueDatepicker)
            .component("PlayerTable", Players)
            .component("MatchTable", Matches)
            .mount(el);
    },
});
