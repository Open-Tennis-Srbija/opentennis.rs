var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { reactive, onMounted, nextTick, onUpdated, resolveComponent, mergeProps, unref, useSSRContext, withCtx, createTextVNode, mergeModels, useModel, onBeforeMount, ref, watch, computed, onUnmounted, createVNode, toDisplayString, defineAsyncComponent, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { useForm, usePage, router, createInertiaApp, Head, Link } from "@inertiajs/vue3";
import bus, { bus as bus$1 } from "vue3-eventbus";
import axios from "axios";
import { renderToString } from "@vue/server-renderer";
import createServer from "@inertiajs/vue3/server";
import { OverlayScrollbars } from "overlayscrollbars";
import VueSelect from "vue-select";
import VueDatepicker from "@vuepic/vue-datepicker";
const data = ["Beograd", "dropdown-spacer", "Ada", "Aleksandrovac", "Aleksinac", "Alibunar", "Apatin", "Aranđelovac", "Arilje", "Babušnica", "Bač", "Bačka Palanka", "Bačka Topola", "Bački Petrovac", "Bajina Bašta", "Batočina", "Bečej", "Bela Crkva", "Bela Palanka", "Beočin", "Blace", "Bogatić", "Bojnik", "Boljevac", "Bor", "Bosilegrad", "Brus", "Bujanovac", "Čačak", "Čajetina", "Ćićevac", "Čoka", "Crna Trava", "Ćuprija", "Đakovica", "Dečani", "Despotovac", "Dimitrovgrad", "Doljevac", "Gadžin Han", "Glogovac", "Gnjilane", "Golubac", "Gora", "Gornji Milanovac", "Inđija", "Irig", "Istok", "Ivanjica", "Jagodina", "Kačanik", "Kanjiža", "Kikinda", "Kladovo", "Klina", "Knić", "Knjaževac", "Koceljeva", "Kosjerić", "Kosovo Polje", "Kosovska Kamenica", "Kosovska Mitrovica", "Kovačica", "Kovin", "Kragujevac", "Kraljevo", "Krupanj", "Kruševac", "Kučevo", "Kula", "Kuršumlija", "Lajkovac", "Lapovo", "Lebane", "Leposavić", "Leskovac", "Lipljan", "Ljig", "Ljubovija", "Loznica", "Lučani", "Majdanpek", "Mali Iđoš", "Mali Zvornik", "Malo Crniće", "Medveđa", "Merošina", "Mionica", "Negotin", "Niš", "Nova Crnja", "Nova Varoš", "Novi Bečej", "Novi Kneževac", "Novi Pazar", "Novi Sad", "Novo Brdo", "Obilić", "Odžaci", "Opovo", "Orahovac", "Osečina", "Pančevo", "Paraćin", "Peć", "Pećinci", "Petrovac na Mlavi", "Pirot", "Plandište", "Podujevo", "Požarevac", "Požega", "Preševo", "Priboj", "Prijepolje", "Priština", "Prizren", "Prokuplje", "Rača", "Raška", "Ražanj", "Rekovac", "Ruma", "Šabac", "Sečanj", "Senta", "Šid", "Sjenica", "Smederevo", "Smederevska Palanka", "Sokobanja", "Sombor", "Srbica", "Srbobran", "Sremska Mitrovica", "Sremski Karlovci", "Stara Pazova", "Štimlje", "Štrpce", "Subotica", "Surdulica", "Suva Reka", "Svilajnac", "Svrljig", "Temerin", "Titel", "Topola", "Trgovište", "Trstenik", "Tutin", "Ub", "Uroševac", "Užice", "Valjevo", "Varvarin", "Velika Plana", "Veliko Gradište", "Vitina", "Vladičin Han", "Vladimirci", "Vlasotince", "Vranje", "Vrbas", "Vrnjačka Banja", "Vršac", "Vučitrn", "Žabalj", "Žabari", "Žagubica", "Zaječar", "Žitište", "Žitorađa", "Zrenjanin", "Zubin Potok", "Zvečan", "dropdown-spacer", "Italija", "Grčka", "Hrvatska", "Republika Srpska", "Rusija", "inostranstvo"];
const opstine = {
  data
};
const _sfc_main$x = {
  __name: "AddSingle",
  __ssrInlineRender: true,
  props: { players: Array, courts: Array, leagues: Array },
  emits: ["submitted", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = useForm({
      winner: null,
      loser: null,
      set_score: "",
      game_score: "",
      court: null,
      date: /* @__PURE__ */ new Date(),
      location: "Beograd",
      league: { id: 1, name: "sparing" }
    });
    const formState = reactive({
      submitted: false,
      success: false,
      shouldReset: false
    });
    onMounted(async () => {
      await nextTick();
      bus.emit("loading", false);
    });
    onUpdated(() => {
      bus.emit("loading", false);
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
      const _component_dropdown = resolveComponent("dropdown");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_datepicker = resolveComponent("datepicker");
      _push(`<form${ssrRenderAttrs(mergeProps({
        id: "form",
        class: { "hide": formState.success }
      }, _attrs))}><div class="form-section"><h2>Teniseri</h2><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Pobednik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_component_dropdown, {
        autofocus: true,
        label: "name",
        options: props.players,
        disabledOption: unref(form).loser,
        modelValue: unref(form).winner,
        "onUpdate:modelValue": ($event) => unref(form).winner = $event,
        class: { "invalid": unref(form).errors.winner },
        shouldReset: formState.shouldReset
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
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.loser)}</p></div></div></div><div class="form-section"><h2>Rezultat</h2><div class="form-row three"><div class="form-group"><label for="full-score" class="input-label"> Konačni rezultat <br>(2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).set_score)} class="${ssrRenderClass({ "invalid": unref(form).errors.set_score })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} data-validate="true" id="set_score" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.set_score)}</p></div><div class="form-group"><label for="games" class="input-label"> Gemovi (primer: 6:3,7:6,6:1) </label><input${ssrRenderAttr("value", unref(form).game_score)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="text"></div><div class="form-group"><label for="winner-fname" class="input-label"> Sparing, liga ili turnir </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: [{ id: 1, name: "sparing" }, { id: null, name: "dropdown-spacer" }, ...props.leagues],
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
        class: { "invalid": unref(form).errors.location }
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
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit" class="${ssrRenderClass({ "red": formState.submitted })}"><span id="add-btn" class="${ssrRenderClass({ "hide": formState.submitted })}">Dodaj</span><span id="loader-submit" class="${ssrRenderClass([{ "show": formState.submitted }, "loader"])}"></span></button></div></div></form>`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Matches/AddSingle.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = {
  __name: "AddDouble",
  __ssrInlineRender: true,
  props: { players: Array, courts: Array, leagues: Array },
  emits: ["submitted", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = useForm({
      winner1: null,
      winner2: null,
      loser1: null,
      loser2: null,
      set_score: "",
      game_score: "",
      court: null,
      date: /* @__PURE__ */ new Date(),
      location: "Beograd",
      league: { id: 1, name: "sparing" }
    });
    const formState = reactive({
      submitted: false,
      success: false,
      shouldReset: false
    });
    onMounted(async () => {
      await nextTick();
      bus.emit("loading", false);
    });
    onUpdated(() => {
      bus.emit("loading", false);
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
      const _component_dropdown = resolveComponent("dropdown");
      const _component_Dropdown = resolveComponent("Dropdown");
      const _component_datepicker = resolveComponent("datepicker");
      _push(`<form${ssrRenderAttrs(mergeProps({
        id: "form",
        class: { "hide": formState.success }
      }, _attrs))}><div class="form-section"><h2>Teniseri</h2><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Pobednici (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label><div class="field-group">`);
      _push(ssrRenderComponent(_component_dropdown, {
        minWidth: "271px",
        autofocus: true,
        label: "name",
        options: props.players,
        disabledOptions: [unref(form).winner2, unref(form).loser1, unref(form).loser2],
        modelValue: unref(form).winner1,
        "onUpdate:modelValue": ($event) => unref(form).winner1 = $event,
        class: { "invalid": unref(form).errors.winner1 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        minWidth: "271px",
        options: props.players,
        disabledOptions: [unref(form).winner1, unref(form).loser1, unref(form).loser2],
        modelValue: unref(form).winner2,
        "onUpdate:modelValue": ($event) => unref(form).winner2 = $event,
        class: { "invalid": unref(form).errors.winner2 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`</div><p class="error-message">${ssrInterpolate(unref(form).errors.winners)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Gubitnici (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label><div class="field-group">`);
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        minWidth: "271px",
        options: props.players,
        disabledOptions: [unref(form).loser2, unref(form).winner1, unref(form).winner2],
        modelValue: unref(form).loser1,
        "onUpdate:modelValue": ($event) => unref(form).loser1 = $event,
        class: { "invalid": unref(form).errors.loser1 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        minWidth: "271px",
        disabledOptions: [unref(form).loser1, unref(form).winner1, unref(form).winner2],
        modelValue: unref(form).loser2,
        "onUpdate:modelValue": ($event) => unref(form).loser2 = $event,
        class: { "invalid": unref(form).errors.loser2 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`</div><p class="error-message">${ssrInterpolate(unref(form).errors.losers)}</p></div></div></div><div class="form-section"><h2>Rezultat</h2><div class="form-row three"><div class="form-group"><label for="full-score" class="input-label"> Konačni rezultat <br>(2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).set_score)} class="${ssrRenderClass({ "invalid": unref(form).errors.set_score })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} data-validate="true" id="set_score" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.set_score)}</p></div><div class="form-group"><label for="games" class="input-label"> Gemovi (primer: 6:3,7:6,6:1) </label><input${ssrRenderAttr("value", unref(form).game_score)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="text"></div><div class="form-group"><label for="winner-fname" class="input-label"> Sparing, liga ili turnir </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: [{ id: 1, name: "sparing" }, { id: null, name: "dropdown-spacer" }, ...props.leagues],
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
        class: { "invalid": unref(form).errors.location }
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
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit" class="${ssrRenderClass({ "red": formState.submitted })}"><span id="add-btn" class="${ssrRenderClass({ "hide": formState.submitted })}">Dodaj</span><span id="loader-submit" class="${ssrRenderClass([{ "show": formState.submitted }, "loader"])}"></span></button></div></div></form>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Matches/AddDouble.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$w
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = {
  __name: "AddMatch",
  __ssrInlineRender: true,
  props: { players: Array, courts: Array, leagues: Array },
  setup(__props) {
    const props = __props;
    const formState = reactive({
      submitted: false,
      success: false,
      shouldReset: false
    });
    const handleSuccess = () => {
      formState.success = true;
    };
    const selectedForm = reactive({
      type: "single"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Dodaj meč -" }, null, _parent));
      _push(`<div class="static-wrapper">`);
      if (!formState.success) {
        _push(`<div class="form-select"><h1 class="${ssrRenderClass([{ "active": selectedForm.type === "single" }, "add"])}"><span class="mobile-hide">dodaj</span> singl</h1><h1 class="${ssrRenderClass([{ "active": selectedForm.type === "double" }, "add"])}"><span class="mobile-hide">dodaj</span> dubl</h1></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 id="success" class="${ssrRenderClass({ "show": formState.success })}">Meč je uspešno dodat</h1><div id="success-links" class="${ssrRenderClass({ "show": formState.success })}"><p class="add">dodaj još jedan meč</p>`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        class: "blue",
        href: "/mecevi"
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
        prefetch: "false",
        class: "red",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi tenisere`);
          } else {
            return [
              createTextVNode("vidi tenisere")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!formState.success) {
        _push(`<div>`);
        if (selectedForm.type === "single") {
          _push(ssrRenderComponent(_sfc_main$x, {
            onSuccess: handleSuccess,
            players: props.players,
            courts: props.courts,
            leagues: props.leagues
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (selectedForm.type === "double") {
          _push(ssrRenderComponent(_sfc_main$w, {
            onSuccess: handleSuccess,
            players: props.players,
            courts: props.courts,
            leagues: props.leagues
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/AddMatch.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    autofocus: Boolean,
    options: Array,
    label: String,
    value: String,
    multiple: Boolean,
    shouldReset: Boolean,
    type: String,
    canAdd: Boolean,
    disabledOption: Object,
    disabledOptions: Array,
    minWidth: String
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    onBeforeMount(() => {
      if (model.value && model.value.name && model.value.name != "") {
        state.search = model.value.name;
      }
      if (model.value && !model.value.name && model.value !== "") {
        state.search = model.value;
      }
      if (model.value && model.value.id && model.value.name == "") {
        state.search = model.value.name;
      }
    });
    const dropdownInput = ref(null);
    const dropdownDiv = ref(null);
    const props = __props;
    watch(
      () => props.shouldReset,
      (value) => {
        if (value) {
          state.search = "";
          model.value = null;
          state.placeholder = "";
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
      placeholder: "",
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
    onMounted(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("click", handleClickOutside);
        window.addEventListener("focus", handleWindowFocus);
        document.addEventListener("touchstart", handleInteraction, true);
        if (props.autofocus)
          dropdownInput.value.focus();
      }
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("focus", handleWindowFocus);
    });
    ref((e) => {
    });
    const ignoreNextFocus = ref(false);
    const onVisibilityChange = () => {
      if (!document.hidden) {
        ignoreNextFocus.value = true;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          ignoreNextFocus.value = false;
        }, 500);
      }
    };
    const handleWindowFocus = () => {
    };
    const handleInteraction = () => {
      lastInteraction = Date.now();
    };
    const handleClickOutside = (event) => {
      if (dropdownInput.value && !dropdownInput.value.contains(event.target) && dropdownDiv.value && !dropdownDiv.value.contains(event.target)) {
        state.searching = false;
        state.isOpen = false;
        onBlur();
      }
    };
    const onBlur = () => {
      let input = dropdownInput.value;
      if ((input.value == "" || state.search == "") && state.placeholder != "" && !state.isBlured && !state.isOpen) {
        state.search = state.placeholder;
        input.value = state.placeholder;
      }
      if ((state.search == "" || input.value == "") && state.placeholder != "" && !state.isOpen) {
        state.search = state.placeholder;
        input.value = state.placeholder;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "dropdown-wrapper",
        style: __props.minWidth ? { minWidth: __props.minWidth } : {}
      }, _attrs))}><input type="text"${ssrRenderAttr("placeholder", state.placeholder)}${ssrRenderAttr("value", state.search)}><div class="${ssrRenderClass([{ open: state.isOpen }, "dropdown"])}"><ul><!--[-->`);
      ssrRenderList(filteredOptions.value, (option, index) => {
        _push(`<li class="${ssrRenderClass({
          spacer: option === "dropdown-spacer" || (option == null ? void 0 : option.name) === "dropdown-spacer",
          disabled: props.disabledOption && props.disabledOption.id === (option == null ? void 0 : option.id) || props.disabledOptions && props.disabledOptions.some(
            (disabledOption) => (disabledOption == null ? void 0 : disabledOption.id) === (option == null ? void 0 : option.id)
          ),
          hovered: state.selectedIndex === index && (!(props.disabledOption && props.disabledOption.id === (option == null ? void 0 : option.id)) && !(props.disabledOptions && props.disabledOptions.some(
            (disabledOption) => (disabledOption == null ? void 0 : disabledOption.id) === (option == null ? void 0 : option.id)
          )))
        })}">`);
        if (option === "dropdown-spacer" || (option == null ? void 0 : option.name) === "dropdown-spacer") {
          _push(`<div class="spacer"></div>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(props.type === "array" ? option : option == null ? void 0 : option[props.label])}<!--]-->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div class="${ssrRenderClass([{ open: state.isOpen }, "arrow"])}"><svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><g><polygon points="8 3 5 7 2 3 8 3"></polygon></g></svg></div></div>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/Dropdown.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$u
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$t = {
  __name: "AddCourt",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    onMounted(async () => {
      page.props["title"] = `Dodaj teren`;
      await nextTick();
      bus.emit("loading", false);
    });
    const form = useForm({
      id: null,
      name: null,
      link: null,
      phone: null,
      county: null,
      location: null,
      uri: null
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Dodaj teren -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">Dodaj teren</h1><form id="form"><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Ime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).name)} class="${ssrRenderClass({ "invalid": unref(form).errors.name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.name)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> URI (srpskatenisliga.rs/tereni/URI)<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).uri)} class="${ssrRenderClass({ "invalid": unref(form).errors.uri })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="uri" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.uri)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Link </label><input${ssrRenderAttr("value", unref(form).link)} class="${ssrRenderClass({ "invalid": unref(form).errors.link })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="link" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.link)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Opština (ili inostranstvo na dnu) <span class="required">*</span></label>`);
      _push(ssrRenderComponent(_sfc_main$u, {
        label: "name",
        options: unref(opstine).data,
        type: "array",
        modelValue: unref(form).county,
        "onUpdate:modelValue": ($event) => unref(form).county = $event,
        class: { "invalid": unref(form).errors.county }
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.county)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Telefon </label><input${ssrRenderAttr("value", unref(form).phone)} class="${ssrRenderClass({ "invalid": unref(form).errors.phone })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="phone" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.phone)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Lokacija (google maps link) </label><input${ssrRenderAttr("value", unref(form).location)} class="${ssrRenderClass({ "invalid": unref(form).errors.location })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="location" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">dodaj</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/AddCourt.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$s = {
  __name: "AddLeague",
  __ssrInlineRender: true,
  props: { courts: Array },
  setup(__props) {
    const page = usePage();
    ref(null);
    onMounted(async () => {
      page.props["title"] = `Dodaj turnir`;
      await nextTick();
      bus.emit("loading", false);
    });
    const handleTemp = (mode) => {
      if (!form[mode] || form[mode] === "") {
        form.errors[mode] = "Ovo polje je obavezno";
      } else {
        form.errors[mode] = "";
      }
    };
    const formatDate = (date) => {
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
    const form = useForm({
      name: null,
      date_begin: null,
      date_end: null,
      name: null,
      location: null,
      link: null,
      court: null
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    const handleInputs = (event, isDate = false) => {
      if (isDate) return form.errors["date"] = "";
      if (event.target.value && event.target.value.trim() !== "") {
        form.errors[event.target.id] = "";
      } else {
        form.errors[event.target.id] = "Ovo polje je obavezno";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_datepicker = resolveComponent("datepicker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Dodaj turnir -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">dodaj turnir</h1><form id="form"><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Ime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).name)} class="${ssrRenderClass({ "invalid": unref(form).errors.first_name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="first_name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.first_name)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Opstina<span class="required">*</span></label>`);
      _push(ssrRenderComponent(_sfc_main$u, {
        label: "name",
        options: unref(opstine).data,
        modelValue: unref(form).location,
        "onUpdate:modelValue": ($event) => unref(form).location = $event,
        type: "array",
        class: { "invalid": unref(form).errors.location },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.last_name)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Organizator (link) </label><input${ssrRenderAttr("value", unref(form).link)} class="${ssrRenderClass({ "invalid": unref(form).errors.link })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="link" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.link)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Teren </label>`);
      _push(ssrRenderComponent(_sfc_main$u, {
        label: "name",
        options: __props.courts,
        modelValue: unref(form).court,
        "onUpdate:modelValue": ($event) => unref(form).court = $event,
        class: { "invalid": unref(form).errors.court },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="full-score" class="input-label"> Datum početka </label>`);
      _push(ssrRenderComponent(_component_datepicker, {
        "enable-time-picker": false,
        format: formatDate,
        "preview-format": formatDate,
        "onUpdate:modelValue": [($event) => handleInputs($event, true), ($event) => unref(form).date_begin = $event],
        onClosed: ($event) => handleTemp("date"),
        id: "date",
        modelValue: unref(form).date_begin,
        class: { "invalid": unref(form).errors.date },
        clearable: false,
        "year-range": [(/* @__PURE__ */ new Date()).getFullYear() - 1, (/* @__PURE__ */ new Date()).getFullYear()],
        "cancel-text": "Otkaži",
        "select-text": "Potvrdi",
        disabled: formState.submitted,
        "day-names": ["pon", "uto", "sre", "čet", "pet", "sub", "ned"]
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.club)}</p></div><div class="form-group"><label for="games" class="input-label"> Datum završetka </label>`);
      _push(ssrRenderComponent(_component_datepicker, {
        "enable-time-picker": false,
        format: formatDate,
        "preview-format": formatDate,
        "onUpdate:modelValue": [($event) => handleInputs($event, true), ($event) => unref(form).date_end = $event],
        onClosed: ($event) => handleTemp("date"),
        id: "date",
        modelValue: unref(form).date_end,
        class: { "invalid": unref(form).errors.date },
        clearable: false,
        "year-range": [(/* @__PURE__ */ new Date()).getFullYear() - 1, (/* @__PURE__ */ new Date()).getFullYear()],
        "cancel-text": "Otkaži",
        "select-text": "Potvrdi",
        disabled: formState.submitted,
        "day-names": ["pon", "uto", "sre", "čet", "pet", "sub", "ned"]
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.date_begin)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">dodaj</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/AddLeague.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$r = {
  __name: "BatchMatches",
  __ssrInlineRender: true,
  props: { players: Array, courts: Array, leagues: Array },
  setup(__props) {
    const props = __props;
    onMounted(async () => {
      await nextTick();
      bus.emit("loading", false);
    });
    const form = useForm({
      court: null,
      league: null,
      csvData: null
    });
    const fileText = ref("Izaberi fajl");
    ref(null);
    const formState = reactive({
      submitted: false,
      success: false,
      shouldReset: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_Dropdown = resolveComponent("Dropdown");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Izmeni meč" }, null, _parent));
      _push(`<div class="static-wrapper" data-v-b3a6f82c><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}" data-v-b3a6f82c>Import mečeva</h1><h1 id="success" class="${ssrRenderClass({ "show": formState.success })}" data-v-b3a6f82c>Mečevi su uspešno dodati!</h1><div id="success-links" class="${ssrRenderClass({ "show": formState.success })}" data-v-b3a6f82c>`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        class: "red",
        href: "/lige-turniri"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi lige i turnire`);
          } else {
            return [
              createTextVNode("vidi lige i turnire")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        class: "blue",
        href: "/mecevi"
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
        prefetch: "false",
        class: "red",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi tenisere`);
          } else {
            return [
              createTextVNode("vidi tenisere")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form id="form" class="${ssrRenderClass({ "hide": formState.success })}" data-v-b3a6f82c><div class="form-section" data-v-b3a6f82c><div class="form-row" data-v-b3a6f82c><div class="form-group" data-v-b3a6f82c><label for="winner-fname" class="input-label" data-v-b3a6f82c> Liga ili turnir (opcionalno) </label>`);
      if (props.leagues) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: [{ id: 1, name: "sparing" }, { id: null, name: "dropdown-spacer" }, ...props.leagues],
          modelValue: unref(form).league,
          "onUpdate:modelValue": ($event) => unref(form).league = $event,
          class: { "invalid": unref(form).errors.league },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message" data-v-b3a6f82c>${ssrInterpolate(unref(form).errors.league)}</p></div><div class="form-group" data-v-b3a6f82c><label for="place" class="input-label" data-v-b3a6f82c> Teniski teren ili klub (opcionalno) </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.courts,
        modelValue: unref(form).court,
        "onUpdate:modelValue": ($event) => unref(form).court = $event,
        class: { "invalid": unref(form).errors.court },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message" data-v-b3a6f82c>${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section" data-v-b3a6f82c><h2 data-v-b3a6f82c>Import fajla</h2><div class="form-row" data-v-b3a6f82c><div class="form-group" data-v-b3a6f82c><label for="winner-fname" class="input-label" data-v-b3a6f82c> CSV fajl </label><div class="input-wrapper" data-v-b3a6f82c><input type="file" accept=".csv" data-v-b3a6f82c><p data-v-b3a6f82c>${ssrInterpolate(fileText.value)}</p></div><p class="error-message" data-v-b3a6f82c>${ssrInterpolate(unref(form).errors.league)}</p></div><div class="form-group" data-v-b3a6f82c><p data-v-b3a6f82c>Potrebno je exportovati <a href="/storage/SrpskaTenisLiga.rs prijava turnira i liga - šablon.xlsx" target="_blank" data-v-b3a6f82c>spreadsheet</a> (Google sheet ili Excel) kao .csv fajl.</p><p data-v-b3a6f82c>File &gt; Download &gt; Coma Separated Values (.csv)</p></div></div></div><div class="form-section" data-v-b3a6f82c><div class="form-row" data-v-b3a6f82c><button id="submit" data-v-b3a6f82c><span id="add-btn" data-v-b3a6f82c>Importuj</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/BatchMatches.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const BatchMatches = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-b3a6f82c"]]);
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BatchMatches
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = {
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
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Dashboard.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = {
  __name: "EditCourt",
  __ssrInlineRender: true,
  props: { id: Number },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const court = ref({});
    onMounted(() => {
      page.props["title"] = `Izmeni teren`;
      axios.get(`/get-court-for-edit/${props.id}`).then((response) => {
        console.log(response.data);
        form.id = response.data.id;
        form.name = response.data.name;
        form.link = response.data.link;
        form.uri = response.data.uri;
        form.phone = response.data.phone;
        form.county = response.data.county;
        form.location = response.data.location;
        court.value = response.data;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching court:", error);
      });
    });
    const form = useForm({
      id: null,
      name: null,
      link: null,
      phone: null,
      location: null,
      county: null,
      uri: null
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Izmeni teren -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">izmeni teren</h1><form id="form"><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Ime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).name)} class="${ssrRenderClass({ "invalid": unref(form).errors.name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.name)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> URI (srpskatenisliga.rs/tereni/URI)<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).uri)} class="${ssrRenderClass({ "invalid": unref(form).errors.uri })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="uri" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.uri)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Link </label><input${ssrRenderAttr("value", unref(form).link)} class="${ssrRenderClass({ "invalid": unref(form).errors.link })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="link" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.link)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Opština (ili inostranstvo na dnu) <span class="required">*</span></label>`);
      if (unref(form).county) {
        _push(ssrRenderComponent(_sfc_main$u, {
          label: "name",
          options: unref(opstine).data,
          type: "array",
          modelValue: unref(form).county,
          "onUpdate:modelValue": ($event) => unref(form).county = $event,
          class: { "invalid": unref(form).errors.county }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.county)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Telefon </label><input${ssrRenderAttr("value", unref(form).phone)} class="${ssrRenderClass({ "invalid": unref(form).errors.phone })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="phone" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.phone)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Lokacija (google maps link) </label><input${ssrRenderAttr("value", unref(form).location)} class="${ssrRenderClass({ "invalid": unref(form).errors.location })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="location" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">izmeni</span></button></div></div></form><button class="delete">obriši</button></div><!--]-->`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/EditCourt.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$p
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$o = {
  __name: "EditDouble",
  __ssrInlineRender: true,
  props: { players: Array, match: Object, courts: Array, leagues: Array },
  setup(__props) {
    const props = __props;
    const page = usePage();
    onMounted(async () => {
      page.props["title"] = `Izmeni meč`;
      await nextTick();
      bus.emit("loading", false);
    });
    const form = useForm({
      id: props.match.id,
      winner1: props.match.winner1,
      winner2: props.match.winner2,
      loser1: props.match.loser1,
      loser2: props.match.loser2,
      set_score: props.match.set_score,
      game_score: props.match.game_score,
      court: props.match.court,
      date: props.match.date,
      location: props.match.location,
      league: props.match.league
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
        prefetch: "false",
        class: "blue",
        href: "/mecevi"
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
        prefetch: "false",
        class: "red",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi tenisere`);
          } else {
            return [
              createTextVNode("vidi tenisere")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form id="form" class="${ssrRenderClass({ "hide": formState.success })}"><div class="form-section"><h2>Teniseri</h2><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Pobednici (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label><div class="field-group">`);
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        disabledOptions: [unref(form).winner2, unref(form).loser1, unref(form).loser2],
        modelValue: unref(form).winner1,
        "onUpdate:modelValue": ($event) => unref(form).winner1 = $event,
        class: { "invalid": unref(form).errors.winner1 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        disabledOptions: [unref(form).winner2, unref(form).loser1, unref(form).loser2],
        modelValue: unref(form).winner2,
        "onUpdate:modelValue": ($event) => unref(form).winner2 = $event,
        class: { "invalid": unref(form).errors.winner2 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`</div><p class="error-message">${ssrInterpolate(unref(form).errors.winners)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Gubitnici (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label><div class="field-group">`);
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        disabledOptions: [unref(form).loser2, unref(form).winner1, unref(form).winner2],
        modelValue: unref(form).loser1,
        "onUpdate:modelValue": ($event) => unref(form).loser1 = $event,
        class: { "invalid": unref(form).errors.loser1 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(ssrRenderComponent(_component_dropdown, {
        label: "name",
        options: props.players,
        disabledOptions: [unref(form).loser1, unref(form).winner1, unref(form).winner2],
        modelValue: unref(form).loser2,
        "onUpdate:modelValue": ($event) => unref(form).loser2 = $event,
        class: { "invalid": unref(form).errors.loser2 },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`</div><p class="error-message">${ssrInterpolate(unref(form).errors.losers)}</p></div></div></div><div class="form-section"><h2>Rezultat</h2><div class="form-row three"><div class="form-group"><label for="full-score" class="input-label"> Konačni rezultat <br>(2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).set_score)} class="${ssrRenderClass({ "invalid": unref(form).errors.set_score })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} data-validate="true" id="set_score" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.set_score)}</p></div><div class="form-group"><label for="games" class="input-label"> Gemovi (primer: 6:3,7:6,6:1) </label><input${ssrRenderAttr("value", unref(form).game_score)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="text"></div><div class="form-group"><label for="winner-fname" class="input-label"> Liga ili turnir </label>`);
      if (props.leagues) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: [{ id: 1, name: "sparing" }, { id: null, name: "dropdown-spacer" }, ...props.leagues],
          modelValue: unref(form).league,
          "onUpdate:modelValue": ($event) => unref(form).league = $event,
          class: { "invalid": unref(form).errors.league },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
      if (unref(opstine).data) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: unref(opstine).data,
          type: "array",
          modelValue: unref(form).location,
          "onUpdate:modelValue": ($event) => unref(form).location = $event,
          class: { "invalid": unref(form).errors.location },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div><div class="form-group"><label for="place" class="input-label"> Teniski teren ili klub </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.courts,
        modelValue: unref(form).court,
        "onUpdate:modelValue": ($event) => unref(form).court = $event,
        class: { "invalid": unref(form).errors.court },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">Sačuvaj</span></button></div></div></form>`);
      if (!formState.success) {
        _push(`<button class="delete">obriši</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/EditDouble.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$n = {
  __name: "EditLeague",
  __ssrInlineRender: true,
  props: { uri: String, courts: Array },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const league = ref({});
    const focusInput = ref(null);
    onMounted(() => {
      page.props["title"] = `Izmeni ligu`;
      axios.get(`/liga/${props.uri}`).then((response) => {
        console.log(response.data);
        form.id = response.data.id;
        form.name = response.data.name;
        form.location = response.data.county;
        form.date_begin = response.data.date_begin;
        form.date_end = response.data.date_end;
        form.link = response.data.link;
        form.court = response.data.court;
        league.value = response.data;
        bus.emit("loading", false);
        focusInput.value.focus();
      }).catch((error) => {
        console.error("Error fetching league:", error);
      });
    });
    const handleTemp = (mode) => {
      if (!form[mode] || form[mode] === "") {
        form.errors[mode] = "Ovo polje je obavezno";
      } else {
        form.errors[mode] = "";
      }
    };
    const formatDate = (date) => {
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
    const form = useForm({
      id: null,
      name: null,
      date_begin: null,
      date_end: null,
      name: null,
      location: null,
      link: null,
      court: null
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    const handleInputs = (event, isDate = false) => {
      if (isDate) return form.errors["date"] = "";
      if (event.target.value && event.target.value.trim() !== "") {
        form.errors[event.target.id] = "";
      } else {
        form.errors[event.target.id] = "Ovo polje je obavezno";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_datepicker = resolveComponent("datepicker");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Izmeni ligu -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">izmeni ligu</h1><form id="form"><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Ime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).name)} class="${ssrRenderClass({ "invalid": unref(form).errors.first_name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="first_name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.first_name)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Opstina<span class="required">*</span></label>`);
      if (unref(form).location) {
        _push(ssrRenderComponent(_sfc_main$u, {
          label: "name",
          options: unref(opstine).data,
          modelValue: unref(form).location,
          "onUpdate:modelValue": ($event) => unref(form).location = $event,
          type: "array",
          class: { "invalid": unref(form).errors.location },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.last_name)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Organizator (link) </label><input${ssrRenderAttr("value", unref(form).link)} class="${ssrRenderClass({ "invalid": unref(form).errors.link })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="link" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.link)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Teren </label>`);
      if (unref(form).court) {
        _push(ssrRenderComponent(_sfc_main$u, {
          label: "name",
          options: __props.courts,
          modelValue: unref(form).court,
          "onUpdate:modelValue": ($event) => unref(form).court = $event,
          class: { "invalid": unref(form).errors.court },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="full-score" class="input-label"> Datum početka </label>`);
      _push(ssrRenderComponent(_component_datepicker, {
        "enable-time-picker": false,
        format: formatDate,
        "preview-format": formatDate,
        "onUpdate:modelValue": [($event) => handleInputs($event, true), ($event) => unref(form).date_begin = $event],
        onClosed: ($event) => handleTemp("date"),
        id: "date",
        modelValue: unref(form).date_begin,
        class: { "invalid": unref(form).errors.date },
        clearable: false,
        "year-range": [(/* @__PURE__ */ new Date()).getFullYear() - 1, (/* @__PURE__ */ new Date()).getFullYear()],
        "cancel-text": "Otkaži",
        "select-text": "Potvrdi",
        disabled: formState.submitted,
        "day-names": ["pon", "uto", "sre", "čet", "pet", "sub", "ned"]
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.club)}</p></div><div class="form-group"><label for="games" class="input-label"> Datum završetka </label>`);
      _push(ssrRenderComponent(_component_datepicker, {
        "enable-time-picker": false,
        format: formatDate,
        "preview-format": formatDate,
        "onUpdate:modelValue": [($event) => handleInputs($event, true), ($event) => unref(form).date_end = $event],
        onClosed: ($event) => handleTemp("date"),
        id: "date",
        modelValue: unref(form).date_end,
        class: { "invalid": unref(form).errors.date },
        clearable: false,
        "year-range": [(/* @__PURE__ */ new Date()).getFullYear() - 1, (/* @__PURE__ */ new Date()).getFullYear()],
        "cancel-text": "Otkaži",
        "select-text": "Potvrdi",
        disabled: formState.submitted,
        "day-names": ["pon", "uto", "sre", "čet", "pet", "sub", "ned"]
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.date_begin)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">izmeni</span></button></div></div></form><button class="delete">obriši</button></div><!--]-->`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/EditLeague.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = {
  __name: "EditMatch",
  __ssrInlineRender: true,
  props: { players: Array, match: Object, courts: Array, leagues: Array },
  setup(__props) {
    const props = __props;
    const page = usePage();
    onMounted(async () => {
      page.props["title"] = `Izmeni meč`;
      await nextTick();
      bus.emit("loading", false);
    });
    const form = useForm({
      id: props.match.id,
      winner: props.match.winner,
      loser: props.match.loser,
      set_score: props.match.set_score,
      game_score: props.match.game_score,
      court: props.match.court,
      date: props.match.date,
      location: props.match.location,
      league: props.match.league
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
        prefetch: "false",
        class: "blue",
        href: "/mecevi"
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
        prefetch: "false",
        class: "red",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`vidi tenisere`);
          } else {
            return [
              createTextVNode("vidi tenisere")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form id="form" class="${ssrRenderClass({ "hide": formState.success })}"><div class="form-section"><h2>Teniseri</h2><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Pobednik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      if (props.players) {
        _push(ssrRenderComponent(_component_dropdown, {
          label: "name",
          options: props.players,
          disabledOption: unref(form).loser,
          modelValue: unref(form).winner,
          "onUpdate:modelValue": ($event) => unref(form).winner = $event,
          class: { "invalid": unref(form).errors.winner },
          shouldreset: formState.shouldreset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.winner)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Gubitnik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span></label>`);
      if (props.players) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: props.players,
          modelValue: unref(form).loser,
          "onUpdate:modelValue": ($event) => unref(form).loser = $event,
          disabledOption: unref(form).winner,
          class: { "invalid": unref(form).errors.loser },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.loser)}</p></div></div></div><div class="form-section"><h2>Rezultat</h2><div class="form-row three"><div class="form-group"><label for="full-score" class="input-label"> Konačni rezultat <br>(2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).set_score)} class="${ssrRenderClass({ "invalid": unref(form).errors.set_score })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} data-validate="true" id="set_score" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.set_score)}</p></div><div class="form-group"><label for="games" class="input-label"> Gemovi (primer: 6:3,7:6,6:1) </label><input${ssrRenderAttr("value", unref(form).game_score)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="text"></div><div class="form-group"><label for="winner-fname" class="input-label"> Liga ili turnir </label>`);
      if (props.leagues) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: [{ id: 1, name: "sparing" }, { id: null, name: "dropdown-spacer" }, ...props.leagues],
          modelValue: unref(form).league,
          "onUpdate:modelValue": ($event) => unref(form).league = $event,
          class: { "invalid": unref(form).errors.league },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
      if (unref(opstine).data) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: unref(opstine).data,
          type: "array",
          modelValue: unref(form).location,
          "onUpdate:modelValue": ($event) => unref(form).location = $event,
          class: { "invalid": unref(form).errors.location },
          shouldReset: formState.shouldReset
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div><div class="form-group"><label for="place" class="input-label"> Teniski teren ili klub </label>`);
      _push(ssrRenderComponent(_component_Dropdown, {
        label: "name",
        options: props.courts,
        modelValue: unref(form).court,
        "onUpdate:modelValue": ($event) => unref(form).court = $event,
        class: { "invalid": unref(form).errors.court },
        shouldReset: formState.shouldReset
      }, null, _parent));
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.court)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">Sačuvaj</span></button></div></div></form>`);
      if (!formState.success) {
        _push(`<button class="delete">obriši</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/EditMatch.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = {
  __name: "EditPlayer",
  __ssrInlineRender: true,
  props: { uri: String },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const player = ref({});
    const focusInput = ref(null);
    onMounted(() => {
      page.props["title"] = `Izmeni tenisera`;
      axios.get(`/teniser/${props.uri}`).then((response) => {
        form.id = response.data.id;
        form.first_name = response.data.first_name;
        form.last_name = response.data.last_name;
        form.club = response.data.club;
        form.location = response.data.location;
        form.category = response.data.category;
        player.value = response.data;
        bus.emit("loading", false);
        focusInput.value.focus();
      }).catch((error) => {
        console.error("Error fetching player:", error);
      });
    });
    const form = useForm({
      id: null,
      first_name: null,
      last_name: null,
      club: null,
      location: null,
      category: null
    });
    const formState = reactive({
      submitted: false,
      success: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Dropdown = resolveComponent("Dropdown");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Izmeni tenisera -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">izmeni tenisera</h1><form id="form"><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Ime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).first_name)} class="${ssrRenderClass({ "invalid": unref(form).errors.first_name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="first_name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.first_name)}</p></div><div class="form-group"><label for="winner-fname" class="input-label"> Prezime<span class="required">*</span></label><input${ssrRenderAttr("value", unref(form).last_name)} class="${ssrRenderClass({ "invalid": unref(form).errors.last_name })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="last_name" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.last_name)}</p></div></div></div><div class="form-section"><div class="form-row"><div class="form-group"><label for="winner-fname" class="input-label"> Opština (ili inostranstvo na dnu) <span class="required">*</span></label>`);
      if (unref(form).first_name) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          options: unref(opstine).data,
          type: "array",
          modelValue: unref(form).location,
          "onUpdate:modelValue": ($event) => unref(form).location = $event,
          class: { "invalid": unref(form).errors.location }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.location)}</p></div><div class="form-group"><label for="full-score" class="input-label"> Kategorija </label>`);
      if (unref(form).category) {
        _push(ssrRenderComponent(_component_Dropdown, {
          label: "name",
          type: "array",
          modelValue: unref(form).category,
          "onUpdate:modelValue": ($event) => unref(form).category = $event,
          options: ["?", "dropdown-spacer", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          disabled: formState.submitted,
          id: "category"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="error-message">${ssrInterpolate(unref(form).errors.category)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">izmeni</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/EditPlayer.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$k = {
  __name: "Login",
  __ssrInlineRender: true,
  props: { players: Array },
  setup(__props) {
    const page = usePage();
    onMounted(async () => {
      page.props["title"] = "Admin";
      await nextTick();
      bus.emit("loading", false);
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
      const _component_Head = resolveComponent("Head");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Admin Login</title><meta name="robots" content="noindex, nofollow"${_scopeId}><meta name="googlebot" content="noindex, nofollow"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Admin Login"),
              createVNode("meta", {
                name: "robots",
                content: "noindex, nofollow"
              }),
              createVNode("meta", {
                name: "googlebot",
                content: "noindex, nofollow"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="static-wrapper"><h1 id="title" class="${ssrRenderClass({ "hide": formState.success })}">Admin</h1><form id="form" class="${ssrRenderClass({ "hide": formState.success })}"><div class="form-section"><div class="form-row column"><div class="form-group center"><label for="full-score" class="input-label"> Korisničko ime <span class="required">*</span></label><input autofocus${ssrRenderAttr("value", unref(form).username)} class="${ssrRenderClass({ "invalid": unref(form).errors.username })}"${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="username" type="text"><p class="error-message">${ssrInterpolate(unref(form).errors.username)}</p></div><div class="form-group center"><label for="games" class="input-label"> Lozinka <span class="required">*</span></label><input class="${ssrRenderClass({ "invalid": unref(form).errors.password })}"${ssrRenderAttr("value", unref(form).password)}${ssrIncludeBooleanAttr(formState.submitted) ? " disabled" : ""} id="game_score " type="password"><p class="error-message">${ssrInterpolate(unref(form).errors.password)}</p></div></div></div><div class="form-section"><div class="form-row"><button id="submit"><span id="add-btn">Uloguj se</span></button></div></div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$k
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = {
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
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
class Utils {
  constructor() {
    __publicField(this, "formatAsThousands", (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
  }
  formatDate(date) {
    let raw = new Date(date);
    return `${this.getDateDay(date)} ${raw.getDate()} ${this.getDateMonth(date)} ${raw.getFullYear()}`;
  }
  getDateDay(date) {
    let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
    let day = new Date(date).getDay();
    return days[day];
  }
  getDateMonth(date) {
    let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
    let month = new Date(date).getMonth();
    return months[month];
  }
}
const utils = new Utils();
const _sfc_main$i = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/EditIcon.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const EditIcon = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$3]]);
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditIcon
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = {
  __name: "Court",
  __ssrInlineRender: true,
  props: {
    court_id: String
  },
  setup(__props) {
    const court = ref({});
    const page = usePage();
    const isExpanded = reactive({
      players: false,
      leagues: false
    });
    const props = __props;
    onMounted(() => {
      page.props["title"] = "Tereni";
      axios.get(`/get-court/${props.court_id}`).then((response) => {
        court.value = response.data;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching court:", error);
      });
    });
    const points = computed(() => {
      if (!court.value.points) {
        return 0;
      }
      return utils.formatAsThousands(court.value.points);
    });
    const players = computed(() => {
      let data2 = [];
      if (court.value.players.length <= 10 || isExpanded.players) {
        data2 = court.value.players;
      } else {
        data2 = court.value.players.slice(0, 10);
      }
      return data2;
    });
    const leagues = computed(() => {
      let data2 = [];
      if (court.value.leagues.length <= 10 || isExpanded.leagues) {
        data2 = court.value.leagues;
      } else {
        data2 = court.value.leagues.slice(0, 10);
      }
      return data2;
    });
    function containsGreek(text) {
      return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Link = resolveComponent("Link");
      const _component_MatchTable = resolveComponent("MatchTable");
      const _component_Head = resolveComponent("Head");
      _push(`<!--[--><div style="${ssrRenderStyle({ "margin-bottom": "-20px", "padding-bottom": "0" })}" class="static-wrapper player league"><div class="rank"><p class="${ssrRenderClass({ "align-left": court.value.position > 9, "n40": court.value.position >= 40 && court.value.position < 50 })}">${ssrInterpolate(court.value.position)}</p></div><h1 class="${ssrRenderClass({ "fix-letters": containsGreek(court.value.name) })}">${ssrInterpolate(court.value.name)}`);
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          class: "edit-btn",
          href: `/izmeni-teren/${props.court_id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(EditIcon, { class: "league" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(EditIcon, { class: "league" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</h1>`);
      if (!court.value.link) {
        _push(`<p class="subtitle-spacer">   </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="subtitle"><div class="court-links-wrapp">`);
      if (court.value.link) {
        _push(`<a${ssrRenderAttr("href", court.value.link)} target="_blank" rel="noopener noreferrer"> vebsajt </a>`);
      } else {
        _push(`<!---->`);
      }
      if (court.value.location) {
        _push(`<a${ssrRenderAttr("href", court.value.location)} target="_blank" rel="noopener noreferrer"> lokacija </a>`);
      } else {
        _push(`<!---->`);
      }
      if (court.value.phone) {
        _push(`<a${ssrRenderAttr("href", `tel:${court.value.phone}`)} target="_blank" rel="noopener noreferrer"> telefon </a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></p><div class="dashboard-wrapper"><h2 class="summary-title">Statistika</h2><div class="summary player three"><div class="summary-item"><h2>poeni</h2><p>${ssrInterpolate(points.value)}</p></div><div class="summary-item"><h2>teniseri</h2><p>${ssrInterpolate(court.value.player_number)}</p></div><div class="summary-item"><h2>mečevi</h2><p>${ssrInterpolate(court.value.match_number)}</p></div></div><h2 class="summary-title low-margin">lige &amp; turniri</h2><div class="summary player three col"><div class="summary-item players"></div><div class="summary-item players">`);
      if (((_a = court.value.leagues) == null ? void 0 : _a.length) > 0) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(leagues.value, (league) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${league.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(league.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(league.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</p>`);
        });
        _push(`<!--]-->`);
        if (Object.values(court.value.leagues).length > 10) {
          _push(`<p class="show-more">${ssrInterpolate(!isExpanded.leagues ? "vidi sve" : "vidi manje")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h2>na ovom terenu nema liga ili turnira 🙁</h2>`);
      }
      _push(`</div><div class="summary-item players"></div></div><h2 class="summary-title low-margin">teniseri</h2><div class="summary player three col"><div class="summary-item players"></div><div class="summary-item players">`);
      if (((_b = court.value.players) == null ? void 0 : _b.length) > 0) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(players.value, (player) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
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
        _push(`<!--]-->`);
        if (Object.values(court.value.players).length > 10) {
          _push(`<p class="show-more">${ssrInterpolate(!isExpanded.players ? "vidi sve" : "vidi manje")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h2>ovaj teren nema aktivnih igrača 🙁</h2>`);
      }
      _push(`</div><div class="summary-item players"></div></div><h2 class="summary-title no-border low-margin">mečevi</h2><div class="player-matches">`);
      if (court.value.matches) {
        _push(ssrRenderComponent(_component_MatchTable, {
          propMatches: court.value.matches,
          loadMatches: false,
          showMessage: { league: court.value.match_number == 0 }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (court.value && court.value.name) {
        _push(ssrRenderComponent(_component_Head, {
          title: `${court.value.name} -`
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Court.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "Courts",
  __ssrInlineRender: true,
  setup(__props) {
    const utl = utils;
    const isClient = ref(false);
    const courts = ref([]);
    onMounted(() => {
      isClient.value = true;
      axios.get("/get-courts").then((response) => {
        courts.value = response.data;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching courts:", error);
      });
      bus.on("scroll", (top) => {
        handleScroll(top);
      });
    });
    const scrollPos = ref(0);
    const handleScroll = (top) => {
      scrollPos.value = top;
    };
    const topOffset = computed(() => {
      if (scrollPos.value >= 50) {
        return 95;
      } else {
        return scrollPos.value * 2;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Tereni -" }, null, _parent));
      _push(`<div class="rankings-wrapper courts-list"><div id="desktop"><div class="rankings-header" style="${ssrRenderStyle({ top: `${137 - topOffset.value}px` })}"><div class="spacer"></div><div class="name">teren</div><div class="spacer"></div><div></div><div class="elo">poeni</div><div class="total-matches">mečevi</div><div class="total-matches">teniseri</div><div class="total-matches">opština</div></div><!--[-->`);
      ssrRenderList(courts.value, (court, index) => {
        _push(`<div class="ranking-entry" style="${ssrRenderStyle({ marginTop: index === 0 ? "25px" : "0" })}">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            class: "edit-btn",
            href: `/izmeni-teren/${court.id}`
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
        _push(`<div class="rank">${ssrInterpolate(index + 1)}</div><div class="name helvetica">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          href: `/tereni/${court.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(court.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(court.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="spacer"></div><div></div><div class="elo">${ssrInterpolate(unref(utl).formatAsThousands(court.points))}</div><div class="total-matches">${ssrInterpolate(court.matches_number)}</div><div class="total-matches">${ssrInterpolate(court.player_number)}</div><div class="total-matches" style="${ssrRenderStyle({ "text-align": "center" })}">${ssrInterpolate(court.county)}</div></div>`);
      });
      _push(`<!--]--></div><div id="mobile"><!--[-->`);
      ssrRenderList(courts.value, (court, index) => {
        _push(`<div class="ranking-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            class: "edit-btn",
            href: `/izmeni-teren/${court.id}`
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
        _push(`<div class="rank">${ssrInterpolate(index + 1)}</div><div class="name helvetica">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          href: `/tereni/${court.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(court.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(court.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="info"><div class="info-wrapp"><div class="sup">poeni</div><div class="text">${ssrInterpolate(unref(utl).formatAsThousands(court.points))}</div></div><div class="info-wrapp"><div class="sup">mečevi</div><div class="text">${ssrInterpolate(court.matches_number)}</div></div><div class="info-wrapp"><div class="sup">teniseri</div><div class="text">${ssrInterpolate(unref(utl).formatAsThousands(court.player_number))}</div></div></div></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Courts.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$g
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = {
  __name: "ForClubs",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(async () => {
      await nextTick();
      bus.emit("loading", false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Dodaj ligu ili turnir -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1>DODAJ LIGU ILI TURNIR</h1><p> Organizatori teniskih takmičenja mogu da nam pošalju podatke o svojim takmičenjima kako bi ih dodali na `);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`SrpskaTenisLiga.rs`);
          } else {
            return [
              createTextVNode("SrpskaTenisLiga.rs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`. </p><p> Da dodate ligu ili turnir pošaljite ime takmičenja, početni datum, završni datum, opštinu, terene, i link ili email za kontakt na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>. </p><p> Da dodate sve mečeve sa lige ili turnira popunite <a href="/storage/SrpskaTenisLiga.rs prijava turnira i liga - šablon.xlsx" target="_blank">ovaj spreadsheet</a> i pošaljite ga na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>. </p><p> Takođe možete da nam samo pošaljete i fotografije rezultata na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>. </p><p>Hvala.</p></div><!--]-->`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/ForClubs.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$f
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$e = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const players = ref([]);
    const utl = utils;
    const categoryColorsAll = {
      1: "#8dc73f",
      2: "#38b64b",
      3: "#00a99c",
      4: "#01aef0",
      5: "#0072bb",
      6: "#92278f",
      7: "#eb008b",
      8: "#ee1d23",
      9: "#f36621",
      10: "#f7941d",
      "?": "transparent"
    };
    const scrollPos = ref(0);
    onMounted(() => {
      axios.get("/get-players").then((response) => {
        players.value = response.data;
        bus$1.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching players:", error);
      });
      window.addEventListener("pageshow", () => {
        bus$1.emit("loading", false);
      });
      bus$1.on("scroll", (top) => {
        handleScroll(top);
      });
    });
    const handleScroll = (top) => {
      scrollPos.value = top;
    };
    const topOffset = computed(() => {
      if (scrollPos.value >= 50) {
        return 95;
      } else {
        return scrollPos.value * 2;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Teniseri -" }, null, _parent));
      _push(`<div class="rankings-wrapper"><div id="desktop"><div class="rankings-header" style="${ssrRenderStyle({ top: `${137 - topOffset.value}px` })}"><div class="spacer"></div><div class="name">teniser</div><div class="spacer"></div><div class="elo">poeni</div><div class="total-matches">mečevi</div><div class="wins">pobede</div><div class="loses">gubitci</div><div class="win-precent">% pobeda</div><div class="place">kategorija</div></div><!--[-->`);
      ssrRenderList(players.value, (player, index) => {
        _push(`<div class="ranking-entry" style="${ssrRenderStyle({ marginTop: index === 0 ? "25px" : "0" })}">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            class: "edit-btn",
            href: `/${player.uri}/izmeni/`
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
        _push(`<div class="${ssrRenderClass([{ "first": player.rank == 1, "second": player.rank == 2, "third": player.rank == 3, "align-left": player.rank > 9 }, "rank"])}">${ssrInterpolate(player.rank)}</div><div class="name">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
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
        _push(`</div><div class="spacer"></div><div class="elo">${ssrInterpolate(unref(utl).formatAsThousands(player.points))}</div><div class="total-matches">${ssrInterpolate(player.total_matches)}</div><div class="wins">${ssrInterpolate(player.wins)}</div><div class="loses">${ssrInterpolate(player.loses)}</div><div class="win-precent">${ssrInterpolate(player.win_precentage)}%</div><div class="place"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[player.category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": player.category == "?" }, "number"])}">${ssrInterpolate(player.category)}</span></div></div>`);
      });
      _push(`<!--]--></div><div id="mobile"><!--[-->`);
      ssrRenderList(players.value, (player, index) => {
        _push(`<div class="ranking-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            class: "edit-btn",
            href: `/${player.uri}/izmeni/`
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
        _push(`<div class="${ssrRenderClass([{ "first": player.rank == 1, "second": player.rank == 2, "third": player.rank == 3, "align-left": player.rank > 9 }, "rank"])}">${ssrInterpolate(player.rank)}</div><div class="name">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
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
        _push(`</div><div class="info"><div class="info-wrapp"><div class="sup">poeni</div><div class="text">${ssrInterpolate(unref(utl).formatAsThousands(player.points))}</div></div><div class="info-wrapp"><div class="sup">% pobede</div><div class="text">${ssrInterpolate(player.win_precentage)}%</div></div><div class="info-wrapp"><div class="sup">mečevi (p,g)</div><div class="text">${ssrInterpolate(player.total_matches)} (${ssrInterpolate(player.wins)},${ssrInterpolate(player.loses)})</div></div></div><div class="place"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[player.category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": player.category == "?" }, "number"])}">${ssrInterpolate(player.category)}</span></div></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$d = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Head = resolveComponent("Head");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Nađi tenisera -" }, null, _parent));
  _push(`<h1 class="title">nađi tenisera</h1><div class="join-wrapper"><p class="join-text"> U našim <a target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ">WhatsApp</a> i <a target="_blank" href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym">Viber</a> grupama možeš da nađeš tenisere za svoj sledeći meč </p><div class="icons-wrapper"><a class="viber" target="_blank" href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43"><defs></defs><path class="cls-1" d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z" transform="translate(-401.24 -277.78)"></path></svg></a><a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43"><defs></defs><path class="cls-1" d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z" transform="translate(-400.61 -277.64)"></path></svg></a></div></div><!--]-->`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Join.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Join = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$2]]);
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Join
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = {
  __name: "League",
  __ssrInlineRender: true,
  props: {
    league_uri: String
  },
  setup(__props) {
    const utl = utils;
    const league = ref({});
    const page = usePage();
    const isExpanded = reactive({
      players: false
    });
    const props = __props;
    onMounted(() => {
      page.props["title"] = "Lige & Turniri";
      axios.get(`/get-league/${props.league_uri}`).then((response) => {
        league.value = response.data;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching league:", error);
      });
    });
    const points = computed(() => {
      if (!league.value.points) {
        return 0;
      }
      return utils.formatAsThousands(league.value.points);
    });
    const formatDate = (start, end) => {
      let raw_start = new Date(start);
      let raw_end = new Date(end);
      if (raw_start.getFullYear() == raw_end.getFullYear()) {
        if (raw_start.getMonth() == raw_end.getMonth()) {
          return `${utl.getDateDay(start)} ${raw_start.getDate()} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(start)} ${raw_end.getFullYear()}`;
        } else {
          return `${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`;
        }
      } else {
        return `${utl.formatDate(start)} - ${utl.formatDate(end)}`;
      }
    };
    const players = computed(() => {
      let data2 = [];
      if (league.value.players.length <= 10 || isExpanded.players) {
        data2 = league.value.players;
      } else {
        data2 = league.value.players.slice(0, 10);
      }
      return data2;
    });
    const isInactive = (date_end) => {
      const end = new Date(date_end);
      const now = /* @__PURE__ */ new Date();
      return end < now.setHours(0, 0, 0, 0);
    };
    function containsGreek(text) {
      return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Link = resolveComponent("Link");
      const _component_MatchTable = resolveComponent("MatchTable");
      const _component_Head = resolveComponent("Head");
      _push(`<!--[--><div style="${ssrRenderStyle({ "margin-bottom": "-20px", "padding-bottom": "0" })}" class="static-wrapper player league"><h1 class="${ssrRenderClass({ "fix-letters": containsGreek(league.value.name) })}">${ssrInterpolate(league.value.name)}`);
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          class: "edit-btn",
          href: `/izmeni-ligu/${league.value.uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(EditIcon, { class: "league" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(EditIcon, { class: "league" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><p class="subtitle">${ssrInterpolate(league.value.county)}</p><p class="subtitle-spacer">   </p><p style="${ssrRenderStyle({ color: isInactive(league.value.date_end) ? "#949494" : "black" })}" class="subtitle">${ssrInterpolate(formatDate(league.value.date_start, league.value.date_end))}</p><div class="dashboard-wrapper"><h2 class="summary-title">Statistika</h2><div class="summary player three"><div class="summary-item"><h2>poeni</h2><p>${ssrInterpolate(points.value)}</p></div><div class="summary-item"><h2>teniseri</h2><p>${ssrInterpolate(league.value.player_number)}</p></div><div class="summary-item"><h2>mečevi</h2><p>${ssrInterpolate(league.value.match_number)}</p></div></div><h2 class="summary-title low-margin">teniseri</h2><div class="summary player three col"><div class="summary-item players"></div><div class="summary-item players">`);
      if (((_a = league.value.players) == null ? void 0 : _a.length) > 0) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(players.value, (player) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
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
        _push(`<!--]-->`);
        if (Object.values(league.value.players).length > 10) {
          _push(`<p class="show-more">${ssrInterpolate(!isExpanded.players ? "vidi sve" : "vidi manje")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h2>ovaj turnir nema aktivnih igrača 🙁</h2>`);
      }
      _push(`</div><div class="summary-item players"></div></div><h2 class="summary-title no-border low-margin">mečevi</h2><div class="player-matches">`);
      if (league.value.matches) {
        _push(ssrRenderComponent(_component_MatchTable, {
          propMatches: league.value.matches,
          loadMatches: false,
          showMessage: { league: league.value.match_number == 0 }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (league.value && league.value.name) {
        _push(ssrRenderComponent(_component_Head, {
          title: `${league.value.name} -`
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/League.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$c
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$b = {
  __name: "Leagues",
  __ssrInlineRender: true,
  setup(__props) {
    const utl = utils;
    const isClient = ref(false);
    const leagues = ref([]);
    const formatDate = (start, end) => {
      let raw_start = new Date(start);
      let raw_end = new Date(end);
      if (raw_start.getFullYear() == raw_end.getFullYear()) {
        if (raw_start.getMonth() == raw_end.getMonth()) {
          return `${utl.getDateDay(start)} ${raw_start.getDate()} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(start)} ${raw_end.getFullYear()}`;
        } else {
          return `${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`;
        }
      } else {
        return `${utl.formatDate(start)} - ${utl.formatDate(end)}`;
      }
    };
    const formatDates = (start, end) => {
      let raw_start = new Date(start);
      let raw_end = new Date(end);
      if (raw_start.getFullYear() == raw_end.getFullYear()) {
        return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`];
      } else {
        return [`${utl.formatDate(start)}`, `${utl.formatDate(end)}`];
      }
    };
    const isInactive = (date_end) => {
      const end = new Date(date_end);
      const now = /* @__PURE__ */ new Date();
      return end < now.setHours(0, 0, 0, 0);
    };
    onMounted(() => {
      isClient.value = true;
      axios.get("/get-leagues").then((response) => {
        leagues.value = response.data;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching leagues:", error);
      });
      bus.on("scroll", (top) => {
        handleScroll(top);
      });
    });
    const scrollPos = ref(0);
    const handleScroll = (top) => {
      scrollPos.value = top;
    };
    const topOffset = computed(() => {
      if (scrollPos.value >= 50) {
        return 95;
      } else {
        return scrollPos.value * 2;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Lige & Turniri -" }, null, _parent));
      _push(`<div class="rankings-wrapper leagues"><div id="desktop"><div class="rankings-header" style="${ssrRenderStyle({ top: `${137 - topOffset.value}px` })}"><div class="name">lige i turniri</div><div class="wins">poeni</div><div class="total-matches">mečevi</div><div class="loses">teniseri</div><div class="elo">početak - kraj</div><div class="elo">opština</div></div>`);
      if (leagues.value.length) {
        _push(`<!--[-->`);
        ssrRenderList(leagues.value, (league, index) => {
          _push(`<div class="ranking-entry" style="${ssrRenderStyle({ marginTop: index === 0 ? "25px" : "0" })}">`);
          if (_ctx.$page.props.auth.user) {
            _push(ssrRenderComponent(_component_Link, {
              prefetch: "false",
              class: "edit-btn",
              href: `/izmeni-ligu/${league.uri}`
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
          _push(`<div class="name">`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${league.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(league.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(league.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="${ssrRenderClass([{ "unknown": league.points == 0 }, "wins league-points"])}">${ssrInterpolate(unref(utl).formatAsThousands(league.points))}</div><div class="total-matches">${ssrInterpolate(league.match_number)}</div><div class="${ssrRenderClass([{ "unknown": league.player_number == 0 }, "loses"])}">${ssrInterpolate(league.player_number)}</div><div style="${ssrRenderStyle({ "text-align": "center", "line-height": "1.6" })}" class="${ssrRenderClass([{ "inactive": isInactive(league.date_end) }, "wins"])}">${ssrInterpolate(formatDates(league.date_start, league.date_end)[0])}<br>${ssrInterpolate(formatDates(league.date_start, league.date_end)[1])}</div><div style="${ssrRenderStyle({ "text-align": "center" })}" class="${ssrRenderClass([{ "unknown": league.county == "?" }, "wins"])}">${ssrInterpolate(league.county)}</div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (leagues.value) {
        _push(`<div id="mobile"><!--[-->`);
        ssrRenderList(leagues.value, (league, index) => {
          _push(`<div class="ranking-entry">`);
          if (_ctx.$page.props.auth.user) {
            _push(ssrRenderComponent(_component_Link, {
              prefetch: "false",
              class: "edit-btn",
              href: `/izmeni-ligu/${league.uri}`
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
          _push(`<div class="name" style="${ssrRenderStyle({ "font-weight": "bold", "text-align": "center" })}">`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${league.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(league.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(league.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="${ssrRenderClass([{ "inactive": isInactive(league.date_end) }, "date"])}">${ssrInterpolate(formatDate(league.date_start, league.date_end))}</div><div class="${ssrRenderClass([{ "unknown": league.county == "?" }, "county"])}">${ssrInterpolate(league.county)}</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Leagues.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  __name: "Matches",
  __ssrInlineRender: true,
  props: {
    loadMatches: Boolean || true,
    showMessage: Object,
    propMatches: Array
  },
  setup(__props) {
    const props = __props;
    const categoryColorsAll = {
      1: "#8dc73f",
      2: "#38b64b",
      3: "#00a99c",
      4: "#01aef0",
      5: "#0072bb",
      6: "#92278f",
      7: "#eb008b",
      8: "#ee1d23",
      9: "#f36621",
      10: "#f7941d",
      "?": "transparent"
    };
    const matches = ref(props.propMatches || []);
    onMounted(() => {
      if (!props.loadMatches) {
        if (props.propMatches) {
          console.log("using prop matches", props.propMatches);
          matches.value = props.propMatches;
        }
        return;
      }
      console.log("loading matches");
      axios.get("/get-matches").then((res) => {
        matches.value = res.data;
        console.log("matches", matches.value);
        bus.emit("loading", false);
      });
      bus.on("scroll", (top) => {
        handleScroll(top);
      });
    });
    const scrollPos = ref(0);
    const handleScroll = (top) => {
      scrollPos.value = top;
    };
    const topOffset = computed(() => {
      if (scrollPos.value >= 50) {
        return 95;
      } else {
        return scrollPos.value * 2;
      }
    });
    const formatedMatchesDesktop = computed(() => {
      let formated = matches.value.map((match, index) => {
        return {
          ...match,
          day: getDateDay(match.date),
          month: getDateMonth(match.date),
          date: new Date(match.date).getDate(),
          year: new Date(match.date).getFullYear()
        };
      });
      return formated;
    });
    const formatedMatchesMobile = computed(() => {
      let formated = matches.value.map((match, index) => {
        return {
          ...match,
          winner1_first_name: match.winner1_name.split(" ")[0],
          winner1_last_name: match.winner1_name.split(" ")[1],
          winner2_first_name: match.winner2_name ? match.winner2_name.split(" ")[0] : null,
          winner2_last_name: match.winner2_name ? match.winner2_name.split(" ")[1] : null,
          loser1_first_name: match.loser1_name.split(" ")[0],
          loser1_last_name: match.loser1_name.split(" ")[1],
          loser2_first_name: match.loser2_name ? match.loser2_name.split(" ")[0] : null,
          loser2_last_name: match.loser2_name ? match.loser2_name.split(" ")[1] : null,
          day: getDateDay(match.date),
          month: getDateMonth(match.date),
          year: new Date(match.date).getFullYear(),
          date: new Date(match.date).getDate()
        };
      });
      return formated;
    });
    function getDateDay(date) {
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let day = new Date(date).getDay();
      return days[day];
    }
    function getDateMonth(date) {
      let months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "maj",
        "jun",
        "jul",
        "avg",
        "sep",
        "okt",
        "nov",
        "dec"
      ];
      let month = new Date(date).getMonth();
      return months[month];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      if (props.loadMatches) {
        _push(ssrRenderComponent(_component_Head, { title: "Mečevi -" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "home": props.loadMatches }, "matches-wrapper"])}"><div id="desktop"><div class="${ssrRenderClass([{ "home": props.loadMatches }, "matches-header"])}" style="${ssrRenderStyle({ top: `${85 - topOffset.value}px` })}"><div class="spacer number"></div><div class="winner">pobednik</div><div class="loser">gubitnik</div><div class="score">rezultat</div><div class="date">datum</div><div class="location">opština</div><div class="location">teren</div><div class="location">liga ili turnir</div></div>`);
      if (props.showMessage) {
        _push(`<div>`);
        if (props.showMessage.wins) {
          _push(`<p class="message"> Ovaj teniser nikada nije pobedio 🙁 </p>`);
        } else {
          _push(`<!---->`);
        }
        if (props.showMessage.league) {
          _push(`<p class="message league"> ovaj turnir nema mečeve 🙁 </p>`);
        } else {
          _push(`<!---->`);
        }
        if (props.showMessage.loses) {
          _push(`<p class="message"> Ovaj teniser nikada nije izgubio 🙂 </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(formatedMatchesDesktop.value, (match, index) => {
        var _a, _b, _c, _d, _e, _f, _g;
        _push(`<div class="match-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            class: "edit-btn",
            href: `/izmeni/${match.number}`
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
        _push(`<div class="number">${ssrInterpolate(match.number)}</div><div class="winner"><div class="players"><div class="${ssrRenderClass([{ "mt-10": match.winner2_name }, "player-1"])}">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          href: `/${match.winner1_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.winner1_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.winner1_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.winner1_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.winner1_category == "?", [`category-${match.winner1_category}`]: match.winner1_category }, "category"])}">${ssrInterpolate(match.winner1_category)}</span></div> <br><span class="points">+${ssrInterpolate(match.winner2_name ? Math.round(match.winner_point_gain / 2) : match.winner_point_gain)}</span></div>`);
        if (match.winner2_name) {
          _push(`<div class="player-2">`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${match.winner2_uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(match.winner2_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(match.winner2_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.winner2_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.winner2_category == "?", [`category-${match.winner2_category}`]: match.winner2_category }, "category"])}">${ssrInterpolate(match.winner2_category)}</span></div><br><span class="points">+${ssrInterpolate(Math.round(match.winner_point_gain / 2))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="loser"><div class="players"><div class="${ssrRenderClass([{ "mt-10": match.loser2_name }, "player-1"])}">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          href: `/${match.loser1_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.loser1_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.loser1_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.loser1_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.loser1_category == "?", [`category-${match.loser1_category}`]: match.loser1_category }, "category"])}">${ssrInterpolate(match.loser1_category)}</span></div><br> <span class="points">+${ssrInterpolate(match.loser2_name ? Math.round(match.loser_point_gain / 2) : match.loser_point_gain)}</span></div>`);
        if (match.loser2_name) {
          _push(`<div class="player-2">`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${match.loser2_uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(match.loser2_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(match.loser2_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.loser2_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.loser2_category == "?", [`category-${match.loser2_category}`]: match.loser2_category }, "category"])}">${ssrInterpolate(match.loser2_category)}</span></div><br><span class="points">+${ssrInterpolate(Math.round(match.loser_point_gain / 2))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="score">${ssrInterpolate(match.set_score)}<br><span class="gray">${ssrInterpolate(match.game_score)}</span></div><div class="date">${ssrInterpolate(match.day)} <br>${ssrInterpolate(match.date)} ${ssrInterpolate(match.month)} ${ssrInterpolate(match.year)}</div><div class="location">${ssrInterpolate(match.county)}</div><div class="location">`);
        if (((_a = match.court) == null ? void 0 : _a.id) == 1) {
          _push(`<!--[-->${ssrInterpolate(match.court.name)}<!--]-->`);
        } else {
          _push(`<a${ssrRenderAttr("href", `/tereni/${(_b = match.court) == null ? void 0 : _b.uri}`)}>${ssrInterpolate((_c = match.court) == null ? void 0 : _c.name)}</a>`);
        }
        _push(`</div><div class="location">`);
        if (((_d = match.league) == null ? void 0 : _d.uri) == "") {
          _push(`<!--[-->${ssrInterpolate((_e = match.league) == null ? void 0 : _e.name)}<!--]-->`);
        } else {
          _push(`<a${ssrRenderAttr("href", `/${(_f = match.league) == null ? void 0 : _f.uri}`)}>${ssrInterpolate((_g = match.league) == null ? void 0 : _g.name)}</a>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div id="mobile">`);
      if (props.showMessage) {
        _push(`<div>`);
        if (props.showMessage.wins) {
          _push(`<p class="message"> Ovaj teniser nikada nije pobedio 🙁 </p>`);
        } else {
          _push(`<!---->`);
        }
        if (props.showMessage.loses) {
          _push(`<p class="message"> Ovaj teniser nikada nije izgubio 🙂 </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(formatedMatchesMobile.value, (match, index) => {
        var _a, _b, _c, _d, _e;
        _push(`<div class="match-entry">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            class: "edit-btn",
            href: `/izmeni/${match.number}`
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
        _push(`<div class="score">${ssrInterpolate(match.set_score)} `);
        if (match.game_score && match.game_score !== "") {
          _push(`<br>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="games">${ssrInterpolate(match.game_score)}</span></div><div class="info"><div class="info-wrapp"><div class="text">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          href: `/${match.winner1_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.winner1_first_name)}<br${_scopeId}>${ssrInterpolate(match.winner1_last_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.winner1_first_name), 1),
                createVNode("br"),
                createTextVNode(toDisplayString(match.winner1_last_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.winner1_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.winner1_category == "?", [`category-${match.winner1_category}`]: match.winner1_category }, "category"])}">${ssrInterpolate(match.winner1_category)}</span></div><span class="points">+${ssrInterpolate(match.winner2_first_name ? Math.round(match.winner_point_gain / 2) : match.winner_point_gain)}</span></div>`);
        if (match.winner2_name) {
          _push(`<div class="text" style="${ssrRenderStyle({ "margin-top": "20px" })}">`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${match.winner2_uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(match.winner2_first_name)}<br${_scopeId}>${ssrInterpolate(match.winner2_last_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(match.winner2_first_name), 1),
                  createVNode("br"),
                  createTextVNode(toDisplayString(match.winner2_last_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.winner2_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.winner2_category == "?", [`category-${match.winner2_category}`]: match.winner2_category }, "category"])}">${ssrInterpolate(match.winner2_category)}</span></div><span class="points">+${ssrInterpolate(Math.round(match.winner_point_gain / 2))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="sep">:</div><div class="info-wrapp"><div class="text">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          href: `/${match.loser1_uri}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(match.loser1_first_name)}<br${_scopeId}>${ssrInterpolate(match.loser1_last_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(match.loser1_first_name), 1),
                createVNode("br"),
                createTextVNode(toDisplayString(match.loser1_last_name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.loser1_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.loser1_category == "?", [`category-${match.loser1_category}`]: match.loser1_category }, "category"])}">${ssrInterpolate(match.loser1_category)}</span></div><span class="points">+${ssrInterpolate(match.loser2_first_name ? Math.round(match.loser_point_gain / 2) : match.loser_point_gain)}</span></div>`);
        if (match.loser2_name) {
          _push(`<div class="text" style="${ssrRenderStyle({ "margin-top": "20px" })}">`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${match.loser2_uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(match.loser2_first_name)}<br${_scopeId}>${ssrInterpolate(match.loser2_last_name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(match.loser2_first_name), 1),
                  createVNode("br"),
                  createTextVNode(toDisplayString(match.loser2_last_name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="category-wrapp"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColorsAll[match.loser2_category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ "unknown": match.loser2_category == "?", [`category-${match.loser2_category}`]: match.loser2_category }, "category"])}">${ssrInterpolate(match.loser2_category)}</span></div><span class="points">+${ssrInterpolate(Math.round(match.loser_point_gain / 2))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="location">`);
        if (((_a = match.league) == null ? void 0 : _a.uri) !== "") {
          _push(`<span><a class="black"${ssrRenderAttr("href", `/${(_b = match.league) == null ? void 0 : _b.uri}`)}>${ssrInterpolate((_c = match.league) == null ? void 0 : _c.name)}</a></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<br> ${ssrInterpolate(match.number || matches.value.length - index)}, ${ssrInterpolate(match.day)} ${ssrInterpolate(match.date)} ${ssrInterpolate(match.month)} ${ssrInterpolate(match.year)} <br> ${ssrInterpolate(match.county)} `);
        if (((_d = match.court) == null ? void 0 : _d.id) > 1) {
          _push(`<span>, <a${ssrRenderAttr("href", `/tereni/${(_e = match.court) == null ? void 0 : _e.uri}`)}>${ssrInterpolate(match.court.name)}</a></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Matches.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Head = resolveComponent("Head");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: "Misija -" }, null, _parent));
  _push(`<div class="static-wrapper"><h1>MISIJA</h1><p> Misija Srpske Teniske Lige je skupljame svih relevantnih podataka rekreativnog tenisa u Srbiji. </p><p> Skupljanje, javni prikaz i analiza ovih podataka će da dalje razviju rekreativni tenis u korist tenisera, klubova, terena, i firmi. </p><p><a target="_blank" href="https://www.linkedin.com/in/nikolatosic/">Nikola Tošić</a>, osnivač, <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a><br> Bogdan Ranđelović, programer, <a href="mailto:bogdan@openinnovation.me">bogdan@openinnovation.me</a><br><a target="_blank" href="https://ivanjureta.com">Ivan Jureta</a>, savetnik za algoritam </p></div><!--]-->`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Mision.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Mision = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$1]]);
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mision
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$8 = {
  __name: "PlayerChart",
  __ssrInlineRender: true,
  props: {
    player_id: Number
  },
  setup(__props) {
    const props = __props;
    const VueApexCharts = defineAsyncComponent(() => import("vue3-apexcharts"));
    const data2 = reactive({
      playerData: {}
    });
    onMounted(() => {
      axios.get(`/get-player-chart/${props.player_id}`).then((response) => {
        data2.playerData = response.data;
        console.log("Player data:", data2.playerData);
      }).catch((error) => {
        console.error("Error fetching player data:", error);
      });
    });
    const formatDate = (d) => {
      let date = new Date(d);
      let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
      let months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"];
      return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    };
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/PlayerChart.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {
  __name: "Player",
  __ssrInlineRender: true,
  props: { player_uri: String },
  setup(__props) {
    const props = __props;
    const player = ref({});
    usePage();
    const isExpanded = reactive({
      wins: false,
      loses: false,
      not_played: false
    });
    const categoryColors = {
      1: "#8dc73f",
      2: "#38b64b",
      3: "#00a99c",
      4: "#01aef0",
      5: "#0072bb",
      6: "#92278f",
      7: "#eb008b",
      8: "#ee1d23",
      9: "#f36621",
      10: "#f7941d",
      "?": "transparent",
      "?": "transparent"
    };
    onMounted(() => {
      axios.get(`/get-player/${props.player_uri}`).then((response) => {
        bus.emit("headTitle", "teniser");
        player.value = response.data;
        console.log("Player data:", player.value);
        pageTitle.value = `${player.value.name} - Srpska Tenis Liga`;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching players:", error);
      });
    });
    const matchups = computed(() => {
      let data2 = {
        wins: [],
        loses: [],
        not_played: []
      };
      if (!player.value.matchups) {
        return data2;
      }
      let wins = Object.values(player.value.matchups.won_against);
      let loses = Object.values(player.value.matchups.lost_against);
      if (player.value.matchups.won_against) {
        if (wins.length <= 10 || isExpanded.wins) {
          data2 = { ...data2, wins: player.value.matchups.won_against };
        } else {
          data2 = { ...data2, wins: player.value.matchups.won_against.slice(0, 10) };
        }
      } else {
        data2 = { ...data2, wins: [] };
      }
      if (player.value.matchups.lost_against) {
        if (loses.length <= 10 || isExpanded.loses) {
          data2 = { ...data2, loses: player.value.matchups.lost_against };
        } else {
          data2 = { ...data2, loses: player.value.matchups.lost_against.slice(0, 10) };
        }
      } else {
        data2 = { ...data2, loses: [] };
      }
      if (player.value.matchups.not_played) {
        if (player.value.matchups.not_played.length <= 10 || isExpanded.not_played) {
          data2 = { ...data2, not_played: player.value.matchups.not_played };
        } else {
          data2 = { ...data2, not_played: player.value.matchups.not_played.slice(0, 10) };
        }
      } else {
        data2 = { ...data2, not_played: [] };
      }
      return data2;
    });
    const pageTitle = ref("Srpska Tenis Liga");
    const points = computed(() => {
      if (!player.value.points) {
        return 0;
      }
      return utils.formatAsThousands(player.value.points);
    });
    const locations = computed(() => {
      if (!player.value.locations) {
        return {
          courts: [],
          locations: [],
          leagues: []
        };
      }
      return {
        courts: player.value.locations.courts,
        locations: player.value.locations.counties,
        leagues: player.value.locations.leagues
      };
    });
    const getInteractionText = (number) => {
      if (number == 1 || number > 20 && number % 10 == 1) {
        return "teniserom";
      } else return "tenisera";
    };
    function containsGreek(text) {
      return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      const _component_MatchTable = resolveComponent("MatchTable");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: pageTitle.value }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ "margin-bottom": "-20px", "padding-bottom": "0" })}" class="static-wrapper player">`);
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          class: "edit-btn desktop",
          href: `/${player.value.uri}/izmeni`
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
      if (_ctx.$page.props.auth.user) {
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
          class: "edit-btn mobile",
          href: `/${player.value.uri}/izmeni`
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
      _push(`<div class="${ssrRenderClass([{
        first: player.value.rank == 1,
        second: player.value.rank == 2,
        third: player.value.rank == 3
      }, "rank"])}"><p class="${ssrRenderClass({ "align-left": player.value.rank > 9, "n40": player.value.rank >= 40 && player.value.rank < 50 })}">${ssrInterpolate(player.value.rank)}</p></div>`);
      if (player.value.name) {
        _push(`<h1 class="${ssrRenderClass({ "fix-letters": containsGreek(player.value.name) })}">${ssrInterpolate(player.value.name.split(" ")[0])} <br class="show-mobile"> ${ssrInterpolate(player.value.name.split(" ")[1])}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (!player.value.club && !player.value.location) {
        _push(`<p class="subtitle-spacer">   </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="subtitle">${ssrInterpolate(player.value.location)}</p><div class="dashboard-wrapper"><h2 class="summary-title">Statistika</h2><div class="summary player six desktop"><div class="summary-item"><h2>poeni</h2><p>${ssrInterpolate(points.value)}</p></div><div class="summary-item"><h2>mečevi</h2><p>${ssrInterpolate(player.value.total_matches)}</p></div><div class="summary-item"><h2>pobede</h2><p>${ssrInterpolate(player.value.wins_number)}</p></div><div class="summary-item"><h2>gubitci</h2><p>${ssrInterpolate(player.value.losses_number)}</p></div><div class="summary-item"><h2>% pobeda</h2><p>${ssrInterpolate(player.value.win_precentage)}%</p></div><div class="summary-item"><h2 style="${ssrRenderStyle({ "margin-top": "-10px" })}">kategorija</h2><p class="category"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColors[player.value.category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ [`category-${player.value.category}`]: true, "unknown": player.value.category == "?" }, "number"])}">${ssrInterpolate(player.value.category)}</span></p></div></div><div class="summary player five mobile"><div class="summary-item half"><h2>poeni</h2><p>${ssrInterpolate(points.value)}</p></div><div class="summary-item"><h2>% pobeda</h2><p>${ssrInterpolate(player.value.win_precentage)}%</p></div><div class="summary-item"><h2 style="${ssrRenderStyle({ "margin-top": "-4px" })}">kategorija</h2><p class="category"><span class="diamond" style="${ssrRenderStyle({ border: `1px solid ${categoryColors[player.value.category] || "transparent"}` })}"></span><span class="${ssrRenderClass([{ [`category-${player.value.category}`]: true, "fix": player.value.category == 7, "unknown": player.value.category == "?" }, "number"])}">${ssrInterpolate(player.value.category)}</span></p></div><div class="summary-item"><h2>mečevi</h2><p>${ssrInterpolate(player.value.total_matches)}</p></div><div class="summary-item"><h2>pobede</h2><p>${ssrInterpolate(player.value.wins_number)}</p></div><div class="summary-item"><h2>gubitci</h2><p>${ssrInterpolate(player.value.losses_number)}</p></div></div><h2 class="summary-title">Teniseri</h2><div class="summary player three col"><div class="summary-item players">`);
      if (matchups.value.wins.length > 0) {
        _push(`<!--[--><h2>pobedio ${ssrInterpolate(Object.values(player.value.matchups.won_against).length)} tenisera</h2><!--[-->`);
        ssrRenderList(matchups.value.wins, (player2) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${player2.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(player2.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(player2.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(` (${ssrInterpolate(player2.count)}) </p>`);
        });
        _push(`<!--]-->`);
        if (Object.values(player.value.matchups.won_against).length > 10) {
          _push(`<p class="show-more">${ssrInterpolate(!isExpanded.wins ? "vidi sve" : "vidi manje")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h2>ovaj teniser nikada nije pobedio 🙁</h2>`);
      }
      _push(`</div><div class="summary-item players">`);
      if (matchups.value.loses.length > 0) {
        _push(`<!--[--><h2>izgubio od ${ssrInterpolate(Object.values(player.value.matchups.lost_against).length)} tenisera</h2><!--[-->`);
        ssrRenderList(matchups.value.loses, (player2) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${player2.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(player2.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(player2.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(` (${ssrInterpolate(player2.count)}) </p>`);
        });
        _push(`<!--]-->`);
        if (Object.values(player.value.matchups.lost_against).length > 10) {
          _push(`<p class="show-more">${ssrInterpolate(!isExpanded.loses ? "vidi sve" : "vidi manje")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h2>ovaj teniser nikada nije izgubio 🙂</h2>`);
      }
      _push(`</div><div class="summary-item players">`);
      if (matchups.value.not_played.length > 0) {
        _push(`<!--[--><h2>nije igrao sa ${ssrInterpolate(player.value.matchups.not_played.length)} ${ssrInterpolate(getInteractionText(matchups.value.not_played.length))}</h2><!--[-->`);
        ssrRenderList(matchups.value.not_played, (player2) => {
          _push(`<p>`);
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            href: `/${player2.uri}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(player2.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(player2.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</p>`);
        });
        _push(`<!--]-->`);
        if (player.value.matchups.not_played.length > 10) {
          _push(`<p class="show-more">${ssrInterpolate(!isExpanded.not_played ? "vidi sve" : "vidi manje")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<h2>ovaj teniser je igrao sa svima 🙂</h2>`);
      }
      _push(`</div></div><h2 class="summary-title">lokacije</h2><div class="summary player three col"><div class="summary-item players"><h2>opštine</h2><!--[-->`);
      ssrRenderList(locations.value.locations, (location) => {
        _push(`<p>${ssrInterpolate(location.county)} (${ssrInterpolate(location.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item players"><h2>tereni</h2><!--[-->`);
      ssrRenderList(locations.value.courts, (court) => {
        _push(`<p>`);
        if (court.id > 1) {
          _push(`<a${ssrRenderAttr("href", `/tereni/${court.uri}`)}>${ssrInterpolate(court.name)}</a>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(court.name)}<!--]-->`);
        }
        _push(` (${ssrInterpolate(court.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item players">`);
      if (locations.value.leagues.length > 0) {
        _push(`<!--[--><h2>lige i turniri</h2><!--[-->`);
        ssrRenderList(locations.value.leagues, (league) => {
          _push(`<p>`);
          if (league.uri != "") {
            _push(`<a${ssrRenderAttr("href", `/${league.uri}`)}>${ssrInterpolate(league.name)}</a>`);
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
      if (player.value.id) {
        _push(ssrRenderComponent(_sfc_main$8, {
          player_id: player.value.id
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h2 class="summary-title no-border low-margin">pobede</h2><div class="player-matches">`);
      if (player.value.wins) {
        _push(ssrRenderComponent(_component_MatchTable, {
          showMessage: { wins: player.value.wins_number == 0 },
          propMatches: player.value.wins,
          loadMatches: false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h2 class="summary-title no-border low-margin">gubitci</h2><div class="player-matches mobile-mb-200">`);
      if (player.value.losses) {
        _push(ssrRenderComponent(_component_MatchTable, {
          showMessage: { loses: player.value.losses_number == 0 },
          propMatches: player.value.losses,
          loadMatches: false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Player.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {
  __name: "Rules",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(async () => {
      await nextTick();
      bus.emit("loading", false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Uputstva -" }, null, _parent));
      _push(`<div class="static-wrapper"><h1>UPUTSTVA</h1><p>`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`SrpskaTenisLiga.rs`);
          } else {
            return [
              createTextVNode("SrpskaTenisLiga.rs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` je osnovao <a href="https://www.linkedin.com/in/nikolatosic/" target="_blank">Nikola Tošić</a> 9 decembra 2024.</p><p>SrpskaTenisLiga.rs je sajt posvećen rekreativnom tenisu u Srbiji. SrpskaTenisLiga.rs ne organizuje mečeve, turnine i lige, nego samo dokumentuje rezultate sa spariga, turninra i liga. </p><p>Ciljevi sajta SrpskaTenisLiga.rs su:</p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}">1) Dokumentacija i analiza svih podataka relevantnih za amaterski tenis u Srbiji,</p><p>2) Motivacija amatera da igraju više i generalni razvoj amaterskog tenisa.</p><p>SrpskaTenisLiga.rs je besplatan za korišćenje - nema nikakve naplate, rokove, niti obaveze. Na teniserima je da dodaju svoje mečeve i samim tim poboljšavaju svoj rang. Svaki teniser može da bude dodat na sajt, dovoljno je da dokumentuje jedan meč sa svojim imenom. Nema kvalifikacija i sve je besplatno.</p><h2>Dodavanje mečeva</h2><br><p>Mečevi se dokumentuju tako što se dodaju preko `);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/dodaj"
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
      _push(`. Može da se doda bilo koji meč igran bilo gde 12 meseci pre dodavanja. Da bi meč bio prihvaćen on mora da ima barem jednog takmičara koji je građanin Republike Srbije ili da se odigra na teritoriji Republike Srbije. Znači meč između građanina Srbije i stranca u stranoj državi može da bude dodat na sajt. Takođe meč između dva stranca u Srbiji može da bude dodat.</p><p>Za sada mogu da se dodaju samo singles mečevi. Svi formati bodovanja singles mečeva su prihvaćeni dokle god je rezultat pobednika barem 4 gema. Znači minimalni rezultat da bi meč bio dokumentovan je 4:0. Primeri formata bodovanja su setovi do 4 gema, setovi do 6 gema, meč do 9 gemova, ili meč na vreme sa minimalnim rezultatom od 4:0. Tie break treba da se doda kao jedan gem. Na primer, ako se u meču od 5:5 igra tie break koji je 10:8, onda se upisuje rezultat 6:5.</p><h2>Poeni za aktivnost</h2><br><p>Rang tenisera favorizuje aktivnost tenisera i kalkuliše se dodavanjem poena za svaki pobedu, gubitak, i osvojeni gem. Dakle, izgubljeni meč takođe nosi poene, kao i gemovi koje je osvojio gubitnik. Ako ista dva tenisera igraju više puta u istih 30 dana onda dobijaju manje poena nego da su igrali sa različitim teniserima. Takođe dobijeni poeni opadaju za 10 % svakih 30 dana od dana meča. CIlj ovih pravila je da se motiviše što više igranja (čak i ako se gubi), da se nagrade gubitnici za osvojene gemove, a i da se motiviše različitost u izboru tenisera i konstantno igranje.</p><h2>Kategorije tenisera</h2><br><p>Kategorija tenisera je za sada definisana ručno na osnovu subjektivne ocene. Kategorije su:</p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 1) Odigrao prvi meč - dobrodošao je u svet tenisa. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 2) Teniser je igrao više mečeva ali ima nestabilne osnovne udarce. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 3) Dobra kontrolu jednog ili dva udarca, bez snage i preciznosti. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 4) Dobra kontrola osnovnih udaraca, snaga u nekim. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 5) Stabilnost, snaga i preciznost u svim osnovnim udarcima. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 6) Stabilni, snažni, i precizni osnovni udarci sa dobrom strategijom. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 7) Bivši takmičari i treneri. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 8) Juniorski i mlađi takmičari. </p><p style="${ssrRenderStyle({ "margin-bottom": "0" })}"> Kategorija 9) Seniorski takmičari. </p><p> Kategorija 10) Novak Djoković. </p><p> Ručno odreživanje kategorija je privremeno rešenje. Kasnije će biti zamenjene automatskom evaluacijom kategorija tenisera na osnovu rezultata. </p><p> Ako se ne slažete sa svojom kategorijom pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>. </p><h2>Privatnost tenisera</h2><br><p>Ako teniser ne želi da bude vidljiv na sajtu njihovo ime može da se zameni inicijalima ili da se potpuno sakrije. Ako se oba učesnika u dodatom meču slažu, meč može da se obriše. </p><p>Ako želite da je vaše ime sakriveno ili obrisano sa `);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`SrpskaTenisLiga.rs`);
          } else {
            return [
              createTextVNode("SrpskaTenisLiga.rs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.</p></div><!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Rules.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = {
  __name: "LeagueChart",
  __ssrInlineRender: true,
  setup(__props) {
    const VueApexCharts = defineAsyncComponent(() => import("vue3-apexcharts"));
    const data2 = reactive({
      leagueData: {}
    });
    onMounted(() => {
      axios.get(`/get-league-chart`).then((response) => {
        data2.leagueData = response.data;
        console.log("League data:", data2.leagueData);
      }).catch((error) => {
        console.error("Error fetching league data:", error);
      });
    });
    const formatDate = (d) => {
      let date = new Date(d);
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
        tickAmount: maxRank.value ? maxRank.value - 1 : 8,
        // e.g., 10-2=8 steps
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/LeagueChart.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  __name: "Statistics",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const data2 = ref({});
    onMounted(() => {
      page.props["title"] = "statistika";
      axios.get("/get-statistics").then((response) => {
        data2.value = response.data;
        bus.emit("loading", false);
      }).catch((error) => {
        console.error("Error fetching statistics:", error);
      });
    });
    const locations = computed(() => {
      var _a, _b, _c;
      return {
        courts: (_a = data2.value.locations) == null ? void 0 : _a.courts,
        locations: (_b = data2.value.locations) == null ? void 0 : _b.locations,
        leagues: (_c = data2.value.locations) == null ? void 0 : _c.leagues
      };
    });
    const points = computed(() => {
      if (!data2.value || !data2.value.totals) {
        return 0;
      } else
        return utils.formatAsThousands(data2.value.totals.points);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_Head = resolveComponent("Head");
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Head, { title: "Statistika -" }, null, _parent));
      _push(`<div style="${ssrRenderStyle({ "padding-bottom": "0", "margin-bottom": "60px" })}" class="static-wrapper player"><div class="dashboard-wrapper"><h1 class="hide-mobile">Statistika</h1><h2 class="summary-title">ukupno</h2><div class="summary player three desktop"><div class="summary-item"><h2>poeni</h2><p>${ssrInterpolate(points.value)}</p></div><div class="summary-item"><h2>teniseri</h2><p>${ssrInterpolate((_a = data2.value.totals) == null ? void 0 : _a.players)}</p></div><div class="summary-item"><h2>mečevi</h2><p>${ssrInterpolate((_b = data2.value.totals) == null ? void 0 : _b.matches)}</p></div></div><h2 class="summary-title">teniseri</h2><div class="summary player three desktop col"><div class="summary-item"><h2 class="mb-10">najviše mečeva</h2><!--[-->`);
      ssrRenderList((_c = data2.value.players) == null ? void 0 : _c.total, (player) => {
        _push(`<p class="smaller f20">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
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
      ssrRenderList((_d = data2.value.players) == null ? void 0 : _d.wins, (player) => {
        _push(`<p class="smaller f20">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
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
      ssrRenderList((_e = data2.value.players) == null ? void 0 : _e.loses, (player) => {
        _push(`<p class="smaller f20">`);
        _push(ssrRenderComponent(_component_Link, {
          prefetch: "false",
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
      _push(`<!--]--></div></div><h2 class="summary-title big-margin">lokacije, lige i turniri</h2><div class="summary player three desktop col"><div class="summary-item"><h2 class="mb-10">najaktivnije opštine</h2><!--[-->`);
      ssrRenderList(locations.value.locations, (location) => {
        _push(`<p class="smaller f20">${ssrInterpolate(location.name)} (${ssrInterpolate(location.count)}) </p>`);
      });
      _push(`<!--]--></div><div class="summary-item"><h2 class="mb-10">najkorišćeniji tereni</h2><!--[-->`);
      ssrRenderList(locations.value.courts, (court) => {
        _push(`<p class="smaller f20">`);
        if (court.id > 1) {
          _push(`<a${ssrRenderAttr("href", `/tereni/${court.uri}`)}>${ssrInterpolate(court.name)}</a>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(court.name)}<!--]-->`);
        }
        _push(` (${ssrInterpolate(court.count)})</p>`);
      });
      _push(`<!--]--></div><div class="summary-item">`);
      if (((_f = locations.value.leagues) == null ? void 0 : _f.length) == 0) {
        _push(`<h2 class="mb-10">nema liga ili turnira</h2>`);
      } else {
        _push(`<!--[--><h2 class="mb-10">najaktivnije lige i turniri</h2><!--[-->`);
        ssrRenderList(locations.value.leagues, (league) => {
          _push(`<p class="smaller f20">`);
          if (league.uri != "") {
            _push(`<a${ssrRenderAttr("href", `/${league.uri}`)}>${ssrInterpolate(league.name)}</a>`);
          } else {
            _push(`<!--[-->${ssrInterpolate(league.name)}<!--]-->`);
          }
          _push(` (${ssrInterpolate(league.count)})</p>`);
        });
        _push(`<!--]--><!--]-->`);
      }
      _push(`</div></div><h2 class="summary-title big-margin">Grafikoni</h2>`);
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Statistics.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "Lottie",
  __ssrInlineRender: true,
  props: {
    animationData: {
      type: Object,
      required: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const LottieAnimation = defineAsyncComponent(() => import("lottie-web").then((module) => module.default));
    const props = __props;
    const lottieContainer = ref(null);
    let animationInstance = null;
    onMounted(() => {
      if (typeof window !== "undefined" && lottieContainer.value) {
        animationInstance = LottieAnimation.loadAnimation({
          container: lottieContainer.value,
          animationData: props.animationData,
          renderer: "svg",
          loop: props.loop,
          autoplay: props.autoplay
        });
      }
    });
    onBeforeUnmount(() => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "lottieContainer",
        ref: lottieContainer,
        class: "lottie-container"
      }, _attrs))} data-v-1ef65375></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/components/Lottie.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Lottie = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1ef65375"]]);
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lottie
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {};
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/components/Logo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Logo = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "Loader",
  __ssrInlineRender: true,
  props: { show: Boolean },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "global-loader" }, _attrs))}><div class="spinner"></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/components/Loader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenu = reactive({ state: false });
    const adminMenu = reactive({ state: false });
    const loading = ref(true);
    const isClient = ref(false);
    const scrollPos = reactive({ top: 0 });
    onMounted(() => {
      isClient.value = true;
      if (isClient.value) {
        OverlayScrollbars(
          document.getElementById("os-holder"),
          { className: "os-theme-dark" },
          {
            scroll(osInstance, args) {
              scrollPos.top = args.target.scrollTop;
              bus$1.emit("scroll", scrollPos.top);
            }
          }
        );
        router.on("start", (e) => {
          console.log(e);
          loading.value = true;
        });
        bus$1.on("resetScroll", (e) => {
          document.querySelector(
            "[data-overlayscrollbars-viewport]"
          ).scrollTop = 0;
        });
        bus$1.on("loading", (e) => {
          loading.value = e;
        });
        bus$1.on("headTitle", (e) => {
          headerMessage.value = e;
        });
        window.addEventListener("pageshow", (event) => {
          if (event.persisted && !$page.props.auth.user) {
            window.location.reload();
          }
        });
      }
    });
    const topOffset = computed(() => {
      if (scrollPos.top >= 50) {
        return 60;
      } else {
        return scrollPos.top * 2;
      }
    });
    function toggleAdmin() {
      adminMenu.state = !adminMenu.state;
    }
    const page = usePage();
    const headerMessage = ref("");
    function computeHeaderMessage() {
      var _a;
      if ((_a = page == null ? void 0 : page.props) == null ? void 0 : _a.title) return page.props.title;
      switch (page.url) {
        case "/":
          return "teniseri";
        case "/mecevi":
          return "mečevi";
        case "/dodaj-ligu":
          return "dodaj ligu & turnir";
        case "/dodaj":
          return "dodaj meč";
        case "/teniseri":
          return "teniseri";
        case "/misija":
          return "misija";
        case "/uputstva":
          return "uputstva";
        case "/tereni":
          return "tereni";
        case "/import-meceva":
          return "Import mečeva";
        case "/lige-turniri":
          return "Lige i turniri";
        case "/admin":
          return "admin";
        default:
          return "";
      }
    }
    headerMessage.value = computeHeaderMessage();
    watch(
      () => {
        var _a;
        return [page.url, page.props.title, (_a = page.props.auth) == null ? void 0 : _a.user];
      },
      () => {
        headerMessage.value = computeHeaderMessage();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { show: loading.value }, null, _parent));
      _push(`<header class="header-wrapper"><div class="logo-wrapp" style="${ssrRenderStyle({ marginTop: -topOffset.value + "px" })}">`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/"
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
      _push(`</div><div class="links-wrapper"><div class="${ssrRenderClass([{ "admin": _ctx.$page.props.auth.user }, "links"])}">`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/",
        class: { active: _ctx.$page.url === "/" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`teniseri`);
          } else {
            return [
              createTextVNode("teniseri")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/mecevi",
        class: { active: _ctx.$page.url === "/mecevi" }
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
        prefetch: "false",
        href: "/lige-turniri",
        class: { active: _ctx.$page.url === "/lige-turniri" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`lige i turniri`);
          } else {
            return [
              createTextVNode("lige i turniri")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/tereni",
        class: { active: _ctx.$page.url === "/tereni" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`tereni`);
          } else {
            return [
              createTextVNode("tereni")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/statistika",
        class: { active: _ctx.$page.url === "/statistika" }
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
        prefetch: "false",
        href: "/dodaj",
        class: { active: _ctx.$page.url === "/dodaj" }
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
      if (_ctx.$page.props.auth.user) {
        _push(`<div class="admin-button"><div class="${ssrRenderClass([{ "open-left": adminMenu.state }, "button"])}"></div><div class="${ssrRenderClass([{ "open-middle": adminMenu.state }, "button"])}"></div><div class="${ssrRenderClass([{ "open-right": adminMenu.state }, "button"])}"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mobile-underheader"><h1>${ssrInterpolate(headerMessage.value)}</h1><div class="mobile-button"><div class="${ssrRenderClass([{ "open-left": mobileMenu.state }, "button"])}"></div><div class="${ssrRenderClass([{ "open-middle": mobileMenu.state }, "button"])}"></div><div class="${ssrRenderClass([{ "open-right": mobileMenu.state }, "button"])}"></div></div></div></header>`);
      if (_ctx.$page.props.auth.user) {
        _push(`<div style="${ssrRenderStyle({ top: 110 - topOffset.value + "px", height: "calc(100vh - " + (110 - topOffset.value) + "px)" })}" class="${ssrRenderClass([{ open: adminMenu.state }, "admin-menu"])}"><div class="links">`);
        _push(ssrRenderComponent(_component_Link, {
          onClick: ($event) => toggleAdmin(),
          prefetch: "false",
          href: "/dodaj-teren",
          class: { active: _ctx.$page.url === "/dodaj-teren" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Dodaj teren`);
            } else {
              return [
                createTextVNode("Dodaj teren")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Link, {
          onClick: ($event) => toggleAdmin(),
          prefetch: "false",
          href: "/dodaj-turnir",
          class: { active: _ctx.$page.url === "/dodaj-turnir" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Dodaj turnir`);
            } else {
              return [
                createTextVNode("Dodaj turnir")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Link, {
          onClick: ($event) => toggleAdmin(),
          prefetch: "false",
          href: "/import-meceva",
          class: { active: _ctx.$page.url === "/import-meceva" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Import mečeva`);
            } else {
              return [
                createTextVNode("Import mečeva")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Link, {
          href: "/logout",
          class: "logout",
          method: "post"
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="mobile-menu" class="${ssrRenderClass({ open: mobileMenu.state })}"><div class="links">`);
      _push(ssrRenderComponent(_component_Link, {
        class: ["bigger", { active: _ctx.$page.url === "/" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`teniseri`);
          } else {
            return [
              createTextVNode("teniseri")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        class: ["bigger", { active: _ctx.$page.url === "/mecevi" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/mecevi"
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
        class: ["bigger", { active: _ctx.$page.url === "/lige-turniri" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/lige-turniri"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`lige i turniri`);
          } else {
            return [
              createTextVNode("lige i turniri")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        class: ["bigger", { active: _ctx.$page.url === "/tereni" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/tereni"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`tereni`);
          } else {
            return [
              createTextVNode("tereni")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Link, {
        class: ["bigger", { active: _ctx.$page.url === "/statistika" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/statistika"
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
        class: ["bigger", { active: _ctx.$page.url === "/dodaj" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/dodaj"
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
        class: ["bigger", { active: _ctx.$page.url === "/dodaj-ligu" }],
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/dodaj-ligu"
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
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        onClick: ($event) => mobileMenu.state = false,
        href: "/uputstva",
        class: { active: _ctx.$page.url === "/uputstva" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`uputstva`);
          } else {
            return [
              createTextVNode("uputstva")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.$page.props.auth.user) {
        _push(`<div class="admin-links">`);
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: ["bigger", { active: _ctx.$page.url === "/dodaj-turnir" }],
            prefetch: "false",
            onClick: ($event) => mobileMenu.state = false,
            href: "/dodaj-turnir"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`dodaj turnir`);
              } else {
                return [
                  createTextVNode("dodaj turnir")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: ["bigger", { active: _ctx.$page.url === "/dodaj-teren" }],
            prefetch: "false",
            onClick: ($event) => mobileMenu.state = false,
            href: "/dodaj-teren"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`dodaj teren`);
              } else {
                return [
                  createTextVNode("dodaj teren")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            class: ["bigger", { active: _ctx.$page.url === "/import-meceva" }],
            prefetch: "false",
            onClick: ($event) => mobileMenu.state = false,
            href: "/import-meceva"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`import mečeva`);
              } else {
                return [
                  createTextVNode("import mečeva")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.$page.props.auth.user) {
          _push(ssrRenderComponent(_component_Link, {
            prefetch: "false",
            onClick: ($event) => mobileMenu.state = false,
            class: "logout-mobile",
            method: "post",
            href: "/logout"
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div id="os-holder" style="${ssrRenderStyle({ height: "calc(100vh - 100" - topOffset.value + 50 + "px)" })}"><main id="main">`);
      ssrRenderSlot(_ctx.$slots, "default", { scrollPos }, null, _push, _parent);
      _push(`</main><footer class="footer-wrapper"><p class="footer-text">`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/dodaj"
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
        class: "hide-mobile",
        prefetch: "false",
        href: "/dodaj-ligu"
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
      _push(`</p><div class="icons-wrapper"><a class="viber" target="_blank" href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43"><defs></defs><path class="cls-1" d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z" transform="translate(-401.24 -277.78)"></path><path class="cls-1" d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z" transform="translate(-401.24 -277.78)"></path></svg></a><a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43"><defs></defs><path class="cls-1" d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z" transform="translate(-400.61 -277.64)"></path></svg></a></div><div class="footer-text normal-font">`);
      _push(ssrRenderComponent(_component_Link, {
        prefetch: "false",
        href: "/uputstva"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`uputstva`);
          } else {
            return [
              createTextVNode("uputstva")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/Layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const handlers = /* @__PURE__ */ new Map();
function globalClickHandler(event) {
  event.stopPropagation();
  for (const [el, getHandler] of handlers.entries()) {
    if (!(el === event.target || el.contains(event.target))) {
      const handler = typeof getHandler === "function" ? getHandler() : getHandler;
      handler == null ? void 0 : handler(event);
    }
  }
}
const clickOutside = {
  mounted(el, binding) {
    if (typeof window === "undefined") return;
    handlers.set(el, () => binding.value);
    if (handlers.size === 1) {
      document.addEventListener("click", globalClickHandler);
    }
  },
  beforeUnmount(el) {
    if (typeof window === "undefined") return;
    handlers.delete(el);
    if (handlers.size === 0) {
      document.removeEventListener("click", globalClickHandler);
    }
  }
};
createServer((page) => createInertiaApp({
  page,
  render: renderToString,
  title: (title) => `${title} Srpska Tenis Liga`,
  resolve: (name) => {
    const pages = /* @__PURE__ */ Object.assign({ "./Pages/AddMatch.vue": __vite_glob_0_0, "./Pages/Auth/AddCourt.vue": __vite_glob_0_1, "./Pages/Auth/AddLeague.vue": __vite_glob_0_2, "./Pages/Auth/BatchMatches.vue": __vite_glob_0_3, "./Pages/Auth/Dashboard.vue": __vite_glob_0_4, "./Pages/Auth/EditCourt.vue": __vite_glob_0_5, "./Pages/Auth/EditDouble.vue": __vite_glob_0_6, "./Pages/Auth/EditLeague.vue": __vite_glob_0_7, "./Pages/Auth/EditMatch.vue": __vite_glob_0_8, "./Pages/Auth/EditPlayer.vue": __vite_glob_0_9, "./Pages/Auth/Login.vue": __vite_glob_0_10, "./Pages/Auth/Register.vue": __vite_glob_0_11, "./Pages/Court.vue": __vite_glob_0_12, "./Pages/Courts.vue": __vite_glob_0_13, "./Pages/ForClubs.vue": __vite_glob_0_14, "./Pages/Home.vue": __vite_glob_0_15, "./Pages/Join.vue": __vite_glob_0_16, "./Pages/League.vue": __vite_glob_0_17, "./Pages/Leagues.vue": __vite_glob_0_18, "./Pages/Matches.vue": __vite_glob_0_19, "./Pages/Matches/AddDouble.vue": __vite_glob_0_20, "./Pages/Matches/AddSingle.vue": __vite_glob_0_21, "./Pages/Mision.vue": __vite_glob_0_22, "./Pages/Player.vue": __vite_glob_0_23, "./Pages/Rules.vue": __vite_glob_0_24, "./Pages/Statistics.vue": __vite_glob_0_25, "./Pages/components/Dropdown.vue": __vite_glob_0_26, "./Pages/components/EditIcon.vue": __vite_glob_0_27, "./Pages/components/LeagueChart.vue": __vite_glob_0_28, "./Pages/components/Lottie.vue": __vite_glob_0_29, "./Pages/components/PlayerChart.vue": __vite_glob_0_30 });
    const resolved = pages[`./Pages/${name}.vue`];
    if (!resolved) {
      throw new Error(`Page not found: ./Pages/${name}.vue`);
    }
    resolved.default.layout = resolved.default.layout || _sfc_main;
    return resolved;
  },
  setup({ App, props, plugin }) {
    const app = createSSRApp({ render: () => h(App, props) });
    app.use(plugin).use(bus).directive("click-outside", clickOutside).component("Head", Head).component("Link", Link).component("Dropdown", _sfc_main$u).component("vSelect", VueSelect).component("datepicker", VueDatepicker).component("PlayerTable", _sfc_main$e).component("MatchTable", _sfc_main$a);
    return app;
  }
}));
