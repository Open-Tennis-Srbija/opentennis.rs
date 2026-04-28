<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>
    <Head title="Dodaj turnir ili ligu -" />
    <div class="static-wrapper static">
        <h1 class="text-align-center">DODAJ TURNIR ILI LIGU</h1>
        <!-- <p>
            Open Tennis Srbija povećava broj mečeva, iznajmljivanje terena, i
            zapošljavanje trenera.
          </p>
          <p>
            Zato predlažemo da klubovi informišu svoje članove da mogu da koriste Ligu.
</p> -->
        <p>
            Organizatori teniskih takmičenja mogu da nam pošalju podatke o svojim takmičenjima kako bi ih dodali na <Link prefetch='false' :href="'/'">opentennis.rs</Link>. 
        </p>
        <p>
            Da dodate ligu ili turnir pošaljite ime takmičenja, početni datum, završni datum, opštinu, terene, i link ili email za kontakt na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
        </p>
        <p>
            Da dodate sve mečeve sa lige ili turnira popunite spreadsheet za <a href="/storage/Open Tennis Srbija prijava turnira i liga - šablon.xlsx" target="_blank">singlove</a> i/ili za <a href="/storage/Open Tennis Srbija prijava turnira i liga - dublovi - šablon.xlsx" target="_blank">dublove</a> i pošaljite ih na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
        </p>
        <p>
            Takođe možete da nam samo pošaljete i fotografije rezultata na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
        </p>
        <p>Hvala.</p>
    </div>
</template>
