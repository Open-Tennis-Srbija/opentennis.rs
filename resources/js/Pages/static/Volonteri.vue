<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>
    <Head title="Volontiraj -" />
    <div class="static-wrapper">
        <h1 class="text-align-center">VOLONTIRAJ</h1>
        <!-- <p>
            Open Tennis Srbija povećava broj mečeva, iznajmljivanje terena, i
            zapošljavanje trenera.
          </p>
          <p>
            Zato predlažemo da klubovi informišu svoje članove da mogu da koriste Ligu.
</p> -->
        <p>
            Open Tennis Srbija želi da skupi sve podatke o srpskom tenisu na jednom mestu. Zasniva se na volonterskom radu pojedinaca koji pronalaze, organizuju i dodaju teniske podatke na sajt. Taj posao zahteva znanje, vreme i fokus.
        </p>
        <p>
           Svako može da bude OTS volonter. Godište i lokacija nisu važni. Idealno je za srednjoškolce i studente.
        </p>
        <p>
           Nemamo radno vreme niti rad na lokaciji. Volonteri mogu da rade kada žele i odakle žele preko svog mobilnog ili kompjutera. Obaveze su nalaženje, organizovanje i objavljivanje teniskih podataka srpskih tenisera i teniskih događaja u Srbiji na opentennis.rs. Takođe, volonteri mogu da budu odgovorni za njihove klubove, turnire, lige, igrače i lokacije.
        </p>
        <p>
            Kao OTS volonter razvićete menadžment i digitalne veštine, a i ostvarićete nove kontakte u tenisu i šire.
        </p>
        <p>
            Učestvujte u razvoju Open Tennis Srbija volontiranjem.
        </p>

        <p>Da postanete volonter pošaljite par reči o sebi na <a href="mailto:volonteri@opentennis.rs">volonteri@opentennis.rs</a>. 
</p>
    </div>
</template>
