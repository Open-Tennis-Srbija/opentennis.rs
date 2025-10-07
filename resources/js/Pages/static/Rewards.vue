<script setup>
import { ref } from 'vue';
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
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
                        <img @mouseover="activePromo = 1" @mouseleave="activePromo = 0" src="/promo/img/crazy-pizza-promo-logo.png" alt="Crazy pizza" class="promo-image">
                    </div>
                </a>
                <p class="points">1,000</p>
                <p class="text">
                    <b>Svi sa 1,000 poena i više</b>
                    <br>
                    imaju besplatnu
                    <br>
                    margarita pizzu
                    <br>
                    u <a href="https://crazypizza.com/belgrade/" target="_blank">Crazy Pizza Beograd</a>
                    <br>
                    <Link class="blue" prefetch="false" href="/crazy-pizza">procitaj više</Link>
                </p>
            </div>
            <div class="promo" :class="{'active': activePromo === 2}">
                <a href="https://www.plavinci.rs/" target="_blank">
                    <div class="img-wrapper plavinci">
                        <img @mouseover="activePromo = 2" @mouseleave="activePromo = 0" src="/promo/img/plavinci-promo-logo.png" alt="Vinarija Plavinci" class="promo-image">
                    </div>
                </a>
                <p class="points">2,000</p>
                <p class="text">
                    <b>Prvi do 2,000 poena</b>
                    <br>
                    je dobio flašu
                    <br>
                    organskog vina
                    <br>
                    <a href="https://www.plavinci.rs/" target="_blank">vinarije Plavinci</a>
                </p>
            </div>
            <div class="promo" :class="{'active': activePromo === 4}">
                <a href="https://crazypizza.com/belgrade/" target="_blank">
                    <div class="img-wrapper crazy-pizza">
                        <img @mouseover="activePromo = 4" @mouseleave="activePromo = 0" src="/promo/img/crazy-pizza-promo-logo.png" alt="Crazy pizza" class="promo-image">
                    </div>
                </a>
                 <p class="points">5,000</p>
                <p class="text">
                    <b>Prvi do 5,000 poena</b>
                    <br>
                    je dobio 5,000 RSD
                    <br>
                    u <a href="https://crazypizza.com/belgrade/" target="_blank">Crazy Pizza Beograd</a>

                </p>
               
            </div>
            <div class="promo" :class="{'active': activePromo === 3}">
                <a href="http://abramocaffe.rs/" target="_blank">
                    <div class="img-wrapper abramo">
                        <img @mouseover="activePromo = 3" @mouseleave="activePromo = 0" src="/promo/img/abramo-promo-logo.png" alt="Abramo caffee" class="promo-image">
                    </div>
                </a>
                <p class="points">10,000 </p>
                <p class="text">
                    <b>Prvi do 10,000 poena</b>
                    <br>
                    je dobio
                    <br>
                    1 kg <a href="http://abramocaffe.rs/" target="_blank">Abramo kafe</a>
                    
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
            z-index: 4
        }
        &:nth-of-type(2){
            z-index: 3
        }
        &:nth-of-type(3){
            z-index: 2
        }
        &:last-of-type{
            z-index: 1
        }

        &.active{
            z-index: 5 !important;
          
        }

        @media screen and (max-width: 1200px) {
            margin-left: 0 !important;
            
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
                max-width: 100%;
            }
        }

        .points{
            font-family: 'Helvetica Neue';
            font-size: 26px;
            color: $red;
            margin-bottom: 10px;
        }

        .text{
            text-align: center;
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