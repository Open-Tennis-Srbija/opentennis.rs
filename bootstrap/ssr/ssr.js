var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { defineAsyncComponent, reactive, resolveComponent, withCtx, createTextVNode, unref, useSSRContext, mergeProps, onMounted, createVNode, toDisplayString, computed, onBeforeMount, mergeModels, useModel, getCurrentInstance, watch, createSSRApp, h as h$2 } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { useForm, usePage, router, createInertiaApp, Head, Link } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { OverlayScrollbars } from "overlayscrollbars";
import eventBus, { bus } from "vue3-eventbus";
import VueSelect from "vue-select";
import VueDatepicker from "@vuepic/vue-datepicker";
const nm = "6";
const ddd = 0;
const h$1 = 500;
const w$1 = 500;
const meta = { "g": "@lottiefiles/toolkit-js 0.33.2" };
const layers = [{ "ty": 4, "nm": "7", "sr": 1, "st": 60, "op": 360, "ip": 60, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 91.5 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 137.25 }, { "s": [0, 0, 100], "t": 183 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 91.5, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 183 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 1 }, { "ty": 4, "nm": "6", "sr": 1, "st": 50, "op": 350, "ip": 50, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 76.25 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 122 }, { "s": [0, 0, 100], "t": 167.75 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 76.25, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 167.75 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 2 }, { "ty": 4, "nm": "5", "sr": 1, "st": 40, "op": 340, "ip": 40, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 61 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 106.75 }, { "s": [0, 0, 100], "t": 152.5 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 61, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 152.5 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 3 }, { "ty": 4, "nm": "4", "sr": 1, "st": 30, "op": 330, "ip": 30, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 45.75 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 91.5 }, { "s": [0, 0, 100], "t": 137.25 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 45.75, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 137.25 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 4 }, { "ty": 4, "nm": "3", "sr": 1, "st": 20, "op": 320, "ip": 20, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 30.5 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 76.25 }, { "s": [0, 0, 100], "t": 122 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 30.5, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 122 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 5 }, { "ty": 4, "nm": "2", "sr": 1, "st": 10, "op": 310, "ip": 10, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 15.25 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 61 }, { "s": [0, 0, 100], "t": 106.75 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 15.25, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 106.75 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 6 }, { "ty": 4, "nm": "1", "sr": 1, "st": 0, "op": 300, "ip": 0, "hd": false, "ddd": 0, "bm": 0, "hasMask": false, "ao": 0, "ks": { "a": { "a": 0, "k": [0, 0, 0], "ix": 1 }, "s": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [0, 0, 100], "t": 0 }, { "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [100, 100, 100], "t": 45.75 }, { "s": [0, 0, 100], "t": 91.5 }], "ix": 6 }, "sk": { "a": 0, "k": 0 }, "p": { "a": 1, "k": [{ "o": { "x": 0.333, "y": 0 }, "i": { "x": 0.667, "y": 1 }, "s": [91.75, 246.25, 0], "t": 0, "ti": [-97, -26.5, 0], "to": [106.458, 66.75, 0] }, { "s": [400.5, 246.25, 0], "t": 91.5 }], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 10 }, "sa": { "a": 0, "k": 0 }, "o": { "a": 0, "k": 100, "ix": 11 } }, "ef": [], "shapes": [{ "ty": "gr", "bm": 0, "hd": false, "mn": "ADBE Vector Group", "nm": "Ellipse 1", "ix": 1, "cix": 2, "np": 3, "it": [{ "ty": "el", "bm": 0, "hd": false, "mn": "ADBE Vector Shape - Ellipse", "nm": "Ellipse Path 1", "d": 1, "p": { "a": 0, "k": [0, 0], "ix": 3 }, "s": { "a": 0, "k": [500, 500], "ix": 2 } }, { "ty": "fl", "bm": 0, "hd": false, "mn": "ADBE Vector Graphic - Fill", "nm": "Fill 1", "c": { "a": 0, "k": [1, 1, 1], "ix": 4 }, "r": 1, "o": { "a": 0, "k": 100, "ix": 5 } }, { "ty": "tr", "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [8.214, 8.214], "ix": 3 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "p": { "a": 0, "k": [0, 0], "ix": 2 }, "r": { "a": 0, "k": 0, "ix": 6 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "o": { "a": 0, "k": 100, "ix": 7 } }] }], "ind": 7 }];
const v$1 = "5.7.3";
const fr = 60;
const op = 105;
const ip = 75;
const assets = [];
const CircleLoader = {
  nm,
  ddd,
  h: h$1,
  w: w$1,
  meta,
  layers,
  v: v$1,
  fr,
  op,
  ip,
  assets
};
const data = ["Beograd", "dropdown-spacer", "Ada", "Aleksandrovac", "Aleksinac", "Alibunar", "Apatin", "Aranđelovac", "Arilje", "Babušnica", "Bač", "Bačka Palanka", "Bačka Topola", "Bački Petrovac", "Bajina Bašta", "Batočina", "Bečej", "Bela Crkva", "Bela Palanka", "Beočin", "Blace", "Bogatić", "Bojnik", "Boljevac", "Bor", "Bosilegrad", "Brus", "Bujanovac", "Čačak", "Čajetina", "Ćićevac", "Čoka", "Crna Trava", "Ćuprija", "Đakovica", "Dečani", "Despotovac", "Dimitrovgrad", "Doljevac", "Gadžin Han", "Glogovac", "Gnjilane", "Golubac", "Gora", "Gornji Milanovac", "Inđija", "Irig", "Istok", "Ivanjica", "Jagodina", "Kačanik", "Kanjiža", "Kikinda", "Kladovo", "Klina", "Knić", "Knjaževac", "Koceljeva", "Kosjerić", "Kosovo Polje", "Kosovska Kamenica", "Kosovska Mitrovica", "Kovačica", "Kovin", "Kragujevac", "Kraljevo", "Krupanj", "Kruševac", "Kučevo", "Kula", "Kuršumlija", "Lajkovac", "Lapovo", "Lebane", "Leposavić", "Leskovac", "Lipljan", "Ljig", "Ljubovija", "Loznica", "Lučani", "Majdanpek", "Mali Iđoš", "Mali Zvornik", "Malo Crniće", "Medveđa", "Merošina", "Mionica", "Negotin", "Niš", "Nova Crnja", "Nova Varoš", "Novi Bečej", "Novi Kneževac", "Novi Pazar", "Novi Sad", "Novo Brdo", "Obilić", "Odžaci", "Opovo", "Orahovac", "Osečina", "Pančevo", "Paraćin", "Peć", "Pećinci", "Petrovac na Mlavi", "Pirot", "Plandište", "Podujevo", "Požarevac", "Požega", "Preševo", "Priboj", "Prijepolje", "Priština", "Prizren", "Prokuplje", "Rača", "Raška", "Ražanj", "Rekovac", "Ruma", "Šabac", "Sečanj", "Senta", "Šid", "Sjenica", "Smederevo", "Smederevska Palanka", "Sokobanja", "Sombor", "Srbica", "Srbobran", "Sremska Mitrovica", "Sremski Karlovci", "Stara Pazova", "Štimlje", "Štrpce", "Subotica", "Surdulica", "Suva Reka", "Svilajnac", "Svrljig", "Temerin", "Titel", "Topola", "Trgovište", "Trstenik", "Tutin", "Ub", "Uroševac", "Užice", "Valjevo", "Varvarin", "Velika Plana", "Veliko Gradište", "Vitina", "Vladičin Han", "Vladimirci", "Vlasotince", "Vranje", "Vrbas", "Vrnjačka Banja", "Vršac", "Vučitrn", "Žabalj", "Žabari", "Žagubica", "Zaječar", "Žitište", "Žitorađa", "Zrenjanin", "Zubin Potok", "Zvečan", "dropdown-spacer", "inostranstvo"];
const opstine = {
  data
};
const _sfc_main$j = {
  __name: "AddMatch",
  __ssrInlineRender: true,
  props: { players: Array, courts: Array, leagues: Array },
  setup(__props) {
    const props = __props;
    const Lottie = defineAsyncComponent(() => import("vue3-lottie"));
    const form = useForm({
      winner: null,
      loser: null,
      set_score: "",
      game_score: "",
      court: null,
      date: /* @__PURE__ */ new Date(),
      location: "Beograd",
      league: null
    });
    const formState = reactive({
      submitted: false,
      success: false,
      shouldReset: false
    });
    const minDate = (date) => {
      let temp = date;
      temp.setFullYear(temp.getFullYear() - 1);
      return temp;
    };
    const formatDate = (date) => {
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
    const handleTemp = (mode) => {
      if (!form[mode] || form[mode] === "") {
        form.errors[mode] = "Ovo polje je obavezno";
      } else {
        form.errors[mode] = "";
      }
    };
    const handleInputs = (event, isDate = false) => {
      if (isDate) return form.errors["date"] = "";
      if (event.target.value && event.target.value !== "") {
        form.errors[event.target.id] = "";
      } else {
        form.errors[event.target.id] = "Ovo polje je obavezno";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_dropdown = resolveComponent("dropdown");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_datepicker = resolveComponent("datepicker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Dodaj meč -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">dodaj meč</h1><h1 id="success" class="${ssrRenderClass({ "show": formState.success })}">Meč je uspešno dodat</h1><div id="success-links" class="${ssrRenderClass({ "show": formState.success })}"><p class="add">dodaj još jedan meč</p>`);
      _push(ssrRenderComponent(_component_Link, {
        class: "blue",
        href: _ctx.route("matches")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi mečeve`);
          } else {
            return [
              createTextVNode("vidi mečeve")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        class: "red",
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi rang listu`);
          } else {
            return [
              createTextVNode("vidi rang listu")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form id="form" class="${ssrRenderClass({ "hide": formState.success })}"><div class="form-section"><h2>Teniseri</h2><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Pobednik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        disabledOption: unref(form).loser,
        modelValue: unref(form).winner,
        "onUpdate:modelValue": ($event) => unref(form).winner = $event,
        class: { "invalid": unref(form).errors.winner },
        shouldreset: formState.shouldreset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.winner)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Gubitnik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.players,
        modelValue: unref(form).loser,
        "onUpdate:modelValue": ($event) => unref(form).loser = $event,
        disabledOption: unref(form).winner,
        class: { "invalid": unref(form).errors.loser },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.loser)}</p></div></div></div><div class="form-section"><h2>Rezultat</h2><div class="form-row three"><div class="form-group"><label for="full-score" class="input-label"> Konačni rezultat <br>(2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).set_score)} class="${ssrRenderClass({ "invalid": unref(form).errors.set_score })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} data-validate="true" id="set_score" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.set_score)}</p></div><div class="form-group"><label for="games" class="input-label"> Gemovi (primer: 6:3,7:6,6:1) </label><input${ssrRenderAttr("value", unref(form).game_score)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="text"></div><div class="form-group"><label for="winner-fname" class="input-label"> Liga ili turnir </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.leagues,
        modelValue: unref(form).league,
        "onUpdate:modelValue": ($event) => unref(form).league = $event,
        class: { "invalid": unref(form).errors.league },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.league)}</p></div></div></div><div class="form-section"><h2>Vreme i lokacija</h2><div class="form-row three"><div class="form-group"><label for="date" class="input-label"> Datum (godinu dana unazad) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_datepicker, {
        "enable-time-picker": false,
        format: formatDate,
        "preview-format": formatDate,
        "onUpdate:modelValue": [($event) => handleInputs($event, true), ($event) => unref(form).date = $event],
        onClosed: ($event) => handleTemp("date"),
        id: "date",
        modelValue: unref(form).date,
        class: { "invalid": unref(form).errors.date },
        "min-date": minDate(/* @__PURE__ */ new Date()),
        "max-date": /* @__PURE__ */ new Date(),
        clearable: false,
        "year-range": [(/* @__PURE__ */ new Date()).getFullYear() - 1, (/* @__PURE__ */ new Date()).getFullYear()],
        "cancel-text": "Otkaži",
        "select-text": "Potvrdi",
        disabled: formState.submitted,
        "day-names": ["pon", "uto", "sre", "čet", "pet", "sub", "ned"]
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.date)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Opština (ili inostranstvo na dnu) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: unref(opstine).data,
        type: "array",
        modelValue: unref(form).location,
        "onUpdate:modelValue": ($event) => unref(form).location = $event,
        class: { "invalid": unref(form).errors.location },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div><div class="form-group"><label for="place" class="input-label"> Teniski teren ili klub </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.courts,
        modelValue: unref(form).court,
        "onUpdate:modelValue": ($event) => unref(form).court = $event,
        class: { "invalid": unref(form).errors.court },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn" class="${ssrRenderClass({ "hide": formState.submitted })}">Dodaj</span><span id="loader-submit" class="${ssrRenderClass([{ "show": formState.submitted }, "lottie-container"])}">`);
      _push(ssrRenderComponent(unref(Lottie), {
        height: 150,
        animationData: unref(CircleLoader)
      }, null, _parent));
      _push(`</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AddMatch.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: { data: Object },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PlayerTable = resolveComponent("PlayerTable");
      const _component_MatchTable = resolveComponent("MatchTable");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "static-wrapper dashboard" }, _attrs))}><h1>admin</h1><div class="dashboard-wrapper"><div class="summary"><div class="summary-item"><h2>Ukupno mečeva</h2><p>${ssrInterpolate(props.data.stats.total_matches)}</p></div><div class="summary-item"><h2>Ukupno tenisera</h2><p>${ssrInterpolate(props.data.stats.total_players)}</p></div><div class="summary-item"><h2>Najpopularnija lokacija</h2><p>${ssrInterpolate(props.data.stats.popular_location)}</p></div></div><div class="stats"><div class="stats-item"><h2>Top 5 tenisera</h2><div class="player-wrapper">`);
      _push(ssrRenderComponent(_component_PlayerTable, {
        players: props.data.players
      }, null, _parent));
      _push(`</div></div><div class="stats-item"><h2>Poslednjih 5 mečeva</h2>`);
      _push(ssrRenderComponent(_component_MatchTable, {
        matches: props.data.matches
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Dashboard.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  __name: "Login",
  __ssrInlineRender: true,
  props: { players: Array },
  setup(__props) {
    const page = usePage();
    const Lottie = defineAsyncComponent(() => import("vue3-lottie"));
    onMounted(() => {
      page.props["title"] = "Admin";
    });
    const form = useForm({
      username: null,
      password: null
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "static-wrapper" }, _attrs))}><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">Admin</h1><form id="form" class="${ssrRenderClass({ "hide": formState.success })}"><div class="form-section"><div class="form-row column"><div class="form-group center"><label for="full-score" class="input-label"> Korisničko ime <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).username)} class="${ssrRenderClass({ "invalid": unref(form).errors.username })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="username" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.username)}</p></div><div class="form-group center"><label for="games" class="input-label"> Lozinka <span class="required">*</span></label><input class="${ssrRenderClass({ "invalid": unref(form).errors.password })}"${ssrRenderAttr("value", unref(form).password)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="password"><p class="error-message">${ssrInterpolate(unref(form).errors.password)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn" class="${ssrRenderClass({ "hide": formState.submitted })}">Uloguj se</span><span id="loader-submit" class="${ssrRenderClass([{ "show": formState.submitted }, "lottie-container"])}">`);
      _push(ssrRenderComponent(unref(Lottie), {
        height: 150,
        animationData: unref(CircleLoader)
      }, null, _parent));
      _push(`</span></button></div></div></form></div>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Register -" }, null, _parent));
      _push(`<h1>Register</h1><div class="form-wrapp"><form><div><label for="name">Name</label><input type="text" id="name"${ssrRenderAttr("value", unref(form).name)}></div><div><label for="email">Email</label><input type="email" id="email"${ssrRenderAttr("value", unref(form).email)}></div><div><label for="password">Password</label><input type="password" id="password"${ssrRenderAttr("value", unref(form).password)}></div><div><label for="password_confirmation">Confirm Password</label><input type="password" id="password_confirmation"${ssrRenderAttr("value", unref(form).password_confirmation)}></div><div><button>Register</button></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  __name: "EditMatch",
  __ssrInlineRender: true,
  props: { players: Array, match: Object, courts: Array },
  setup(__props) {
    const props = __props;
    const Lottie = defineAsyncComponent(() => import("vue3-lottie"));
    const page = usePage();
    onMounted(() => {
      page.props["title"] = `Izmeni meč`;
    });
    const form = useForm({
      id: props.match.id,
      winner: props.match.winner,
      loser: props.match.loser,
      set_score: props.match.set_score,
      game_score: props.match.game_score,
      date: props.match.date,
      location: props.match.location,
      court: props.match.court
    });
    const formState = reactive({
      submitted: false,
      success: false,
      shouldReset: false
    });
    const minDate = (date) => {
      let temp = date;
      temp.setFullYear(temp.getFullYear() - 1);
      return temp;
    };
    const formatDate = (date) => {
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
    reactive({
      players: props.players
    });
    const handleTemp = (mode) => {
      if (!form[mode] || form[mode] === "") {
        form.errors[mode] = "Ovo polje je obavezno";
      } else {
        form.errors[mode] = "";
      }
    };
    const handleInputs = (event, isDate = false) => {
      if (isDate) return form.errors["date"] = "";
      if (event.target.value && event.target.value !== "") {
        form.errors[event.target.id] = "";
      } else {
        form.errors[event.target.id] = "Ovo polje je obavezno";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_dropdown = resolveComponent("dropdown");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_datepicker = resolveComponent("datepicker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Izmeni meč" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">Izmeni meč</h1><h1 id="success" class="${ssrRenderClass({ "show": formState.success })}">Meč je uspešno izmenjen</h1><div id="success-links" class="${ssrRenderClass({ "show": formState.success })}">`);
      _push(ssrRenderComponent(_component_Link, {
        class: "blue",
        href: _ctx.route("matches")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi mečeve`);
          } else {
            return [
              createTextVNode("vidi mečeve")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        class: "red",
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi rang listu`);
          } else {
            return [
              createTextVNode("vidi rang listu")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form id="form" class="${ssrRenderClass({ "hide": formState.success })}"><div class="form-section"><h2>Teniseri</h2><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Pobednik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        modelValue: unref(form).winner,
        "onUpdate:modelValue": ($event) => unref(form).winner = $event,
        class: { "invalid": unref(form).errors.winner },
        shouldreset: formState.shouldreset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.winner)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Gubitnik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.players,
        modelValue: unref(form).loser,
        "onUpdate:modelValue": ($event) => unref(form).loser = $event,
        class: { "invalid": unref(form).errors.loser },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.loser)}</p></div></div></div><div class="form-section"><h2>Rezultat</h2><div class="form-row"><div class="form-group"><label for="full-score" class="input-label"> Konačni rezultat (primeri: 2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).set_score)} class="${ssrRenderClass({ "invalid": unref(form).errors.set_score })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} data-validate="true" id="set_score" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.set_score)}</p></div><div class="form-group"><label for="games" class="input-label"> Gemovi (primer: 6:3,7:6,6:1) </label><input${ssrRenderAttr("value", unref(form).game_score)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="text"></div></div></div><div class="form-section"><h2>Vreme i lokacija</h2><div class="form-row three"><div class="form-group"><label for="date" class="input-label"> Datum (godinu dana unazad) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_datepicker, {
        "enable-time-picker": false,
        format: formatDate,
        "preview-format": formatDate,
        "onUpdate:modelValue": [($event) => handleInputs($event, true), ($event) => unref(form).date = $event],
        onClosed: ($event) => handleTemp("date"),
        id: "date",
        modelValue: unref(form).date,
        class: { "invalid": unref(form).errors.date },
        "min-date": minDate(/* @__PURE__ */ new Date()),
        "max-date": /* @__PURE__ */ new Date(),
        clearable: false,
        "year-range": [(/* @__PURE__ */ new Date()).getFullYear() - 1, (/* @__PURE__ */ new Date()).getFullYear()],
        "cancel-text": "Otkaži",
        "select-text": "Potvrdi",
        disabled: formState.submitted,
        "day-names": ["pon", "uto", "sre", "čet", "pet", "sub", "ned"]
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.date)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Opština <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: unref(opstine).data,
        type: "array",
        modelValue: unref(form).location,
        "onUpdate:modelValue": ($event) => unref(form).location = $event,
        class: { "invalid": unref(form).errors.location },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div><div class="form-group"><label for="place" class="input-label"> Teniski teren ili klub </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.courts,
        modelValue: unref(form).court,
        "onUpdate:modelValue": ($event) => unref(form).court = $event,
        class: { "invalid": unref(form).errors.court },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn" class="${ssrRenderClass({ "hide": formState.submitted })}">izmeni</span><span id="loader-submit" class="${ssrRenderClass([{ "show": formState.submitted }, "lottie-container"])}">`);
      _push(ssrRenderComponent(unref(Lottie), {
        height: 150,
        animationData: unref(CircleLoader)
      }, null, _parent));
      _push(`</span></button></div></div></form><button class="delete">obriši</button></div><!--]-->`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/EditMatch.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  __name: "EditPlayer",
  __ssrInlineRender: true,
  props: { player: Object },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const Lottie = defineAsyncComponent(() => import("vue3-lottie"));
    onMounted(() => {
      page.props["title"] = `Izmeni tenisera`;
    });
    const form = useForm({
      id: props.player.id,
      first_name: props.player.first_name,
      last_name: props.player.last_name,
      club: props.player.club,
      location: props.player.location
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Izmeni tenisera -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">izmeni tenisera</h1><form id="form"><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Ime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).first_name)} class="${ssrRenderClass({ "invalid": unref(form).errors.first_name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="first_name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.first_name)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Prezime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).last_name)} class="${ssrRenderClass({ "invalid": unref(form).errors.last_name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="last_name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.last_name)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="full-score" class="input-label"> Klub </label><input${ssrRenderAttr("value", unref(form).club)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="club" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.club)}</p></div><div class="form-group"><label for="games" class="input-label"> Lokacija </label><input${ssrRenderAttr("value", unref(form).location)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="location " type="text"></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn" class="${ssrRenderClass({ "hide": formState.submitted })}">izmeni</span><span id="loader-submit" class="${ssrRenderClass([{ "show": formState.submitted }, "lottie-container"])}">`);
      _push(ssrRenderComponent(unref(Lottie), {
        height: 150,
        animationData: unref(CircleLoader)
      }, null, _parent));
      _push(`</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/EditPlayer.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$d = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_Head = resolveComponent("Head");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Za klubove -" }, null, _parent));
  _push(`<div class="static-wrapper"><h1>DODAJ LIGU ILI TURNIR</h1><p> Klubovi mogu da nam pošalju rezultate sa svojih lokalnih liga i turnira koje možemo grupno da dodamo u bazu i samim tim dodamo sve tenisere na rang listu. </p><p> Da bi dodali više mečeva odjednom treba poslati email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a> tekst ili spreadsheet fajl koji sadrži sledeće podatke za svaki meč: ime i prezime pobednika, ime i prezime gubitnika, rezultat u setovima i gemove, datum meča, opštinu, i teren. </p><p> Ako vam je potrebna pomoć pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>. </p><p>Hvala.</p></div><!--]-->`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ForClubs.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const ForClubs = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$5]]);
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForClubs
}, Symbol.toStringTag, { value: "Module" }));
class Utils {
  constructor() {
    __publicField(this, "formatAsThousands", (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
  }
}
const utils = new Utils();
const _sfc_main$c = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "#000000",
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "800px",
    height: "800px",
    viewBox: "0 0 494.936 494.936",
    "xml:space": "preserve"
  }, _attrs))}><g><g><path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path><path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path></g></g></svg>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/EditIcon.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const EditIcon = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$4]]);
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditIcon
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    players: Array
  },
  setup(__props) {
    const utl = utils;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Rang lista -" }, null, _parent));
      _push(`<div class="rankings-wrapper"><div id="desktop"><div class="rankings-header"><div class="spacer"></div><div class="name">teniser</div><div class="spacer"></div><div class="elo">poeni</div><div class="total-matches">svi mečevi</div><div class="wins">pobede</div><div class="loses">gubitci</div><div class="win-precent">% pobeda</div><div class="place">opština</div></div><!--[-->`);
      ssrRenderList(__props.players, (player, index) => {
        _push(`<div class="ranking-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: "edit-btn",
            href: `/teniser/izmeni/${player.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(EditIcon, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(EditIcon)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([{ "first": index == 0, "second": index == 1, "third": index == 2, "align-left": index + 1 > 9 }, "rank"])}">${ssrInterpolate(index + 1)}</div><div class="name">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${player.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(player.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(player.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="spacer"></div><div class="elo">${ssrInterpolate(unref(utl).formatAsThousands(player.stats.elo))}</div><div class="total-matches">${ssrInterpolate(player.stats.total_matches)}</div><div class="wins">${ssrInterpolate(player.stats.wins)}</div><div class="loses">${ssrInterpolate(player.stats.loses)}</div><div class="win-precent">${ssrInterpolate(player.stats.win_precentage)}%</div><div class="place">${ssrInterpolate(player.location)}</div></div>`);
      });
      _push(`<!--]--></div><div id="mobile"><!--[-->`);
      ssrRenderList(__props.players, (player, index) => {
        _push(`<div class="ranking-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: "edit-btn",
            href: `/teniser/izmeni/${player.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(EditIcon, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(EditIcon)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([{ "first": index == 0, "second": index == 1, "third": index == 2, "align-left": index + 1 > 9 }, "rank"])}">${ssrInterpolate(index + 1)}</div><div class="name">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${player.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(player.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(player.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="info"><div class="info-wrapp"><div class="sup">poeni</div><div class="text">${ssrInterpolate(unref(utl).formatAsThousands(player.stats.elo))}</div></div><div class="info-wrapp"><div class="sup">% pobede</div><div class="text">${ssrInterpolate(player.stats.win_precentage)}%</div></div><div class="info-wrapp"><div class="sup">mečevi (p,g)</div><div class="text">${ssrInterpolate(player.stats.total_matches)} (${ssrInterpolate(player.stats.wins)},${ssrInterpolate(player.stats.loses)})</div></div></div><div class="place">${ssrInterpolate(player.location)}</div></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_Head = resolveComponent("Head");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Nađi tenisera -" }, null, _parent));
  _push(`<h1 class="title">nađi tenisera</h1><div class="join-wrapper"><p class="join-text"> U našim <a target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ">WhatsApp</a> i <a target="_blank" href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym">Viber</a> grupama možeš da nađeš tenisere za svoj sledeći meč </p><div class="icons-wrapper"><a class="viber" target="_blank" href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43"><defs></defs><path class="cls-1" d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z" transform="translate(-401.24 -277.78)"></path></svg></a><a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43"><defs></defs><path class="cls-1" d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z" transform="translate(-400.61 -277.64)"></path></svg></a></div></div><!--]-->`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Join.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Join = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$3]]);
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Join
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  __name: "Matches",
  __ssrInlineRender: true,
  props: {
    matches: Array,
    showMessage: Object
  },
  setup(__props) {
    const props = __props;
    const formatedMatchesDesktop = computed(() => {
      let formated = props.matches.map((match, index) => {
        return {
          ...match,
          day: getDateDay(match.date),
          date: Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Europe/Belgrade"
            // Equivalent to GMT+1 (adjust based on daylight saving time)
          }).format(new Date(match.date))
        };
      });
      return formated;
    });
    onMounted(() => {
      console.log(props.matches);
    });
    const formatedMatchesMobile = computed(() => {
      let formated = props.matches.map((match, index) => {
        return {
          ...match,
          winner_first_name: match.winner.split(" ")[0],
          winner_last_name: match.winner.split(" ")[1],
          loser_first_name: match.loser.split(" ")[0],
          loser_last_name: match.loser.split(" ")[1],
          day: getDateDay(match.date),
          date: Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Europe/Belgrade"
            // Equivalent to GMT+1 (adjust based on daylight saving time)
          }).format(new Date(match.date))
        };
      });
      return formated;
    });
    function getDateDay(date) {
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let day = new Date(date).getDay();
      return days[day];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Mečevi -" }, null, _parent));
      _push(`<div class="matches-wrapper"><div id="desktop"><div class="matches-header"><div class="spacer number">#</div><div class="winner">pobednik</div><div class="loser">gubitnik</div><div class="spacer"></div><div class="score">rezultat</div><div class="date">datum</div><div class="location">opština</div><div class="location">teren</div></div>`);
      if (props.showMessage) {
        _push(`<div>`);
        if (props.showMessage.wins) {
          _push(`<p class="message">Ovaj teniser nikada nije pobedio 🙁</p>`);
        } else {
          _push(`<!---->`);
        }
        if (props.showMessage.loses) {
          _push(`<p class="message">Ovaj teniser nikada nije izgubio 🙂</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(formatedMatchesDesktop.value, (match, index) => {
        _push(`<div class="match-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: "edit-btn",
            href: `/izmeni/${match.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(EditIcon, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(EditIcon)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="number">${ssrInterpolate(match.number || __props.matches.length - index)}</div><div class="winner">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${match.winner_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.winner)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.winner), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<br><span class="points">+${ssrInterpolate(match.winner_points)}</span></div><div class="loser">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${match.loser_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.loser)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.loser), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<br><span class="points">+${ssrInterpolate(match.loser_points)}</span></div><div class="spacer"></div><div class="score">${ssrInterpolate(match.set_score)}<br><span class="gray">${ssrInterpolate(match.game_score)}</span></div><div class="date">${ssrInterpolate(match.day)} <br> ${ssrInterpolate(match.date)}</div><div class="location">${ssrInterpolate(match.location)}</div><div class="location">`);
        if (match.court.link == "") {
          _push(`<!--[-->${ssrInterpolate(match.court.name)}<!--]-->`);
        } else {
          _push(`<a target="_blank"${ssrRenderAttr("href", match.court.link)}>${ssrInterpolate(match.court.name)}</a>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div id="mobile">`);
      if (props.showMessage) {
        _push(`<div>`);
        if (props.showMessage.wins) {
          _push(`<p class="message">Ovaj teniser nikada nije pobedio 🙁</p>`);
        } else {
          _push(`<!---->`);
        }
        if (props.showMessage.loses) {
          _push(`<p class="message">Ovaj teniser nikada nije izgubio 🙂</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(formatedMatchesMobile.value, (match, index) => {
        _push(`<div class="match-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: "edit-btn",
            href: `/izmeni/${match.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(EditIcon, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(EditIcon)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="score">${ssrInterpolate(match.set_score)} <br><span class="games">${ssrInterpolate(match.game_score)}</span></div><div class="info"><div class="info-wrapp"><div class="text">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${match.winner_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.winner_first_name)}<br${_scopeId}>${ssrInterpolate(match.winner_last_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.winner_first_name), 1),
                createVNode("br"),
                createTextVNode(toDisplayString(match.winner_last_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<br><span class="points">+${ssrInterpolate(match.winner_points)}</span></div></div><div class="sep">:</div><div class="info-wrapp"><div class="text">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${match.loser_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.loser_first_name)}<br${_scopeId}>${ssrInterpolate(match.loser_last_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.loser_first_name), 1),
                createVNode("br"),
                createTextVNode(toDisplayString(match.loser_last_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<br><span class="points">+${ssrInterpolate(match.loser_points)}</span></div></div></div><div class="location"> #${ssrInterpolate(match.number || __props.matches.length - index)}, ${ssrInterpolate(match.day)} ${ssrInterpolate(match.date)} <br>`);
        if (match.court.id == 1) {
          _push(`<!--[-->${ssrInterpolate(match.location)}<!--]-->`);
        } else {
          _push(`<!--[-->${ssrInterpolate(match.location)}, `);
          if (match.court.link !== "") {
            _push(`<a target="_blank"${ssrRenderAttr("href", match.court.link)}>${ssrInterpolate(match.court.name)}</a>`);
          } else {
            _push(`<span>${ssrInterpolate(match.court.name)}</span>`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Matches.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$9
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Head = resolveComponent("Head");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Misija -" }, null, _parent));
  _push(`<div class="static-wrapper"><h1>MISIJA</h1><p> Misija Srpske Teniske Lige je skupljame svih relevantnih podataka rekreativnog tenisa u Srbiji. </p><p> Skupljanje, javni prikaz i analiza ovih podataka će da dalje razviju rekreativni tenis u korist tenisera, klubova, terena, i firmi. </p><p><a target="_blank" href="https://www.linkedin.com/in/nikolatosic/">Nikola Tošić</a>, osnivač, <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a><br> Bogdan Ranđelović, programer, <a href="mailto:bogdan@openinnovation.me">bogdan@openinnovation.me</a><br><a target="_blank" href="https://ivanjureta.com">Ivan Jureta</a>, savetnik za algoritam </p></div><!--]-->`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Mision.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Mision = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$2]]);
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mision
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "PlayerChart",
  __ssrInlineRender: true,
  props: {
    player_id: Number,
    data: Array
  },
  setup(__props) {
    const props = __props;
    const VueApexCharts = defineAsyncComponent(() => import("vue3-apexcharts"));
    const data2 = reactive({
      playerData: props.data
    });
    onBeforeMount(() => {
    });
    const formatDate = (d2) => {
      let date = new Date(d2);
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
    reactive({
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        min: 0,
        max: 1e3,
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: []
        }
      },
      colors: ["#008FFB"]
    });
    const points = computed(() => {
      if (data2.playerData.points) {
        let array = [];
        data2.playerData.points.forEach((entry) => {
          array.push({
            x: formatDate(entry.date),
            y: entry.points
          });
        });
        return [{
          data: array,
          name: "Poeni",
          title: {
            text: "Poeni",
            align: "center"
          }
        }];
      } else {
        return [{ data: [] }];
      }
    });
    const ranks = computed(() => {
      if (data2.playerData.rankings) {
        let array = [];
        data2.playerData.rankings.forEach((entry) => {
          array.push({
            x: formatDate(entry.date),
            y: entry.rank
          });
        });
        return [{
          data: array,
          name: "Rang",
          title: {
            text: "Poeni",
            align: "center"
          }
        }];
      } else {
        return [{ data: [] }];
      }
    });
    const chartOptions = {
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        min: 0,
        max: data2.playerData.maxPoints || void 0,
        dataLabels: {
          enabled: true
        }
      },
      colors: ["#c6373d"],
      noData: {
        text: "grafikon se učitava",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 7,
        style: {
          color: "#8f8f8f",
          fontSize: "15px",
          fontFamily: "Helvetica Neue",
          zIndex: 5
        }
      },
      yaxis: {
        min: 0
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: true
        }
      },
      title: {
        text: "poeni",
        align: "center",
        style: {
          fontSize: "17px",
          color: "#8f8f8f",
          fontFamily: "Arial",
          fontWeight: "normal"
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
    const maxRank = reactive(() => {
      return data2.playerData.maxRank || 5;
    });
    const chartOptionsLine2 = {
      chart: {
        id: "tw",
        group: "social",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      yaxis: {
        reversed: true,
        min: 1,
        max: maxRank
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      colors: ["#0d4075"],
      noData: {
        text: "grafikon se učitava",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 7,
        style: {
          color: "#8f8f8f",
          fontSize: "15px",
          fontFamily: "Helvetica Neue",
          zIndex: 5
        }
      },
      title: {
        text: "rang",
        align: "center",
        style: {
          fontSize: "17px",
          color: "#8f8f8f",
          fontFamily: "Arial",
          fontWeight: "normal"
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "wrapper" }, _attrs))}><div id="chart-line">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "line",
        height: "200",
        options: chartOptions,
        series: points.value
      }, null, _parent));
      _push(`</div><div id="chart-line2">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "line",
        height: "200",
        options: chartOptionsLine2,
        series: ranks.value
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/PlayerChart.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "Player",
  __ssrInlineRender: true,
  props: { player: Object },
  setup(__props) {
    const props = __props;
    const page = usePage();
    onMounted(() => {
      page.props["title"] = "teniser";
    });
    const matchups = computed(() => {
      return {
        wins: Object.values(props.player.data.matchups.wins),
        loses: Object.values(props.player.data.matchups.loses),
        not_played: props.player.data.matchups.notPlayedWith
      };
    });
    const locations = computed(() => {
      return {
        courts: props.player.data.locations.courts,
        locations: props.player.data.locations.locations,
        leagues: props.player.data.locations.leagues
      };
    });
    const getInteractionText = (number) => {
      if (number == 1 || number > 20 && number % 10 == 1) {
        return "teniserom";
      } else return "tenisera";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      const _component_MatchTable = resolveComponent("MatchTable");
      const _component_Head = resolveComponent("Head");
      _push(`<!--[--><div style="${ssrRenderStyle({ "margin-bottom": "-20px", "padding-bottom": "0" })}" class="static-wrapper player"><div class="${ssrRenderClass([{
        first: props.player.data.position == 1,
        second: props.player.data.position == 2,
        third: props.player.data.position == 3
      }, "rank"])}"><p class="${ssrRenderClass({ "align-left": props.player.data.position > 9 })}">${ssrInterpolate(props.player.data.position)}</p></div><h1>${ssrInterpolate(props.player.data.name)}`);
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(_component_Link, {
          class: "edit-btn",
          href: `/teniser/izmeni/${props.player.data.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(EditIcon, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(EditIcon)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</h1>`);
      if (!__props.player.club && !__props.player.location) {
        _push(`<p class="subtitle-spacer">   </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="subtitle">${ssrInterpolate(__props.player.club)}${ssrInterpolate(__props.player.club ? ", " : " ")}${ssrInterpolate(__props.player.location)}</p><div class="dashboard-wrapper"><h2 class="summary-title">Statistika</h2><div class="summary player five desktop"><div class="summary-item"><h2>poeni</h2><p>${ssrInterpolate(unref(utils).formatAsThousands(props.player.data.stats.elo))}</p></div><div class="summary-item"><h2>svi mečevi</h2><p>${ssrInterpolate(props.player.data.stats.total_matches)}</p></div><div class="summary-item"><h2>pobede</h2><p>${ssrInterpolate(props.player.data.stats.wins)}</p></div><div class="summary-item"><h2>gubitci</h2><p>${ssrInterpolate(props.player.data.stats.loses)}</p></div><div class="summary-item"><h2>% pobeda</h2><p>${ssrInterpolate(props.player.data.stats.win_precentage)}%</p></div></div><div class="summary player five mobile"><div class="summary-item half"><h2>poeni</h2><p>${ssrInterpolate(unref(utils).formatAsThousands(props.player.data.stats.elo))}</p></div><div class="summary-item"><h2>% pobeda</h2><p>${ssrInterpolate(props.player.data.stats.win_precentage)}%</p></div><div class="summary-item"><h2>svi mečevi</h2><p>${ssrInterpolate(props.player.data.stats.total_matches)}</p></div><div class="summary-item"><h2>pobede</h2><p>${ssrInterpolate(props.player.data.stats.wins)}</p></div><div class="summary-item"><h2>gubitci</h2><p>${ssrInterpolate(props.player.data.stats.loses)}</p></div></div><h2 class="summary-title">Teniseri</h2><div class="summary player three col"><div class="summary-item players">`);
      if (matchups.value.wins.length > 0) {
        _push(`<!--[--><h2>pobedio ${ssrInterpolate(matchups.value.wins.length)} tenisera</h2><!--[-->`);
        ssrRenderList(matchups.value.wins, (player) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            href: `/${player.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(player.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(player.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(` (${ssrInterpolate(player.number)}) </p>`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<h2>ovaj teniser nikada nije pobedio 🙁</h2>`);
      }
      _push(`</div><div class="summary-item players">`);
      if (matchups.value.loses.length > 0) {
        _push(`<!--[--><h2>izgubio od ${ssrInterpolate(matchups.value.loses.length)} tenisera</h2><!--[-->`);
        ssrRenderList(matchups.value.loses, (player) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            href: `/${player.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(player.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(player.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(` (${ssrInterpolate(player.number)}) </p>`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<h2>ovaj teniser nikada nije izgubio 🙂</h2>`);
      }
      _push(`</div><div class="summary-item players">`);
      if (matchups.value.not_played.length > 0) {
        _push(`<!--[--><h2>nije igrao sa ${ssrInterpolate(matchups.value.not_played.length)} ${ssrInterpolate(getInteractionText(matchups.value.not_played.length))}</h2><!--[-->`);
        ssrRenderList(matchups.value.not_played, (player) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            href: `/${player.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(player.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(player.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</p>`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<h2>ovaj teniser je igrao sa svima 🙂</h2>`);
      }
      _push(`</div></div><h2 class="summary-title">lokacije</h2><div class="summary player three col"><div class="summary-item players"><h2>najaktivnije opštine</h2><!--[-->`);
      ssrRenderList(locations.value.locations, (location) => {
        _push(`<p>${ssrInterpolate(location.name)} (${ssrInterpolate(location.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item players"><h2>najkorišćeniji tereni</h2><!--[-->`);
      ssrRenderList(locations.value.courts, (court) => {
        _push(`<p>`);
        if (court.link != "") {
          _push(`<a target="&#39;_blank&#39;"${ssrRenderAttr("href", court.link)}>${ssrInterpolate(court.name)}</a>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(court.name)}<!--]-->`);
        }
        _push(` (${ssrInterpolate(court.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item players">`);
      if (locations.value.leagues.length > 0) {
        _push(`<!--[--><h2>najaktivnije lige</h2><!--[-->`);
        ssrRenderList(locations.value.leagues, (league) => {
          _push(`<p>`);
          if (league.link != "") {
            _push(`<a target="&#39;_blank&#39;"${ssrRenderAttr("href", league.link)}>${ssrInterpolate(league.name)}</a>`);
          } else {
            _push(`<!--[-->${ssrInterpolate(league.name)}<!--]-->`);
          }
          _push(` (${ssrInterpolate(league.count)}) </p>`);
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<h2>ovaj teniser nije učestvovao u ligama 🙁</h2>`);
      }
      _push(`</div></div><h2 class="summary-title">Grafikoni</h2><div class="chart-wrapper">`);
      _push(ssrRenderComponent(_sfc_main$7, {
        data: props.player.charts,
        player_id: props.player.data.id
      }, null, _parent));
      _push(`</div><h2 class="summary-title no-border low-margin">pobede</h2><div class="player-matches">`);
      _push(ssrRenderComponent(_component_MatchTable, {
        showMessage: { wins: props.player.data.wins == 0 },
        matches: props.player.data.wins
      }, null, _parent));
      _push(`</div><h2 class="summary-title no-border low-margin">gubitci</h2><div class="player-matches">`);
      _push(ssrRenderComponent(_component_MatchTable, {
        showMessage: { loses: props.player.data.loses == 0 },
        matches: props.player.data.loses
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_Head, {
        title: `${props.player.data.name} -`
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Player.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Head = resolveComponent("Head");
  const _component_Link = resolveComponent("Link");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Pravila -" }, null, _parent));
  _push(`<div class="static-wrapper"><h1>PRAVILA</h1><p>Srpsku Tenis Ligu je osnovao Nikola Tošić 9 decembra 2024.</p><p>Cilj lige je da motiviše sve amatere u Srbiji da igraju više. Svako može da učestvuje, dovoljno je da dokumentuje jedan meč i biće rangiran. Liga nema kvalifikacije i besplatna je.</p><p>Da bi meč bio prihvaćen on mora da ima barem jednog takmičara koji je građanin Republike Srbije ili da se odigra na teritoriji Republike Srbije. Znači meč između građanina Srbije i stranca u stranoj državi može da bude dodat u Ligu. Takođe meč između dva stranca u Srbiji može da bude dodat.</p><p>Srpska Tenis Liga je besplatna fleksi liga - nema nikakve naplate, rokove, obaveze, niti format takmičenja. Na učesnicima je da igraju više, dodaju svoje mečeve i samim tim poboljšavaju svoj rang. Liga konstantno traje bez definisanog kraja i rang tenisera će se konstantno menjati.</p><p>Svi formati bodovanja mečeva su prihvaćeni dokle god je rezultat pobednika barem 4 gema. Znači minimalni rezultat da bi meč bio dokumentovan je 4:0. Primeri formata bodovanja su setovi do 4 gema, setovi do 6 gema, meč do 9 gemova, ili meč na vreme sa minimalnim rezultatom od 4:0.</p><p>Tie break treba da se doda kao jedan gem. Na primer, ako se u meču od 5:5 igra tie break koji je 10:8, onda se upisuje rezultat 6:5.</p><p>Rang tenisera se kalkulise dodavanjem poena za svaki pobedu, gubitak, i osvojeni gem. Dakle, izgubljeni meč takođe nosi poene, kao i gemovi koje je osvojio gubitnik. Ako ista dva tenisera igraju više puta u istih 30 dana onda dobijaju manje poena nego da su igrali sa različitim teniserima. Takođe dobijeni poeni opadaju za 10 % svakih 30 dana od dana meča. CIlj ovih pravila je da se motiviše što više igranja (čak i ako se gubi), da se nagrade gubitnici za osvojene gemove, a i da se motiviše različitost u izboru tenisera i konstantno igranje.</p><p>Za sada se rangiraju samo singles mečevi.</p><p>Muškarci i žene svih uzrasta se rangiraju zajedno.</p><p>Mečevi se dokumentuju tako što se dodaju preko `);
  _push(ssrRenderComponent(_component_Link, {
    href: _ctx.route("addMatch")
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`dodaj meč forme`);
      } else {
        return [
          createTextVNode("dodaj meč forme")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`. Može da se doda bilo koji meč igran bilo gde 12 meseci pre dodavanja.</p><p>Ako se dodaju više mečeva odjednom kontaktirajte Nikolu na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.</p><p>Ako imate predlog za poboljšanje Srpske Tenis Liga pošaljite Nikoli na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.</p></div><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rules.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Rules = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rules
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "LeagueChart",
  __ssrInlineRender: true,
  props: {
    data: Object
  },
  setup(__props) {
    const VueApexCharts = defineAsyncComponent(() => import("vue3-apexcharts"));
    const props = __props;
    const data2 = reactive({
      leagueData: props.data
    });
    onBeforeMount(() => {
    });
    const formatDate = (d2) => {
      let date = new Date(d2);
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
    const points = computed(() => {
      if (data2.leagueData.points) {
        let array = [];
        data2.leagueData.points.forEach((entry) => {
          array.push({
            x: formatDate(entry.date),
            y: entry.points
          });
        });
        return [{
          data: array,
          name: "Poeni",
          title: {
            text: "Poeni",
            align: "center"
          }
        }];
      } else {
        return [{ data: [] }];
      }
    });
    const players = computed(() => {
      if (data2.leagueData.players) {
        let array = [];
        data2.leagueData.players.forEach((entry) => {
          array.push({
            x: formatDate(entry.date),
            y: entry.players
          });
        });
        return [{
          data: array,
          name: "Teniseri"
        }];
      } else {
        return [{ data: [] }];
      }
    });
    const matches = computed(() => {
      if (data2.leagueData.matches) {
        let array = [];
        data2.leagueData.matches.forEach((entry) => {
          array.push({
            x: formatDate(entry.date),
            y: entry.matches
          });
        });
        return [{
          data: array,
          name: "Mečevi"
        }];
      } else {
        return [{ data: [] }];
      }
    });
    const chartOptions = {
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        min: 0,
        max: data2.leagueData.maxPoints || void 0,
        dataLabels: {
          enabled: true
        }
      },
      colors: ["#c6373d"],
      noData: {
        text: "grafikon se učitava",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 7,
        style: {
          color: "#8f8f8f",
          fontSize: "15px",
          fontFamily: "Helvetica Neue",
          zIndex: 5
        }
      },
      yaxis: {
        min: 0
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: true
        }
      },
      title: {
        text: "poeni",
        align: "center",
        style: {
          fontSize: "17px",
          color: "#8f8f8f",
          fontFamily: "Arial",
          fontWeight: "normal"
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
    const maxRank = reactive(() => {
      return data2.leagueData.maxRank || 10;
    });
    const chartOptionsLine2 = {
      chart: {
        id: "tw",
        group: "social",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      yaxis: {
        min: 2,
        max: maxRank,
        forceNiceScale: true
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      colors: ["#0d4075"],
      noData: {
        text: "grafikon se učitava",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 7,
        style: {
          color: "#8f8f8f",
          fontSize: "15px",
          fontFamily: "Helvetica Neue",
          zIndex: 5
        }
      },
      title: {
        text: "teniseri",
        align: "center",
        style: {
          fontSize: "17px",
          color: "#8f8f8f",
          fontFamily: "Arial",
          fontWeight: "normal"
        }
      }
    };
    const chartOptionsLine3 = {
      chart: {
        id: "tw",
        group: "social",
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      yaxis: {
        min: 1
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      colors: ["#8f8f8f"],
      noData: {
        text: "grafikon se učitava",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 7,
        style: {
          color: "#8f8f8f",
          fontSize: "15px",
          fontFamily: "Helvetica Neue",
          zIndex: 5
        }
      },
      title: {
        text: "mečevi",
        align: "center",
        style: {
          fontSize: "17px",
          color: "#8f8f8f",
          fontFamily: "Arial",
          fontWeight: "normal"
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "wrapper" }, _attrs))}><div id="chart-line">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "line",
        height: "300",
        options: chartOptions,
        series: points.value
      }, null, _parent));
      _push(`</div><div id="chart-line2">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "line",
        height: "300",
        options: chartOptionsLine2,
        series: players.value
      }, null, _parent));
      _push(`</div><div id="chart-line3">`);
      _push(ssrRenderComponent(unref(VueApexCharts), {
        type: "line",
        height: "300",
        options: chartOptionsLine3,
        series: matches.value
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/LeagueChart.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Statistics",
  __ssrInlineRender: true,
  props: { data: Object },
  setup(__props) {
    const props = __props;
    const page = usePage();
    onMounted(() => {
      page.props["title"] = "statistika";
    });
    const locations = computed(() => {
      return {
        courts: props.data.stats.locations.courts,
        locations: props.data.stats.locations.locations,
        leagues: props.data.stats.locations.leagues
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Statistika -" }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ "padding-bottom": "0", "margin-bottom": "60px" })}" class="static-wrapper player"><div class="dashboard-wrapper"><h1 class="hide-mobile">Statistika</h1><h2 class="summary-title">ukupno</h2><div class="summary player three desktop"><div class="summary-item"><h2>poeni</h2><p>${ssrInterpolate(unref(utils).formatAsThousands(props.data.stats.totals.points))}</p></div><div class="summary-item"><h2>teniseri</h2><p>${ssrInterpolate(props.data.stats.totals.players)}</p></div><div class="summary-item"><h2>mečevi</h2><p>${ssrInterpolate(props.data.stats.totals.matches)}</p></div></div><h2 class="summary-title">teniseri</h2><div class="summary player three desktop col"><div class="summary-item"><h2 class="mb-10">najviše mečeva</h2><!--[-->`);
      ssrRenderList(props.data.stats.players.total, (player) => {
        _push(`<p class="smaller f20">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${player.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(player.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(player.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` (${ssrInterpolate(player.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item"><h2 class="mb-10">najviše pobeda</h2><!--[-->`);
      ssrRenderList(props.data.stats.players.wins, (player) => {
        _push(`<p class="smaller f20">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${player.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(player.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(player.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` (${ssrInterpolate(player.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item"><h2 class="mb-10">najviše gubitaka</h2><!--[-->`);
      ssrRenderList(props.data.stats.players.loses, (player) => {
        _push(`<p class="smaller f20">`);
        _push(ssrRenderComponent(_component_Link, {
          href: `/${player.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(player.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(player.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` (${ssrInterpolate(player.count)}) </p>`);
      });
      _push(`<!--]--></div></div><h2 class="summary-title big-margin">lokacije</h2><div class="summary player three desktop col"><div class="summary-item"><h2 class="mb-10">najaktivnije opštine</h2><!--[-->`);
      ssrRenderList(locations.value.locations, (location) => {
        _push(`<p class="smaller f20">${ssrInterpolate(location.name)} (${ssrInterpolate(location.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item"><h2 class="mb-10">najkorišćeniji tereni</h2><!--[-->`);
      ssrRenderList(locations.value.courts, (court) => {
        _push(`<p class="smaller f20">`);
        if (court.link != "") {
          _push(`<a target="&#39;_blank&#39;"${ssrRenderAttr("href", court.link)}>${ssrInterpolate(court.name)}</a>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(court.name)}<!--]-->`);
        }
        _push(` (${ssrInterpolate(court.count)})</p>`);
      });
      _push(`<!--]--></div><div class="summary-item">`);
      if (locations.value.leagues.length == 0) {
        _push(`<h2 class="mb-10">nema liga ili turnira</h2>`);
      } else {
        _push(`<!--[--><h2 class="mb-10">najaktivnije lige</h2><!--[-->`);
        ssrRenderList(locations.value.leagues, (league) => {
          _push(`<p class="smaller f20">`);
          if (league.link != "") {
            _push(`<a target="&#39;_blank&#39;"${ssrRenderAttr("href", league.link)}>${ssrInterpolate(league.name)}</a>`);
          } else {
            _push(`<!--[-->${ssrInterpolate(league.name)}<!--]-->`);
          }
          _push(` (${ssrInterpolate(league.count)})</p>`);
        });
        _push(`<!--]--><!--]-->`);
      }
      _push(`</div></div><h2 class="summary-title big-margin">Grafikoni</h2>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        data: props.data.charts
      }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Statistics.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    options: Array,
    label: String,
    value: String,
    multiple: Boolean,
    shouldReset: Boolean,
    type: String,
    canAdd: Boolean,
    disabledOption: Object
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    getCurrentInstance();
    onBeforeMount(() => {
      if (model.value && model.value.name && model.value.name != "") {
        state.search = model.value.name;
      }
      if (model.value && !model.value.name && model.value.name !== "")
        state.search = model.value;
    });
    const props = __props;
    watch(
      () => props.shouldReset,
      (value) => {
        console.log("reset");
        if (value) {
          state.search = "";
          model.value = null;
          props.shouldReset = false;
        }
      }
    );
    const state = reactive({
      isOpen: false,
      search: "",
      searching: false,
      selectedIndex: 0,
      isBlured: false,
      options: props.options
    });
    const filteredOptions = computed(() => {
      if (state.search === "" || model.value && model.value.name == "")
        return state.options;
      if (props.type !== "array")
        return state.options.filter(
          (option) => option[props.label].toLowerCase().includes(state.search.toLowerCase())
        );
      else
        return state.options.filter(
          (option) => option.toLowerCase().includes(state.search.toLowerCase())
        );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dropdown-wrapper" }, _attrs))}><input type="text"${ssrRenderAttr("value", state.search)}><div class="${ssrRenderClass([{ open: state.isOpen }, "dropdown"])}"><ul><!--[-->`);
      ssrRenderList(filteredOptions.value, (option, index) => {
        _push(`<li class="${ssrRenderClass({
          spacer: option == "dropdown-spacer" || option.name == "dropdown-spacer",
          disabled: props.disabledOption && props.disabledOption.id == option.id,
          hovered: state.selectedIndex == index && (!props.disabledOption || props.disabledOption.id != option.id)
        })}">`);
        if (option == "dropdown-spacer" || option.name == "dropdown-spacer") {
          _push(`<div class="spacer"></div>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(props.type == "array" ? option : option[props.label])}<!--]-->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="${ssrRenderClass([{ open: state.isOpen }, "arrow"])}"><svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><g><polygon points="8 3 5 7 2 3 8 3"></polygon></g></svg></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/Dropdown.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    version: "1.1",
    id: "Layer_1",
    x: "0px",
    y: "0px",
    viewBox: "0 0 511.66 63.73",
    style: { "enable-background": "new 0 0 511.66 63.73" }
  }, _attrs))}><g><g><path class="st0" d="M22.6,9.68c-0.51-3.96-4.31-4.39-7.63-4.39c-3.41,0-5.63,1.54-5.63,3.58c0,1.62,1.36,2.51,3.5,2.86
			l10.36,1.66c5.54,0.9,9.76,2.98,9.76,8.53c0,5.67-3.84,10.23-15.82,10.23C9.72,32.15,0.09,31.21,0,21.71h9.29
			c0.08,4.18,4.26,4.9,7.84,4.9c3.88,0,6.52-1.15,6.52-3.79c0-2.34-1.88-2.98-5.16-3.5l-7.55-1.15c-5.29-0.81-10.4-2.39-10.4-8.61
			c0-6.78,5.54-9.55,15.09-9.55c6.27,0,15.56,1.07,16.12,9.68H22.6z"></path><path class="st0" d="M36.76,0.86h22.13c8.44,0,9.85,5.16,9.85,8.27c0,3.71-1.49,6.1-4.95,7.33v0.09c3.62,0.55,4.18,5.16,4.18,8.14
			c0,1.49,0.13,5.07,1.58,6.61H60.5c-0.77-1.41-0.81-2.64-0.81-5.84c0-4.26-1.83-5.33-4.39-5.33H45.03V31.3h-8.27V0.86z
			 M45.03,14.33h10.96c1.83,0,3.96-1.02,3.96-3.88c0-3.03-2.39-3.79-4.39-3.79H45.03V14.33z"></path><path class="st0" d="M73.08,0.86h20.46c8.65,0,10.74,5.16,10.74,9.25c0,6.48-3.41,10.32-10.1,10.32H81.35V31.3h-8.27V0.86z
			 M81.35,14.88h8.87c2.56,0,5.54-0.08,5.54-4.18c0-3.96-2.43-4.31-4.77-4.31h-9.64V14.88z"></path><path class="st0" d="M129.19,9.68c-0.51-3.96-4.31-4.39-7.63-4.39c-3.41,0-5.63,1.54-5.63,3.58c0,1.62,1.36,2.51,3.5,2.86
			l10.36,1.66c5.54,0.9,9.76,2.98,9.76,8.53c0,5.67-3.84,10.23-15.82,10.23c-7.42,0-17.05-0.94-17.14-10.45h9.29
			c0.08,4.18,4.26,4.9,7.84,4.9c3.88,0,6.52-1.15,6.52-3.79c0-2.34-1.88-2.98-5.16-3.5l-7.55-1.15c-5.29-0.81-10.4-2.39-10.4-8.61
			c0-6.78,5.54-9.55,15.09-9.55c6.27,0,15.56,1.07,16.12,9.68H129.19z"></path><path class="st0" d="M165.78,0.86h11.13l-13.98,12.24l15.05,18.2H166.8l-10.36-13.17l-4.82,4.14v9.04h-8.27V0.86h8.27v13.09
			L165.78,0.86z"></path><path class="st0" d="M202.32,25.03h-13.98l-2.47,6.27h-8.91l13.39-30.44h9.98L213.7,31.3h-8.91L202.32,25.03z M195.33,7.42
			l-4.77,12.07h9.55L195.33,7.42z"></path></g></g><g><g><path class="st1" d="M234.35,6.79h-11.3V1h30.87v5.8h-11.3v24.64h-8.27V6.79z"></path><path class="st1" d="M256.78,1h28.44v5.8h-20.17v6.31h19.14v5.54h-19.14v6.99h20.34v5.8h-28.61V1z"></path><path class="st1" d="M315.62,1h8.01v30.44h-9L298.05,10.2h-0.08v21.23h-8.01V1h9.59l15.99,21.23h0.09V1z"></path><path class="st1" d="M329.43,1h8.27v30.44h-8.27V1z"></path><path class="st1" d="M364.1,9.82c-0.51-3.97-4.31-4.39-7.63-4.39c-3.41,0-5.63,1.54-5.63,3.58c0,1.62,1.36,2.52,3.5,2.86
			l10.36,1.66c5.54,0.89,9.76,2.98,9.76,8.53c0,5.67-3.84,10.23-15.82,10.23c-7.42,0-17.05-0.94-17.14-10.44h9.29
			c0.08,4.18,4.26,4.9,7.84,4.9c3.88,0,6.52-1.15,6.52-3.79c0-2.34-1.88-2.98-5.16-3.5l-7.55-1.15c-5.29-0.81-10.4-2.39-10.4-8.61
			c0-6.78,5.54-9.55,15.09-9.55c6.27,0,15.56,1.07,16.12,9.68H364.1z"></path></g></g><g><g><path class="st2" d="M393.3,0.99h8.27v24.39h18.54v6.05H393.3V0.99z"></path><path class="st2" d="M424.08,0.99h8.27v30.44h-8.27V0.99z"></path><path class="st2" d="M457.42,14.47h15.52v16.97h-4.18l-1.11-3.54c-2.9,3.11-7.5,4.39-12.79,4.39c-11.08,0-17.99-4.77-17.99-16.07
			c0-9.42,6.48-16.07,17.99-16.07c8.44,0,16.41,2.47,17.91,10.83h-9.21c-1.24-3.92-4.78-5.03-7.76-5.03
			c-7.5,0-10.15,5.54-10.15,10.27c0,4.73,2.64,10.28,10.15,10.28c4.52,0,8.02-1.71,9-6.74h-7.38V14.47z"></path><path class="st2" d="M500.28,25.17h-13.98l-2.47,6.27h-8.91L488.3,0.99h9.98l13.39,30.44h-8.91L500.28,25.17z M493.29,7.56
			l-4.78,12.06h9.55L493.29,7.56z"></path></g></g><g><g><path class="st3" d="M54.8,54.48c0,1.06,0.86,2.36,3.71,2.36c2.88,0,3.6-1.01,3.6-1.85c0-0.83-0.43-1.33-2.23-1.58l-3.71-0.5
			c-1.71-0.25-3.2-1.28-3.2-3.13c0-2.41,2.05-3.8,5.38-3.8c3.85,0,5.58,1.67,5.76,3.96h-2.25c-0.07-1.19-1.19-2.21-3.53-2.21
			c-1.44,0-3.11,0.43-3.11,1.8c0,0.79,0.36,1.26,1.96,1.46l3.2,0.43c2.97,0.43,4.12,1.49,4.12,3.13c0,2.75-2.32,4.03-5.92,4.03
			c-2.7,0-5.78-0.7-6.03-4.12H54.8z"></path><path class="st3" d="M66.57,46.4h2.25v2.16h0.04C69.92,46.7,71.41,46,72.91,46c0.56,0,0.86,0.02,1.28,0.13v2.43
			c-0.56-0.16-0.99-0.23-1.6-0.23c-2.23,0-3.78,1.33-3.78,3.87v5.99h-2.25V46.4z"></path><path class="st3" d="M75.72,46.4h2.25v1.64h0.04c0.88-1.24,2.75-1.91,4.48-1.91c3.53,0,6.41,2.27,6.41,6.23s-2.88,6.23-6.41,6.23
			c-1.76,0-3.58-0.65-4.48-1.91h-0.04v6.05h-2.25V46.4z M82.21,48.03c-3.06,0-4.37,2.09-4.37,4.34c0,2.7,1.76,4.34,4.37,4.34
			c2.63,0,4.32-1.62,4.32-4.34C86.53,50.12,85.24,48.03,82.21,48.03z"></path><path class="st3" d="M92.71,54.48c0,1.06,0.86,2.36,3.71,2.36c2.88,0,3.6-1.01,3.6-1.85c0-0.83-0.43-1.33-2.23-1.58l-3.71-0.5
			c-1.71-0.25-3.2-1.28-3.2-3.13c0-2.41,2.05-3.8,5.38-3.8c3.85,0,5.58,1.67,5.76,3.96h-2.25c-0.07-1.19-1.19-2.21-3.53-2.21
			c-1.44,0-3.11,0.43-3.11,1.8c0,0.79,0.36,1.26,1.96,1.46l3.2,0.43c2.97,0.43,4.12,1.49,4.12,3.13c0,2.75-2.32,4.03-5.92,4.03
			c-2.7,0-5.78-0.7-6.03-4.12H92.71z"></path><path class="st3" d="M112.9,46.4h3.42l-5.54,4.43l5.96,7.36h-3.06l-4.7-5.9l-2.07,1.64v4.25h-2.25V41.99h2.25v9.45L112.9,46.4z"></path><path class="st3" d="M117.82,41.99h2.25v2.48h-2.25V41.99z M117.82,46.4h2.25V58.2h-2.25V46.4z"></path><path class="st3" d="M130.33,46.4h2.25v2.16h0.04c1.06-1.87,2.54-2.57,4.05-2.57c0.56,0,0.86,0.02,1.28,0.13v2.43
			c-0.56-0.16-0.99-0.23-1.6-0.23c-2.23,0-3.78,1.33-3.78,3.87v5.99h-2.25V46.4z"></path><path class="st3" d="M141.36,52.98c0.18,2.45,2.34,3.74,4.34,3.74c1.28,0,3.02-0.41,3.8-2.09h2.39c-1.15,2.81-3.74,3.98-6.08,3.98
			c-4.59,0-6.84-2.9-6.84-6.3s2.25-6.3,6.84-6.3c3.11,0,6.39,1.8,6.39,6.68v0.29H141.36z M149.82,51.22c-0.36-2.14-2-3.33-4.12-3.33
			c-2.07,0-3.92,1.24-4.28,3.33H149.82z"></path><path class="st3" d="M162.91,46.4h3.42l-5.54,4.43l5.96,7.36h-3.06l-4.7-5.9l-2.07,1.64v4.25h-2.25V41.99h2.25v9.45L162.91,46.4z"></path><path class="st3" d="M167.84,46.4h2.25v2.16h0.04c1.06-1.87,2.54-2.57,4.05-2.57c0.56,0,0.86,0.02,1.28,0.13v2.43
			c-0.56-0.16-0.99-0.23-1.6-0.23c-2.23,0-3.78,1.33-3.78,3.87v5.99h-2.25V46.4z"></path><path class="st3" d="M178.86,52.98c0.18,2.45,2.34,3.74,4.34,3.74c1.28,0,3.02-0.41,3.8-2.09h2.39c-1.15,2.81-3.74,3.98-6.08,3.98
			c-4.59,0-6.84-2.9-6.84-6.3s2.25-6.3,6.84-6.3c3.11,0,6.39,1.8,6.39,6.68v0.29H178.86z M187.32,51.22c-0.36-2.14-2-3.33-4.12-3.33
			c-2.07,0-3.92,1.24-4.28,3.33H187.32z"></path><path class="st3" d="M191.98,50.1c0.29-2.95,2.32-4.1,5.85-4.1c2.41,0,5.42,0.58,5.42,3.35v6.35c0,0.67,0.34,1.01,1.01,1.01
			c0.25,0,0.54-0.02,0.79-0.09v1.58c-0.54,0.09-1.21,0.13-1.76,0.13c-1.15,0-1.87-0.31-2.03-1.64c-0.92,1.21-3.11,1.91-5.02,1.91
			c-3.89,0-4.79-2.03-4.79-3.56c0-2.18,1.28-3.24,5.06-3.67l2.57-0.27c1.26-0.11,2.05-0.36,2.05-1.42c0-1.62-1.58-1.94-3.4-1.94
			c-1.91,0-3.58,0.54-3.65,2.34H191.98z M201.14,52.03c-0.34,0.38-0.95,0.54-2.21,0.7l-2.54,0.31c-1.78,0.25-2.68,0.68-2.68,1.94
			c0,1.1,1.1,1.87,2.75,1.87c2.54,0,4.68-1.33,4.68-3.31V52.03z"></path><path class="st3" d="M207.57,42.78h2.25v3.62h3.38v1.76h-3.38v7.27c0,0.97,0.67,1.28,1.82,1.28c0.52,0,1.04-0.07,1.55-0.16v1.89
			c-0.79,0.16-1.6,0.16-2.52,0.16c-2.23,0-3.11-1.08-3.11-2.79v-7.65h-2.43V46.4h2.43V42.78z"></path><path class="st3" d="M214.91,41.99h2.25v2.48h-2.25V41.99z M214.91,46.4h2.25V58.2h-2.25V46.4z"></path><path class="st3" d="M229.04,46.4h2.52l-5.31,11.79h-2.48l-5.36-11.79H221l4.05,9.32L229.04,46.4z"></path><path class="st3" d="M232.82,46.4h2.25v1.78h0.04c1.1-1.64,2.9-2.18,4.61-2.18c2.84,0,4.95,1.21,4.95,4.16v8.04h-2.25v-7.58
			c0-1.73-1.06-2.72-3.49-2.72c-2.05,0-3.87,1.19-3.87,3.51v6.8h-2.25V46.4z"></path><path class="st3" d="M247.42,41.99h2.25v2.48h-2.25V41.99z M247.42,46.4h2.25V58.2h-2.25V46.4z"></path><path class="st3" d="M260.92,42.78h2.25v3.62h3.38v1.76h-3.38v7.27c0,0.97,0.67,1.28,1.82,1.28c0.52,0,1.04-0.07,1.55-0.16v1.89
			c-0.79,0.16-1.6,0.16-2.52,0.16c-2.23,0-3.11-1.08-3.11-2.79v-7.65h-2.43V46.4h2.43V42.78z"></path><path class="st3" d="M270.12,52.98c0.18,2.45,2.34,3.74,4.34,3.74c1.28,0,3.02-0.41,3.8-2.09h2.39c-1.15,2.81-3.74,3.98-6.08,3.98
			c-4.59,0-6.84-2.9-6.84-6.3s2.25-6.3,6.84-6.3c3.11,0,6.39,1.8,6.39,6.68v0.29H270.12z M278.58,51.22c-0.36-2.14-2-3.33-4.12-3.33
			c-2.07,0-3.92,1.24-4.28,3.33H278.58z"></path><path class="st3" d="M283.26,46.4h2.25v1.78h0.04c1.1-1.64,2.9-2.18,4.61-2.18c2.84,0,4.95,1.21,4.95,4.16v8.04h-2.25v-7.58
			c0-1.73-1.06-2.72-3.49-2.72c-2.05,0-3.87,1.19-3.87,3.51v6.8h-2.25V46.4z"></path><path class="st3" d="M297.86,41.99h2.25v2.48h-2.25V41.99z M297.86,46.4h2.25V58.2h-2.25V46.4z"></path><path class="st3" d="M304.43,54.48c0,1.06,0.86,2.36,3.71,2.36c2.88,0,3.6-1.01,3.6-1.85c0-0.83-0.43-1.33-2.23-1.58l-3.71-0.5
			c-1.71-0.25-3.2-1.28-3.2-3.13c0-2.41,2.05-3.8,5.38-3.8c3.85,0,5.58,1.67,5.76,3.96h-2.25c-0.07-1.19-1.19-2.21-3.53-2.21
			c-1.44,0-3.11,0.43-3.11,1.8c0,0.79,0.36,1.26,1.96,1.46l3.2,0.43c2.97,0.43,4.12,1.49,4.12,3.13c0,2.75-2.32,4.03-5.92,4.03
			c-2.7,0-5.78-0.7-6.03-4.12H304.43z"></path><path class="st3" d="M335.57,58.2h-2.25v-1.78h-0.04c-1.1,1.64-2.9,2.18-4.61,2.18c-2.84,0-4.95-1.22-4.95-4.16V46.4h2.25v7.58
			c0,1.73,1.06,2.72,3.49,2.72c2.05,0,3.87-1.19,3.87-3.51v-6.8h2.25V58.2z"></path><path class="st3" d="M345.83,41.99h2.25v6.19h0.04c0.88-1.42,2.72-2.05,4.48-2.05c3.53,0,6.41,2.27,6.41,6.23
			s-2.88,6.23-6.41,6.23c-1.73,0-3.6-0.68-4.48-1.91h-0.04v1.51h-2.25V41.99z M352.31,48.03c-2.61,0-4.37,1.64-4.37,4.34
			c0,2.25,1.31,4.34,4.37,4.34c3.04,0,4.32-2.09,4.32-4.34C356.63,49.65,354.95,48.03,352.31,48.03z"></path><path class="st3" d="M361.24,46.4h2.25v2.16h0.04c1.06-1.87,2.54-2.57,4.05-2.57c0.56,0,0.86,0.02,1.28,0.13v2.43
			c-0.56-0.16-0.99-0.23-1.6-0.23c-2.23,0-3.78,1.33-3.78,3.87v5.99h-2.25V46.4z"></path><path class="st3" d="M376.72,46c4.59,0,6.84,2.9,6.84,6.3s-2.25,6.3-6.84,6.3s-6.84-2.9-6.84-6.3S372.13,46,376.72,46z
			 M376.72,47.89c-3.26,0-4.46,2.27-4.46,4.41c0,2.14,1.19,4.41,4.46,4.41s4.46-2.27,4.46-4.41
			C381.18,50.16,379.99,47.89,376.72,47.89z"></path><path class="st3" d="M383.25,60.81c0.16,0.02,0.29,0.05,0.43,0.05h0.41c1.24,0,1.71-0.43,1.71-1.42V46.4h2.25v12.51
			c0,2.72-0.88,3.83-3.74,3.83c-0.34,0-0.68-0.02-1.06-0.04V60.81z M385.79,41.99h2.25v2.48h-2.25V41.99z"></path><path class="st3" d="M392.65,52.98c0.18,2.45,2.34,3.74,4.34,3.74c1.28,0,3.02-0.41,3.8-2.09h2.39c-1.15,2.81-3.74,3.98-6.08,3.98
			c-4.59,0-6.84-2.9-6.84-6.3s2.25-6.3,6.84-6.3c3.11,0,6.39,1.8,6.39,6.68v0.29H392.65z M401.12,51.22c-0.36-2.14-2-3.33-4.12-3.33
			c-2.07,0-3.92,1.24-4.28,3.33H401.12z"></path><path class="st3" d="M414.93,46.4h2.52l-5.31,11.79h-2.48l-5.36-11.79h2.59l4.05,9.32L414.93,46.4z"></path><path class="st3" d="M418.71,41.99h2.25v2.48h-2.25V41.99z M418.71,46.4h2.25V58.2h-2.25V46.4z"></path><path class="st3" d="M441.62,50.7c0-2.16-1.37-2.81-2.84-2.81c-2.05,0-3.87,0.97-3.87,3.17v7.13h-2.25v-7.5
			c0-2.16-1.37-2.81-2.84-2.81c-2.05,0-3.87,1.19-3.87,3.51v6.8h-2.25V46.4h2.25v1.78H426c1.1-1.64,2.9-2.18,4.61-2.18
			c1.53,0,3.04,0.63,4.01,2.18c1.08-1.35,2.52-2.18,4.77-2.18c1.19,0,4.48,0.56,4.48,4.16v8.04h-2.25V50.7z"></path><path class="st3" d="M446.58,50.1c0.29-2.95,2.32-4.1,5.85-4.1c2.41,0,5.42,0.58,5.42,3.35v6.35c0,0.67,0.34,1.01,1.01,1.01
			c0.25,0,0.54-0.02,0.79-0.09v1.58c-0.54,0.09-1.21,0.13-1.76,0.13c-1.15,0-1.87-0.31-2.03-1.64c-0.92,1.21-3.11,1.91-5.02,1.91
			c-3.89,0-4.79-2.03-4.79-3.56c0-2.18,1.28-3.24,5.06-3.67l2.57-0.27c1.26-0.11,2.05-0.36,2.05-1.42c0-1.62-1.58-1.94-3.4-1.94
			c-1.91,0-3.58,0.54-3.65,2.34H446.58z M455.74,52.03c-0.34,0.38-0.95,0.54-2.21,0.7L451,53.04c-1.78,0.25-2.68,0.68-2.68,1.94
			c0,1.1,1.1,1.87,2.75,1.87c2.54,0,4.68-1.33,4.68-3.31V52.03z"></path></g></g><circle class="st4" cx="534.01" cy="27.79" r="3.59"></circle><g class="st5"><text transform="matrix(1 0 0 1 -0.7661 31.285)" class="st6"><tspan x="0" y="0" class="st0 st7 st8">SRPSKA</tspan><tspan x="214.01" y="0" class="st2 st7 st8"></tspan></text></g><text transform="matrix(1 0 0 1 539.4776 31.285)" class="st4 st7" style="${ssrRenderStyle({ "font-size": "29.8482px" })}">RS</text><g class="st5"><text transform="matrix(1 0 0 1 222.9769 31.2844)" class="st9 st7 st8">TENIS</text></g><g class="st5"><text transform="matrix(1 0 0 1 390.5714 31.2847)" class="st10 st7 st8">LIGA</text></g><g class="st5"><text transform="matrix(1 0 0 1 -1.1736 -1.5779)" class="st6"><tspan x="0" y="0" class="st0 st7 st8">SRPSKA</tspan><tspan x="214.01" y="0" class="st2 st7 st8"></tspan></text></g><g class="st5"><text transform="matrix(1 0 0 1 222.8126 -1.4407)" class="st9 st7 st8">TENIS</text></g><g class="st5"><text transform="matrix(1 0 0 1 390.1201 -1.4414)" class="st10 st7 st8">LIGA</text></g><g class="st5"><text transform="matrix(1 0 0 1 51.572 25.3226)" class="st11 st12 st13">srpski rekreativni tenis u brojevima</text></g></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/components/Logo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Logo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenu = reactive({ state: false });
    const scrollPos = reactive({ top: 0 });
    onMounted(() => {
      OverlayScrollbars(document.getElementById("os-holder"), { className: "os-theme-dark" }, {
        scroll(osInstance, args) {
          scrollPos.top = args.target.scrollTop;
        }
      });
      bus.on("resetScroll", (e2) => {
        console.log("got it");
        document.querySelector("[data-overlayscrollbars-viewport]").scrollTop = 0;
      });
    });
    const topOffset = computed(() => {
      if (scrollPos.top >= 50) {
        return 100;
      } else {
        return scrollPos.top * 2;
      }
    });
    const headerMessage = computed(() => {
      let page = usePage();
      if (page.props.title) return page.props.title;
      switch (page.url) {
        case "/":
          return "Rang lista";
        case "/mecevi":
          return "mečevi";
        case "/dodaj-ligu":
          return "dodaj ligu ili turnir";
        case "/dodaj":
          return "dodaj meč";
        case "/teniseri":
          return "nađi tenisera";
        case "/misija":
          return "misija";
        case "/pravila":
          return "pravila";
        case "/admin":
          return "admin";
        default:
          return "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[--><header class="header-wrapper"><div class="logo-wrapp" style="${ssrRenderStyle({ marginTop: -topOffset.value + "px" })}">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Logo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(Logo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="links-wrapper"><div class="links">`);
      _push(ssrRenderComponent(_component_Link, {
        class: ["highlighted", { "active": _ctx.$page.url === "/dodaj" }],
        href: _ctx.route("addMatch")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`dodaj meč`);
          } else {
            return [
              createTextVNode("dodaj meč")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("home"),
        class: { "active": _ctx.$page.url === "/" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`rang lista`);
          } else {
            return [
              createTextVNode("rang lista")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("matches"),
        class: { "active": _ctx.$page.url === "/mecevi" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mečevi`);
          } else {
            return [
              createTextVNode("mečevi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("leagueStats"),
        class: { "active": _ctx.$page.url === "/statistika" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`statistika`);
          } else {
            return [
              createTextVNode("statistika")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("mision"),
        class: { "active": _ctx.$page.url === "/misija" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`misija`);
          } else {
            return [
              createTextVNode("misija")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("rules"),
        class: { "active": _ctx.$page.url === "/pravila" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`pravila`);
          } else {
            return [
              createTextVNode("pravila")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        class: ["highlighted red", { "active": _ctx.$page.url === "/dodaj-ligu" }],
        href: _ctx.route("clubs")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`dodaj ligu`);
          } else {
            return [
              createTextVNode("dodaj ligu")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mobile-underheader"><h1>${ssrInterpolate(headerMessage.value)}</h1><div class="mobile-button"><div class="${ssrRenderClass([{ "open-left": mobileMenu.state }, "button"])}"></div><div class="${ssrRenderClass([{ "open-middle": mobileMenu.state }, "button"])}"></div><div class="${ssrRenderClass([{ "open-right": mobileMenu.state }, "button"])}"></div></div></div></header><div id="mobile-menu" class="${ssrRenderClass({ "open": mobileMenu.state })}"><div class="links">`);
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        class: ["highlighted", { "active": _ctx.$page.url === "/dodaj" }],
        href: _ctx.route("addMatch")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`dodaj meč`);
          } else {
            return [
              createTextVNode("dodaj meč")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        href: _ctx.route("home"),
        class: { "active": _ctx.$page.url === "/" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`rang lista`);
          } else {
            return [
              createTextVNode("rang lista")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        href: _ctx.route("matches"),
        class: { "active": _ctx.$page.url === "/mecevi" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mečevi`);
          } else {
            return [
              createTextVNode("mečevi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        href: _ctx.route("leagueStats"),
        class: { "active": _ctx.$page.url === "/statistika" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`statistika`);
          } else {
            return [
              createTextVNode("statistika")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        href: _ctx.route("mision"),
        class: { "active": _ctx.$page.url === "/misija" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`misija`);
          } else {
            return [
              createTextVNode("misija")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        href: _ctx.route("rules"),
        class: { "active": _ctx.$page.url === "/pravila" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`pravila`);
          } else {
            return [
              createTextVNode("pravila")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        onClick: ($event) => mobileMenu.state = false,
        class: ["highlighted red", { "active": _ctx.$page.url === "/dodaj-ligu" }],
        href: _ctx.route("clubs")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`dodaj ligu`);
          } else {
            return [
              createTextVNode("dodaj ligu")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(_component_Link, {
          onClick: ($event) => mobileMenu.state = false,
          class: "logout-mobile",
          method: "post",
          href: _ctx.route("logout")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`odjavi se`);
            } else {
              return [
                createTextVNode("odjavi se")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="os-holder" class="${ssrRenderClass({ "high": _ctx.$page.url === "/teniseri" })}" style="${ssrRenderStyle({ height: "calc(100vh - 100" - topOffset.value + 50 + "px)" })}"><main id="main">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="${ssrRenderClass([{ "hide": _ctx.$page.url === "/teniseri" }, "footer-wrapper"])}"><p class="footer-text">`);
      _push(ssrRenderComponent(_component_Link, {
        href: _ctx.route("addMatch")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`dodaj meč`);
          } else {
            return [
              createTextVNode("dodaj meč")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="icons-wrapper"><a class="viber" target="_blank" href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43"><defs></defs><path class="cls-1" d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z" transform="translate(-401.24 -277.78)"></path></svg></a><a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43"><defs></defs><path class="cls-1" d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z" transform="translate(-400.61 -277.64)"></path></svg></a></div>`);
      _push(ssrRenderComponent(_component_Link, {
        class: ["logout", { "hide": !_ctx.$page.props.auth.user }],
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`odjavi se`);
          } else {
            return [
              createTextVNode("odjavi se")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
router.on("finish", () => {
  bus.emit("resetScroll");
});
createServer((page) => {
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} Srpska Tenis Liga`,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/AddMatch.vue": __vite_glob_0_0, "./Pages/Auth/Dashboard.vue": __vite_glob_0_1, "./Pages/Auth/Login.vue": __vite_glob_0_2, "./Pages/Auth/Register.vue": __vite_glob_0_3, "./Pages/EditMatch.vue": __vite_glob_0_4, "./Pages/EditPlayer.vue": __vite_glob_0_5, "./Pages/ForClubs.vue": __vite_glob_0_6, "./Pages/Home.vue": __vite_glob_0_7, "./Pages/Join.vue": __vite_glob_0_8, "./Pages/Matches.vue": __vite_glob_0_9, "./Pages/Mision.vue": __vite_glob_0_10, "./Pages/Player.vue": __vite_glob_0_11, "./Pages/Rules.vue": __vite_glob_0_12, "./Pages/Statistics.vue": __vite_glob_0_13, "./Pages/components/Dropdown.vue": __vite_glob_0_14, "./Pages/components/EditIcon.vue": __vite_glob_0_15, "./Pages/components/LeagueChart.vue": __vite_glob_0_16, "./Pages/components/PlayerChart.vue": __vite_glob_0_17 });
      let page2 = pages[`./Pages/${name}.vue`];
      page2.default.layout = page2.default.layout || _sfc_main;
      return page2;
    },
    setup({ el, App, props, plugin }) {
      createSSRApp({ render: () => h$2(App, props) }).use(plugin).use(k).use(eventBus).component("Head", Head).component("Link", Link).component("Dropdown", _sfc_main$2).component("vSelect", VueSelect).component("datepicker", VueDatepicker).component("PlayerTable", _sfc_main$b).component("MatchTable", _sfc_main$9).mount(el);
    }
  });
});
