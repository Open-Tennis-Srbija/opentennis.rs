<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import axios from 'axios';
import { usePage } from '@inertiajs/vue3';
import bus from "vue3-eventbus";
import { computed } from 'vue';
import EditIcon from "@components/EditIcon.vue";


const props = defineProps({
    match_number: {
        type: Number,
        required: true
    },
});

const match = ref({});

const page = usePage();

onMounted(() => {
    axios.get(`/api/match/${props.match_number}`).then(response => {
        match.value = response.data;
        bus.emit("loading", false);
    });
    bus.emit('active', 'matches');

});

onBeforeUnmount(() => {
    bus.emit('clearActive');
});


const categoryColorsAll = {
    1: '#8dc73f',
    2: '#38b64b',
    3: '#00a99c',
    4: '#01aef0',
    5: '#0072bb',
    6: '#92278f',
    7: '#eb008b',
    8: '#ee1d23',
    9: '#f36621',
    10: '#f7941d',
    '?': '#a1a1a1',
}

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
        "dec",
    ];
    let month = new Date(date).getMonth();

    return months[month];
}

const formatedMatch = computed(() => {

    return {
        ...match.value,
        winner1_first_name: match.value?.winner1_name?.split(" ")[0],
        winner1_last_name: match.value?.winner1_name?.split(" ")[1],
        winner2_first_name: match.value?.winner2_name ? match.value?.winner2_name.split(" ")[0] : null,
        winner2_last_name: match.value?.winner2_name ? match.value?.winner2_name.split(" ")[1] : null,
        loser1_first_name: match.value?.loser1_name?.split(" ")[0],
        loser1_last_name: match.value?.loser1_name?.split(" ")[1],
        loser2_first_name: match.value?.loser2_name ? match.value?.loser2_name.split(" ")[0] : null,
        loser2_last_name: match.value?.loser2_name ? match.value?.loser2_name.split(" ")[1] : null,
        day: getDateDay(match.value?.date),
        month: getDateMonth(match.value?.date),
        year: new Date(match.value?.date).getFullYear(),
        date: new Date(match.value?.date).getDate(),
    };
});

