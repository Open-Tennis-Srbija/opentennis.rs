<script setup>
import { ref } from 'vue';
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
import AbramoLogo from '../components/promo/AbramoLogo.vue';
import PlavinciLogo from '../components/promo/PlavinciLogo.vue';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});

const activePromo = ref(0);
</script>
<template>

    <Head title="Nagrade partnera 2025 -" />
    <div class="static-wrapper">
        <h1 class="mobile-neg-margin text-align-center">NAGRADE PARTNERA 2025</h1>

        <div class="promo-wrapper">
            <div class="promo" :class="{'active': activePromo === 1}">
                <a href="https://crazypizza.com/belgrade/" target="_blank">
                    <div class="img-wrapper crazy-pizza">
                        <img @mouseover="activePromo = 1" @mouseleave="activePromo = 0" src="/promo/img/crazy-pizza-logo.png" alt="Crazy pizza" class="promo-image">
                        
                    </div>
                </a>
                <p class="points">svi sa 1,000+</p>
                <p class="text">
                    <span class="reward">nagrada</span>
                    besplatna margarita pica
                    <br>
                    u <a href="https://crazypizza.com/belgrade/" target="_blank">Crazy Pizza Beograd</a>
                    <br>
                    <Link class="blue" prefetch="false" href="/crazy-pizza">pročitaj više</Link>
                </p>
            </div>
            <div class="promo" :class="{'active': activePromo === 2}">
                <a href="https://www.plavinci.rs/" target="_blank">
                    <div class="img-wrapper plavinci">
                        <PlavinciLogo />
                    </div>
                </a>
                <p class="points">prvi do 2,000</p>
                <a class="player" target="_blank" href="/srdjan-jovanovic">Srđan Jovanović</a>
                <p class="text">
                    <span class="reward">nagrada</span>
                    flaša organskog vina
                    <br>
                    <a href="https://www.plavinci.rs/" target="_blank">vinarije Plavinci</a>
                </p>
            </div>
            <div class="promo" :class="{'active': activePromo === 4}">
                <a href="https://crazypizza.com/belgrade/" target="_blank">
                    <div class="img-wrapper crazy-pizza">
                        <img @mouseover="activePromo = 4" @mouseleave="activePromo = 0" src="/promo/img/crazy-pizza-logo.png" alt="Crazy pizza" class="promo-image">
                    </div>
                </a>
                 <p class="points">prvi do 5,000</p>
                 <a class="player" target="_blank" href="/srdjan-jovanovic">Srđan Jovanović</a>
                <p class="text">
                    <span class="reward">nagrada</span>
                    5,000 RSD vaučer
                    <br>
                    u <a href="https://crazypizza.com/belgrade/" target="_blank">Crazy Pizza Beograd</a>

                </p>
               
            </div>
            <div class="promo" :class="{'active': activePromo === 3}">
                <a href="https://abramocaffe.rs/" target="_blank">
                    <div class="img-wrapper abramo">
                        <AbramoLogo />
                    </div>
                </a>
                <p class="points">prvi do 10,000</p>
                <a class="player" target="_blank" href="/srdjan-jovanovic">Srđan Jovanović</a>
                <p class="text">
                    <span class="reward">nagrada</span>
                    1 kg <a href="https://abramocaffe.rs/" target="_blank">Abramo kafe</a>
                    
                </p>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
@use '@abstracts/variables' as *;
h2{
    margin-top: 50px;
}
.promo-wrapper{
    display: flex;
    justify-content: center;
    padding-inline: 30px;
    padding-top: 30px;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
        gap: 50px;
    }

    .promo{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: -20px;

        &:first-of-type{
            margin-left: 0;
            margin-top: 150px;
            z-index: 4
        }
        &:nth-of-type(2){
            z-index: 3;
            margin-top: 100px;
        }
        &:nth-of-type(3){
            z-index: 2;
            margin-top: 50px;
        }
        &:last-of-type{
            z-index: 1
        }

        &.active{
            z-index: 5 !important;
          
        }

        @media screen and (max-width: 1200px) {
            margin-left: 0 !important;
            margin-top: 0 !important;
            
        }

        &:hover{
            z-index: 5 !important;

            .img-wrapper{
                transform: scale(1.05);
                transition: transform 0.3s ease;
            }
        }
     

        .img-wrapper{
            width: 300px;
            height: 300px !important;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;

            &:hover{
                transform: scale(1.05);
                transition: transform 0.3s ease;
                z-index: 5;

                @media screen and (max-width: 768px) {
                    transform: scale(1.05) translateZ(0);
                    -webkit-transform: scale(1.05) translateZ(0);
                }
            }

            &.crazy-pizza{
                background: $crazy-pizza-red;
            }
            &.plavinci{
                background: $plavinci-blue;
            }
            &.abramo{
                background: $abramo-black;
            }
            .promo-image{
                display: block;
                max-width: 180px;
            }
        }

        .points{
            font-family: 'Helvetica Neue';
            font-size: 20px;
            color: $red;
            margin-top: -5px;
            margin-bottom: -3px;
        }
        .player{
            font-family: 'Helvetica Neue';
            font-size: 20px;
            color: $blue;
            text-transform: uppercase;
            text-decoration: none;

            &:hover{
                color: $red;
            }
        }
        .text{
            text-align: center;
            font-family: 'HelveticaNeueRoman';
            line-height: 1.2;
            
            .reward{
                font-family: 'HelveticaNeueMedium';
                display: block;
                width: max-content;
                margin: 0 auto;
                margin-bottom: 7px;
                margin-top: 7px;
            }

            .blue{
                color: $blue;
                font-weight: bold;

                &:hover{
                    color: $red;
                }
            }
        }
    }
}
</style>