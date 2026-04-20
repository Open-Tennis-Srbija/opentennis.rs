<script setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbars } from "overlayscrollbars";
import { bus } from "vue3-eventbus";
import Logo from "@components/Logo.vue";
import Loader from "@components/Loader.vue";
import utils from "../utils";
import AbramoBanner from "../Pages/components/promo/AbramoBanner.vue";
import PlavinciBanner from "../Pages/components/promo/PlavinciBanner.vue";

const mobileMenu = reactive({ state: false });
const sideMenu = reactive({ state: false });
const loading = ref(true);
const isLoggedOut = ref(false);

const isClient = ref(false);

const scrollPos = reactive({ top: 0 });

const activePromo = ref(0);


const activeChilds = reactive({
    players: false,
    leagues: false,
    courts: false,
    matches: false,
    tournaments: false,
});

onMounted(() => {
    isClient.value = true;
    if (isClient.value) {
        let os = OverlayScrollbars(
            document.getElementById("os-holder"),
            { className: "os-theme-dark" },
            {
                scroll(osInstance, args) {
                    scrollPos.top = args.target.scrollTop;
                    bus.emit("scroll", scrollPos.top);
                },
            },
        );

        activePromo.value = Math.floor(Math.random() * 2) + 1;
        console.log(activePromo.value);
        router.on('start', (e) => {
            console.log(e)
            activePromo.value = Math.floor(Math.random() * 2) + 1;
            loading.value = true
        })
        router.on('finish', (e) => {
            // Check if we just logged out (user was authenticated before but not now)
            // and we're on the home page
            if (isLoggedOut.value && page.url === '/') {
                loading.value = false
                isLoggedOut.value = false // Reset the flag
            }
        })
        router.on('error', (e) => {
            // Reset logout flag on error
            if (isLoggedOut.value) {
                loading.value = false
                isLoggedOut.value = false
            }
        })
        bus.on("resetScroll", (e) => {
            document.querySelector(
                "[data-overlayscrollbars-viewport]",
            ).scrollTop = 0;
        });
        bus.on("loading", (e) => {
            loading.value = e;
        });
        bus.on('headTitle', (e) => {
            headerMessage.value = e;
        })
        bus.on('active', (e) => {
            if (e === 'players') {
                activeChilds.players = true;
                activeChilds.leagues = false;
                activeChilds.matches = false;
                activeChilds.courts = false;
                activeChilds.tournaments = false;
            } else if (e === 'leagues') {
                activeChilds.players = false;
                activeChilds.leagues = true;
                activeChilds.matches = false;
                activeChilds.courts = false;
                activeChilds.tournaments = false;
            } else if (e === 'courts') {
                activeChilds.players = false;
                activeChilds.leagues = false;
                activeChilds.matches = false;
                activeChilds.courts = true;
                activeChilds.tournaments = false;
            }
            else if (e === 'tournaments') {
                activeChilds.players = false;
                activeChilds.leagues = false;
                activeChilds.courts = false;
                activeChilds.matches = false;
                activeChilds.tournaments = true;
            }
            else if (e === 'matches') {
                activeChilds.players = false;
                activeChilds.leagues = false;
                activeChilds.courts = false;
                activeChilds.tournaments = false;
                activeChilds.matches = true;
            }
        });
        bus.on('clearActive', (e) => {
             activeChilds.players = false;
                activeChilds.leagues = false;
                activeChilds.matches = false;
                activeChilds.courts = false;
                activeChilds.tournaments = false;
        });
        window.addEventListener('pageshow', (event) => {
            // If coming from bfcache and user is not logged in, reload to get fresh state
            if (event.persisted && !$page.props.auth.user) {
                window.location.reload();
            }
            // Only ensure loading is false after logout when page is shown
            if (isLoggedOut.value && page.url === '/') {
                loading.value = false;
                isLoggedOut.value = false;
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

function toggleMenu() {
    mobileMenu.state = !mobileMenu.state;
}


const sideMenuRef = ref(null);
const sideMenuButtonRef = ref(null);

function toggleSideMenu() {
    sideMenu.state = !sideMenu.state;
}

const handleClickOutside = (event) => {
    if (!sideMenu.state) return;
    const menuEl = sideMenuRef.value;
    const buttonEl = sideMenuButtonRef.value;
    if (menuEl && !menuEl.contains(event.target) && buttonEl && !buttonEl.contains(event.target)) {
        sideMenu.state = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const page = usePage();
const headerMessage = ref("");

function computeHeaderMessage() {
    if (page?.props?.title) return page.props.title;

    switch (page.url) {
        case "/":
            return "turniri";
        case "/teniseri":
            return "teniseri";
        case "/mecevi":
            return "mečevi";
        case "/dodaj-turnir":
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
        case "/lige":
            return 'Lige i turniri';
        case "/admin":
            return "admin";
        default:
            return "";
    }
}

const headerStats = computed(() => page.props.headerStats);

const matchesText = computed(() => {
    //check last digit of headerStats.totalMatches
    const lastDigit = headerStats.value.totalMatches % 10;
    if (headerStats.value.totalMatches === 0) {
        return "Mečevi";
    }
    else if (headerStats.value.totalMatches < 5) {
        return utils.formatAsThousands(headerStats.value.totalMatches) + " Meča";
    }
    else if (lastDigit === 1) {
        return utils.formatAsThousands(headerStats.value.totalMatches) + " Meč";
    } else {
        return utils.formatAsThousands(headerStats.value.totalMatches) + " Mečeva";
    }
});

const playersText = computed(() => {
    //check last digit of headerStats.totalMatches
    const lastDigit = headerStats.value.totalPlayers % 10;
    if (headerStats.value.totalPlayers === 0) {
        return "Teniseri";
    }
    else if (lastDigit === 1) {
        return utils.formatAsThousands(headerStats.value.totalPlayers) + " Teniser";
    } else {
        return utils.formatAsThousands(headerStats.value.totalPlayers) + " Tenisera";
    }
});

const courtsText = computed(() => {
    //check last digit of headerStats.totalCourts
    const totalCourts = headerStats.value.totalCourts - 1; // Subtract 1 first
    const lastDigit = totalCourts % 10;
    
    if (headerStats.value.totalCourts === 0) {
        return "Tereni";
    }
    else if (lastDigit === 1 && totalCourts !== 11) { // Avoid "11 Teren", should be "11 Terena"
        return utils.formatAsThousands(totalCourts) + " Teren";
    } else {
        return utils.formatAsThousands(totalCourts) + " Terena";
    }
});
const leaguesText = computed(() => {
    //check last digit of headerStats.totalLeagues
    const lastDigit = headerStats.value.totalLeagues % 10;
    if (headerStats.value.totalLeagues === 0) {
        return "Lige";
    }
    else if (lastDigit === 1) {
        return utils.formatAsThousands(headerStats.value.totalLeagues - 1) + " Liga";
    }
    else if (lastDigit === 2 || headerStats.value.totalLeagues === 3) {
        return utils.formatAsThousands(headerStats.value.totalLeagues - 1) + " lige";
    }
    else {
        return utils.formatAsThousands(headerStats.value.totalLeagues - 1) + " Liga";
    }
});
const tournamentsText = computed(() => {
    //check last digit of headerStats.totalTournaments
    const lastDigit = headerStats.value.totalTournaments % 10;
    if (headerStats.value.totalTournaments === 0) {
        return "Turniri";
    }
    else if (lastDigit === 1) {
        return utils.formatAsThousands(headerStats.value.totalTournaments) + " Turnir";
    } else {
        return utils.formatAsThousands(headerStats.value.totalTournaments) + " Turnira";
    }
});

// Set initial value
headerMessage.value = computeHeaderMessage();

// Watch for auth state changes to detect logout
watch(
    () => page.props.auth?.user,
    (newUser, oldUser) => {
        // If user was logged in before but not now, they logged out
        if (oldUser && !newUser) {
            isLoggedOut.value = true
        }
    }
);

watch(
    () => [page.url, page.props.title, page.props.auth?.user],
    () => {
        headerMessage.value = computeHeaderMessage();
    }
);
// Watch for changes in url or title

</script>
<template>
    <Loader :show="loading" />
    <header class="header-wrapper">
        <div class="links-wrapper">
            <Link prefetch="false" :href="'/'" @click="mobileMenu.state = false">
            <Logo :style="{ top: 50 + 'px' }" />
            </Link>
            <div class="links" :class="{ 'admin': $page.props.auth.user }">
                <div class="link-group">
                    <Link prefetch="false" :href="'/'"
                        :class="{ active: $page.url === '/', activeChild: activeChilds.tournaments }">
                    {{ 'home' }}</Link>
                    <Link prefetch="false" :href="'/turniri'"
                        :class="{ active: $page.url === '/turniri', activeChild: activeChilds.tournaments }">
                    {{ tournamentsText }}</Link>
                    <Link prefetch="false" :href="'/teniseri'"
                        :class="{ active: $page.url === '/teniseri', activeChild: activeChilds.players }">{{ playersText }}</Link>
                    </div>
                    <div class="link-group">
                    <Link prefetch="false" :href="'/mecevi'"
                        :class="{ active: $page.url === '/mecevi', activeChild: activeChilds.matches }">{{ matchesText }}
                    </Link>
                    <Link prefetch="false" :href="'/tereni'"
                        :class="{ active: $page.url === '/tereni', activeChild: activeChilds.courts }">{{ courtsText }}
                    </Link>
                    <Link prefetch="false" :href="'/lige'"
                        :class="{ active: $page.url === '/lige', activeChild: activeChilds.leagues }">
                    {{ leaguesText }}</Link>
                    <!-- <Link prefetch="false" class="blue" :href="'/dodaj'" :class="{ active: $page.url === '/dodaj' }">
                    dodaj meč</Link> -->
                </div>
                <!-- <Link prefetch="false" :href="'/dodaj-turnir'" :class="{ active: $page.url === '/dodaj-turnir' }">dodaj ligu</Link> -->
                <div ref="sideMenuButtonRef" @click="toggleSideMenu" class="side-menu-button">
                    <div class="button" :class="{ 'open-left': sideMenu.state }"></div>
                    <div class="button" :class="{ 'open-middle': sideMenu.state }"></div>
                    <div class="button" :class="{ 'open-right': sideMenu.state }"></div>
                </div>
            </div>
        </div>
        <div class="mobile-button" @click="toggleMenu()">
            <div class="button" :class="{ 'open-left': mobileMenu.state }"></div>
            <div class="button" :class="{ 'open-middle': mobileMenu.state }"></div>
            <div class="button" :class="{ 'open-right': mobileMenu.state }"></div>
        </div>
        <!-- <div class="mobile-underheader" @click="toggleMenu">
            <h1>
                {{ headerMessage }}
            </h1>
        </div> -->
    </header>
    <!-- top: 90 - topOffset + 'px', -->
    <div ref="sideMenuRef" class="side-menu" style="top: 50px;" :style="{ height: 'calc(100vh - ' + (90 - topOffset) + 'px)' }"
        :class="{ open: sideMenu.state }">
        <div class="links">
            <Link @click="toggleSideMenu()" class="bigger" prefetch="false" :href="'/statistika'"
                :class="{ active: $page.url === '/statistika' }">Statistika</Link>
            <Link @click="toggleSideMenu()" class="bigger" prefetch="false" :href="'/dodaj-turnir'"
                :class="{ active: $page.url === '/dodaj-turnir' }">Dodaj turnir ili ligu</Link>
            <Link @click="toggleSideMenu()" class="bigger" prefetch="false" :href="'/volontiraj'"
                :class="{ active: $page.url === '/volontiraj' }">Volontiraj</Link>
            <Link @click="toggleSideMenu()" class="bigger" prefetch="false" :href="'/o-nama'"
                :class="{ active: $page.url === '/o-nama' }">O nama</Link>


            <div v-if="$page.props.auth.user" class="admin-separator"></div>

            <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/dodaj-teren'" :class="{ active: $page.url === '/dodaj-teren' }">Dodaj teren</Link>
            <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/dodaj-novi-turnir'" :class="{ active: $page.url === '/dodaj-novi-turnir' }">Dodaj novi turnir</Link>
             <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/upravljaj-serijama'" :class="{ active: $page.url === '/upravljaj-serijama' }">upravljaj serijama</Link>
            <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/dodaj-novu-ligu'" :class="{ active: $page.url === '/dodaj-novu-ligu' }">Dodaj novu ligu</Link>
            <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/import-meceva'" :class="{ active: $page.url === '/import-meceva' }">Import singlova</Link>
            <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/import-dublova'" :class="{ active: $page.url === '/import-dublova' }">Import dublova</Link>
            <Link v-if="$page.props.auth.user" @click="toggleSideMenu()" class="bigger logout" :href="'/logout'"
                method="post">odjavi se</Link>

            <!-- <div class="socials">
                <a class="viber" target="_blank"
                    href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43">
                        <defs></defs>
                        <path class="cls-1"
                            d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z"
                            transform="translate(-401.24 -277.78)" />
                    </svg>
                </a>
                <a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43">
                        <defs></defs>
                        <path class="cls-1"
                            d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z"
                            transform="translate(-400.61 -277.64)" />
                    </svg>
                </a>
            </div> -->
        </div>
    </div>
    <div id="mobile-menu" :class="{ open: mobileMenu.state }">
        <div class="links">
            <Link class="bigger blue" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/dodaj'"
                :class="{ active: $page.url === '/dodaj' }">dodaj meč</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/turniri'"
                :class="{ active: $page.url === '/turniri', childActive: activeChilds.leagues }">{{ tournamentsText }}
            </Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/teniseri'"
                :class="{ active: $page.url === '/teniseri', childActive: activeChilds.players }">{{ playersText }}</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/mecevi'"
                :class="{ active: $page.url === '/mecevi', childActive: activeChilds.matches }">{{ matchesText }}</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/tereni'"
                :class="{ active: $page.url === '/tereni', childActive: activeChilds.courts }">{{ courtsText }}</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/lige'"
                :class="{ active: $page.url === '/lige', childActive: activeChilds.leagues }">{{ leaguesText }}
            </Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/statistika'"
                :class="{ active: $page.url === '/statistika' }">statistika</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/dodaj-turnir'"
                :class="{ active: $page.url === '/dodaj-turnir' }">dodaj turnir ili ligu</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/volontiraj'"
                    :class="{ active: $page.url === '/volontiraj' }">Volontiraj</Link>
            <Link class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false" :href="'/o-nama'"
                :class="{ active: $page.url === '/o-nama' }">O nama</Link>

            <div v-if="$page.props.auth.user" class="admin-separator"></div>

            <Link v-if="$page.props.auth.user" class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false"
                :href="'/dodaj-novi-turnir'" :class="{ active: $page.url === '/dodaj-novi-turnir' }">dodaj novi turnir</Link>
             <Link v-if="$page.props.auth.user" class="bigger" @click="toggleSideMenu()" prefetch="false"
                :href="'/upravljaj-serijama'" :class="{ active: $page.url === '/upravljaj-serijama' }">upravljaj serijama</Link>
            <Link v-if="$page.props.auth.user" class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false"
                :href="'/dodaj-novu-ligu'" :class="{ active: $page.url === '/dodaj-novu-ligu' }">dodaj novu ligu</Link>
            <Link v-if="$page.props.auth.user" class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false"
                :href="'/dodaj-teren'" :class="{ active: $page.url === '/dodaj-teren' }">dodaj teren</Link>
            <Link v-if="$page.props.auth.user" class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false"
                :href="'/import-meceva'" :class="{ active: $page.url === '/import-meceva' }">import sunglova</Link>
            <Link v-if="$page.props.auth.user" class="bigger" prefetch="false" @click.prevent="mobileMenu.state = false"
                :href="'/import-dublova'" :class="{ active: $page.url === '/import-dublova' }">import dublova</Link>

            <Link prefetch="false" @click.prevent="mobileMenu.state = false" class="logout-mobile" method="post"
                :href="'/logout'" v-if="$page.props.auth.user">odjavi se</Link>

            <!-- <div class="socials">
                <a class="viber" target="_blank"
                    href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43">
                        <defs></defs>
                        <path class="cls-1"
                            d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z"
                            transform="translate(-401.24 -277.78)" />
                    </svg>
                </a>
                <a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43">
                        <defs></defs>
                        <path class="cls-1"
                            d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z"
                            transform="translate(-400.61 -277.64)" />
                    </svg>
                </a>
            </div> -->

        </div>
    </div>
    <div id="os-holder" :style="{ height: 'calc(100vh - ' + 100 - topOffset + 50 + 'px)' }">
        <main id="main">
            <slot :scrollPos="scrollPos" />
        </main>
        <footer class="footer-wrapper">
            <p class="footer-text">
                <Link prefetch="false" :href="'/dodaj'">dodaj meč</Link>
                <Link class="hide-mobile" prefetch="false" :href="'/dodaj-turnir'">dodaj ligu</Link>
            </p>
            <!-- <div class="icons-wrapper">
                <a class="viber" target="_blank"
                    href="https://invite.viber.com/?g2=AQBO6Yhe7XWiGlQ11H197bPnIWHJjH2nT7C42UhORV%2F3VIU5EWEozbBE%2BLo11vym">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.34 40.43">
                        <defs></defs>
                        <path class="cls-1"
                            d="M435.26,281.72c-1-.92-5.07-3.87-14.11-3.91,0,0-10.67-.65-15.86,4.12-2.9,2.9-3.91,7.13-4,12.38s-.25,15.1,9.24,17.76h0v4.07s-.06,1.65,1,2c1.32.41,2.09-.85,3.34-2.19.69-.74,1.64-1.84,2.35-2.67a36.72,36.72,0,0,0,12-.88c1.31-.43,8.72-1.38,9.92-11.22C440.44,291,438.59,284.61,435.26,281.72Zm1.1,18.72c-1,8.22-7,8.74-8.14,9.09a33.85,33.85,0,0,1-10.36.88s-4.11,5-5.39,6.24a.68.68,0,0,1-.6.25c-.22-.06-.28-.32-.27-.7l0-6.77c-8-2.22-7.56-10.6-7.47-15s.92-8,3.37-10.39c4.39-4,13.45-3.39,13.45-3.39,7.65,0,11.32,2.34,12.17,3.11C436,286.19,437.41,292,436.36,300.44Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M421.92,300.93a1.36,1.36,0,0,0,1.1-.41l.76-.95a1.65,1.65,0,0,1,2.1-.29,20.72,20.72,0,0,1,3.62,2.59,1.44,1.44,0,0,1,.31,1.89h0a7.61,7.61,0,0,1-1.57,1.94h0a2.59,2.59,0,0,1-2.51.68v0a30.5,30.5,0,0,1-8.07-4.47,25.53,25.53,0,0,1-7.81-11.41l0,0a2.61,2.61,0,0,1,.68-2.51h0a8,8,0,0,1,1.94-1.57h0a1.43,1.43,0,0,1,1.89.3,21.46,21.46,0,0,1,2.6,3.62,1.66,1.66,0,0,1-.3,2.11l-.95.75a1.41,1.41,0,0,0-.41,1.1S416.66,299.59,421.92,300.93Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M430.19,296.53a.53.53,0,0,0,.51-.52,10.86,10.86,0,0,0-3.07-8,10.46,10.46,0,0,0-7.49-3h0a.51.51,0,0,0,0,1,9.49,9.49,0,0,1,6.79,2.68,9.89,9.89,0,0,1,2.75,7.3.51.51,0,0,0,.51.51Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M427.5,295.48h0A.51.51,0,0,1,427,295a5.9,5.9,0,0,0-1.53-4.32,6.35,6.35,0,0,0-4.46-1.94.51.51,0,0,1,.08-1,7.38,7.38,0,0,1,5.13,2.27,6.94,6.94,0,0,1,1.8,5A.53.53,0,0,1,427.5,295.48Z"
                            transform="translate(-401.24 -277.78)" />
                        <path class="cls-1"
                            d="M424.87,294.6a.52.52,0,0,1-.51-.49,2.42,2.42,0,0,0-2.57-2.67.52.52,0,0,1,0-1,3.43,3.43,0,0,1,3.54,3.65.51.51,0,0,1-.48.54Z"
                            transform="translate(-401.24 -277.78)" />
                    </svg>
                </a>
                <a class="WhatsApp" target="_blank" href="https://chat.whatsapp.com/J67Pf7B7u127ZZBdMNl5FZ">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.24 40.43">
                        <defs></defs>
                        <path class="cls-1"
                            d="M400.61,318.07l2.84-10.39a20,20,0,1,1,7.78,7.6Zm11.11-6.42a16.87,16.87,0,0,0,9.09,2.69,16.62,16.62,0,1,0-13.71-7.18l-1.68,6.15Zm19.19-9.2c-.13-.21-.46-.33-1-.59s-3-1.46-3.43-1.62-.79-.26-1.12.25-1.3,1.63-1.59,2-.58.37-1.08.12a13.47,13.47,0,0,1-4-2.48,15,15,0,0,1-2.78-3.47c-.3-.5,0-.77.21-1s.51-.59.76-.88a3.53,3.53,0,0,0,.5-.83.91.91,0,0,0,0-.88c-.13-.25-1.13-2.71-1.54-3.72s-.82-.84-1.13-.86h-1a1.82,1.82,0,0,0-1.33.62,5.65,5.65,0,0,0-1.76,4.18,9.74,9.74,0,0,0,2.05,5.18c.25.33,3.53,5.39,8.55,7.56a30.15,30.15,0,0,0,2.85,1.05,6.85,6.85,0,0,0,3.15.2c1-.14,3-1.21,3.38-2.38A4.24,4.24,0,0,0,430.91,302.45Z"
                            transform="translate(-400.61 -277.64)" />
                    </svg>
                </a>
            </div> -->
            <div class="footer-text hide-mobile">
                <Link prefetch="false" :href="'/o-nama'">O nama</Link>
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
@use "../../css/sass/app.scss";
@use '@abstracts/variables' as *;

.header-wrapper {

    .crazy-pizza {
        background-color: #8d1f1e !important;
        height: 40px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden !important;

        &:hover {
            p {
                color: #fedf37 !important;

                span {
                    color: #fedf37 !important;
                }
            }
        }

        .banner-icon {
            display: block !important;
            height: 40px !important;
            width: auto !important;
            position: absolute !important;
            bottom: -5px !important;
            left: calc(50vw - 220px);
        }

        p {
            font-family: 'Gill Sans';
            font-size: 18px;
            line-height: 1;
            font-weight: 500;
            color: #f5eccd !important;
            text-transform: uppercase;
            text-decoration: none;
            text-align: center;

            span {
                color: #f5eccd !important;
                font-weight: 400;
                font-size: 13px;
                line-height: 1;
            }
        }

        @media screen and (max-width: 450px) {
            p {
                padding-top: 7px;

            }

            &:hover {
                p {
                    color: #f5eccd !important;

                    span {
                        color: #f5eccd !important;
                    }
                }
            }
        }

        @media screen and (max-width: 450px) {
            .banner-icon {
                left: 10px;
            }

            p {
                font-size: 15px;

                span {
                    font-size: 9px;
                }
            }
        }
    }

    .plavinci {
        background-color: $plavinci-blue !important;
        height: 40px !important;

        svg {
            height: 28px !important;
            transition: all 0.3s ease-in-out;
        }

        @media screen and (max-width: 450px) {
            svg {
                top: unset !important;
            }
            
        }
         &:hover {
            svg {
               .cls-1{
                    fill: #fedf37 !important;
               }
            }
        }
        
    }

    .abramo {
        background-color: $abramo-black !important;
        height: 40px !important;
        svg {
            margin-top: 4px;
            height: 25px !important;
            transition: all 0.3s ease-in-out;
        }

          @media screen and (max-width: 450px) {
            svg {
                top: unset !important;
            }
            
        }
         &:hover {
            svg {
               .cls-1{
                    fill: #fedf37 !important;
               }
            }
        }
    
    }
}
</style>