const matchTitle = computed(() => {
    if (!match.value?.winner1_name || !match.value?.loser1_name) {
        return `Meč ${formatedMatch.value.number || ''} -`;
    }

    const isDoubles = match.value?.winner2_name && match.value?.loser2_name;
    const score = formatedMatch.value.set_score || '';

    if (isDoubles) {
        const winners = `${formatedMatch.value.winner1_first_name} ${formatedMatch.value.winner1_last_name} i ${formatedMatch.value.winner2_first_name} ${formatedMatch.value.winner2_last_name}`;
        const losers = `${formatedMatch.value.loser1_first_name} ${formatedMatch.value.loser1_last_name} i ${formatedMatch.value.loser2_first_name} ${formatedMatch.value.loser2_last_name}`;
        return `${winners} vs ${losers} ${score}`;
    } else {
        const winner = `${formatedMatch.value.winner1_first_name} ${formatedMatch.value.winner1_last_name}`;
        const loser = `${formatedMatch.value.loser1_first_name} ${formatedMatch.value.loser1_last_name}`;
        return `${winner} vs ${loser} ${score}`;
    }
});
</script>
<template>
    <Head :title="matchTitle + ' -'" />
    <div class="match-entry">
        <Link :class="{ child: !isHome }" prefetch="false" class="edit-btn" v-if="$page.props.auth.user"
            :href="`/izmeni/${formatedMatch.number}`">
        <EditIcon />
        </Link>
        <div class="score">
            {{ formatedMatch.set_score }}
            <br v-if="formatedMatch.game_score && formatedMatch.game_score !== ''" />
            <span class="games">{{ formatedMatch.game_score }}</span>
        </div>

        <div class="info">
            <div class="info-wrapp">
                <div class="text">
                    <Link prefetch="false" :href="`/${formatedMatch.winner1_uri}`">{{ formatedMatch.winner1_first_name
                    }}<br class="show-mobile" /> {{
                        formatedMatch.winner1_last_name
                    }}
                    </Link>
                    <div class="ranks">
                        <div class="category-wrapp">
                            <span class="diamond"
                                :style="{ border: `1px solid ${categoryColorsAll[formatedMatch.winner1_category] || 'transparent'}` }">
                            <span
                                class="category"
                                :class="{ 'category-unknown': formatedMatch.winner1_category == '?', [`category-${formatedMatch.winner1_category}`]: formatedMatch.winner1_category }">{{
                                    formatedMatch.winner1_category }}</span>
                            </span>
    
                        </div>
                    </div>
                </div>

                <div class="text" style="margin-top: 20px;" v-if="formatedMatch.winner2_name">
                    <Link prefetch="false" :href="`/${formatedMatch.winner2_uri}`">{{ formatedMatch.winner2_first_name
                    }}<br class="show-mobile" /> {{
                        formatedMatch.winner2_last_name
                    }}

                    </Link>
                         <div class="ranks">
                        <div class="category-wrapp">
                            <span class="diamond"
                                :style="{ border: `1px solid ${categoryColorsAll[formatedMatch.winner2_category] || 'transparent'}` }">
                            <span
                                class="category"
                                :class="{ 'category-unknown': formatedMatch.winner2_category == '?', [`category-${formatedMatch.winner2_category}`]: formatedMatch.winner2_category }">{{
                                    formatedMatch.winner2_category }}</span>
                            </span>
    
                        </div>
                    </div>
                </div>
            </div>

            <div class="sep">:</div>

            <div class="info-wrapp">
                <div class="text">
                    <Link prefetch="false" :href="`/${formatedMatch.loser1_uri}`">{{ formatedMatch.loser1_first_name
                    }}<br class="show-mobile" /> {{
                        formatedMatch.loser1_last_name
                    }}


                    </Link>
                    <div class="ranks">
                        <div class="category-wrapp">
                            <span class="diamond"
                                :style="{ border: `1px solid ${categoryColorsAll[formatedMatch.loser1_category] || 'transparent'}` }">
                            <span
                                class="category"
                                :class="{ 'category-unknown': formatedMatch.loser1_category == '?', [`category-${formatedMatch.loser1_category}`]: formatedMatch.loser1_category }">{{
                                    formatedMatch.loser1_category }}</span>
                            </span>
                            
    
                        </div>
                    </div>
                </div>

                <div class="text" v-if="formatedMatch.loser2_name" style="margin-top: 20px;">
                    <Link prefetch="false" :href="`/${formatedMatch.loser2_uri}`">{{ formatedMatch.loser2_first_name
                    }}<br class="show-mobile" /> {{
                        formatedMatch.loser2_last_name
                    }}</Link>

                    <div class="ranks">
                        <div class="category-wrapp">
                            <span class="diamond"
                                :style="{ border: `1px solid ${categoryColorsAll[formatedMatch.loser2_category] || 'transparent'}` }">
                            <span
                                class="category"
                                :class="{ 'category-unknown': formatedMatch.loser2_category == '?', [`category-${formatedMatch.loser2_category}`]: formatedMatch.loser2_category }">{{
                                    formatedMatch.loser2_category }}</span>
                            </span>
                            
    
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="location">
                <template v-if="formatedMatch.league?.uri !== ''">
                <a class="black" :href="`/${formatedMatch.league?.uri}`">{{
                    formatedMatch.league?.name
                    }}</a>
                    <span class="series" :style="{color: formatedMatch.league?.series?.color || '#8f8f8f'}">{{ formatedMatch.league?.series?.name || 'nezavistan' }}</span>
                </template>
                <template v-else>
                    <p>
                        sparing
                    </p>
                </template>
            <a class="court" :href="`/tereni/${formatedMatch.court?.uri}`">{{
                formatedMatch.court?.name
            }}</a>
            <p>
                {{ formatedMatch.county }}<span v-if="formatedMatch.court?.id > 1">
                    <br />
                    {{ formatedMatch.day }} {{ formatedMatch.date }} {{ formatedMatch.month }}
                    {{ formatedMatch.year }}
                    <br />
                    {{ formatedMatch.number }}
                </span>
            </p>
        </div>

    </div>

</template>

<style lang="scss" scoped>
@use '@abstracts/' as *;
$text-color-gray: #949494;


