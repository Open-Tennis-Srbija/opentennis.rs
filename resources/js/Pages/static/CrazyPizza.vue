<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>

    <Head title="Crazy Pizza -" />
    <div class="static-wrapper">
        <h1 class="mobile-neg-margin text-align-center">CRAZY PIZZA PROMOCIJA</h1>

<<<<<<< HEAD
        <img src="/promo/crazy-pizza/ots-crazy-pizza.png" alt="CRAZY PIZZA PROMOCIJA">
=======
        <img src="/promo/crazy-pizza/crazy-pizza-open-tennis-srbija.png" alt="CRAZY PIZZA PROMOCIJA">
>>>>>>> ade4fe2 (Rebranding)
        <p>
            <a target="_blank" href="https://crazypizza.com/belgrade/">Restoran Crazy Pizza Beograd</a> 
            će pokloniti besplatnu margarita picu svakom teniseru koji na Open Tennis Srbija pređe 1,000 poena.
        </p>
        <p>
            Da biste dobili besplatnu margarita picu u Crazy Pizza Beograd recite osoblju da imate preko 1,000 poena i pokažite im dokument koji dokazuje identitet.
        </p>

        <p>
            Moguće je dobiti samo jednu picu kada se pređe 1,000 poena.
        </p>

        <p>
            Crazy Pizza se nalazi u Galeriji, Beograd na <a target="_blank" href="https://maps.app.goo.gl/2YxtB46WfJKQyfsx8">ovoj lokaciji</a>.
        </p>
        
        <p>
            Predlažem da se najavite Crazy Pizza telefonom.
        </p>
        
        <p>
            Za sada promocija nema rok.
        </p>

        <p>
            Za pomoć zovite Nikolu na <a href="tel:063268906">063268906</a>.
        </p>

    </div>
</template>
<style lang="scss" scoped>

h1{
    @media screen and (min-width: 1200px){
        margin-bottom: 50px !important;
    }
}
h2{
    margin-top: 40px;
}
img{
    display: block;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 70px;
}
</style>