.match-entry {
    max-width: 1200px;
    margin: 0 auto;
    height: max-content;
    position: relative;


    .edit-btn {
        top: 40px;
        left: 0px;
        width: max-content;
        font-size: 15px;
        padding: 5px 15px;
        padding-top: 9px;
        right: unset;

        &.child {
            svg {
                height: 30px !important;
                width: 30px !important;
            }
        }
    }

    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 100px 0 100px 0;
    margin-bottom: 100px;


       .ranks{
            display: flex;
            gap: 30px;
            align-items: center;
            justify-content: center;

           .rank {
        width: 75px;
        height: 75px;
        position: relative;
        border-radius: 100px;
        border: 2px solid $rank-border-color;
        padding: 0;

        &.first {
            border-width: 6px;
            border-color: $gold;
        }

        &.second {
            border-width: 6px;
            border-color: $silver;
        }

        &.third {
            border-width: 6px;
            border-color: $bronze;
        }


        p {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 1;
            margin: 0;
            padding: 0;
            font-size: 30px;


            &.strict-2 {
                left: 51%;
            }

            &.strict-3 {
                top: 51%;
                left: 51%;
            }

            &.strict-4 {
                top: 51%;
            }

            &.strict-5 {
                top: 51%;
                left: 51%;
            }

            &.strict-6 {
                top: 51%;
            }

            &.strict-7 {
                top: 51%;
                left: 51%;
            }

            &.strict-8 {
                top: 51%;
                left: 51%;
            }

            &.strict-9 {
                top: 51%;
                left: 51%;
            }

            &.strict-10 {
                top: 51%;
                left: 49%;
            }

            &.align-left {
                &.n40 {
                    transform: translate(-51%, -48%);
                }
            }

            &.fix-hundreds{
                top: 51%;
            }
        }
    }
            
        }

    .category-wrapp {

        display: block;
        position: relative;


        .diamond {
            position: relative;
            width: 68.75px;
            height: 68.75px;
            border-width: 3px !important;
            display: grid;
            place-items: center;
                padding-top: 3px;

        }

        .category {
            font-weight: bold;
            font-weight: normal;
            font-size: 30px;

            &.unknown {
                color: #949494;
            }

            &.category-1 {
            }

            &.category-2 {
            }

            &.category-3 {
            }

            &.category-4 {
            }

            &.category-5 {
            }

            &.category-6 {
            }

            &.category-7 {
            }

            &.category-8 {
            }

            &.category-9 {}

            &.category-10 {
            }
        }
    }

    .location {
        padding-inline: 10px;
        max-width: 100%;
        margin-top: 0px;
        font-size: 20px;

        &.smaller-font {
            font-size: 15px;
        }

        color: $text-color-gray;

        p{
            display: block;
            width: max-content;
            margin: 0 auto;
            margin-bottom: 10px;
            line-height: 1.4;
        }
        a {
            text-decoration: none;
            color: $text-color-gray;
            display: block;
            width: max-content;
            max-width: 100%;
            margin: 0 auto;
            padding-inline: 20px;
            margin-bottom: 10px;
            line-height: 1.4;

            &:hover {
                color: $red;
            }

            &.court {
                color: black;
                text-decoration: none;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                text-transform: uppercase;

                &:hover {
                    color: $blue;
                }
            }

            &.black {
                color: $red;
                text-decoration: none;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                text-transform: uppercase;

                &:hover {
                    color: $blue;
                }
            }
        }
        .series{
            font-size: 18px;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin-top: -10px;
            margin-bottom: 10px;
            display: block;
        }
    }

    .score {
        font-size: 50px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 66px;

        .games {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 45px;
            color: $text-color-gray;
        }
    }

    .info {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 400px 100px 400px;
        place-items: center;
    }

    .info-wrapp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
        height: auto;
        width: max-content;
        align-items: center;


        a {
            text-decoration: none;
            color: black;
            font-size: 30px;

            &:hover {
                color: $red;
            }
        }

        .sup {
            color: $text-color-gray;
            font-size: 20px;
        }

        .text {
            font-size: 18px;
            line-height: 1.2;
            text-align: center;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 30px;

            .points {
                color: $mid-gray;
                font-size: 30px;
                font-weight: normal;
                text-align: center;
            }
        }
    }

    .sep {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
    }
}

@media only screen and (max-width: 1000px) {

#main{
    overflow-x: hidden;
}
    .match-entry {
        height: max-content;
        position: relative;

        .edit-btn {
            top: 40px;
            left: 0px;
            font-size: 15px;
            padding: 5px 15px;
            padding-top: 9px;
            right: unset;

            &.child {
                svg {
                    height: 30px !important;
                    width: 30px !important;
                }
            }
        }

        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 10px 0 12px 0;
        padding-top: 100px;
        border-bottom: 0;

          .info {
            display: grid;
            grid-auto-flow: column;
            grid-template-columns: 100px 100px 100px;
            place-items: center;
        }

        .info-wrapp {
        gap: 10px;


        a {
            text-decoration: none;
            color: black;
            font-size: 22px;
        }

        .sup {
            color: $text-color-gray;
            font-size: 18px;
        }

        .text {
            font-size: 18px;
            line-height: 1.2;
            text-align: center;
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 20px;

            .points {
                color: $mid-gray;
                font-size: 20px;
                font-weight: normal;
                text-align: center;
            }
        }
    }

    .ranks{
        gap: 15px;
    }
    
        .rank{
            height: 60px !important;
            width: 60px !important;

            &.first {
                border-width: 4px !important;
            }

            &.second {
                border-width: 4px !important;
            }

            &.third {
                border-width: 4px !important;
            }
            
            
            p{
                font-size: 20px !important;
            }


        }

        .category-wrapp {

            display: block;
            position: relative;
            margin: 0 auto;


            .diamond {
                position: relative;
                width: 52.5px;
                height: 52.5px;
                border-width: 3px !important;
                display: grid;
                place-items: center;
                padding-top: 3px;
            }

            .category {
                font-weight: bold;
                font-weight: normal;
                font-size: 19px;
                line-height: 1;
                &.unknown {
                    color: #949494;
                }

                &.category-1 {
                }

                &.category-2 {
                }

                &.category-3 {
                }

                &.category-4 {
                }

                &.category-5 {
                }

                &.category-6 {
                }

                &.category-7 {
                }

                &.category-8 {
                }

                &.category-9 {
                }

                &.category-10 {
                }
            }
        }

        .location {
            padding-inline: 10px;
            font-size: 20px;

            &.smaller-font {
                font-size: 15px;
            }

            color: $text-color-gray;
            line-height: 1.7;

            a {

                color: $text-color-gray;

               
            }
        }

        .score {
            font-size: 25px;
            line-height: 1.2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 66px;

            .games {
                font-size: 23px;
                color: $text-color-gray;
            }
        }


         
    }
}
</style>