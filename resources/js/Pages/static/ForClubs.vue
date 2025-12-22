<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>
<<<<<<< HEAD
    <Head title="Dodaj turnir ili ligu -" />
    <div class="static-wrapper static">
        <h1 class="text-align-center">DODAJ TURNIR ILI LIGU</h1>
=======
    <Head title="Dodaj ligu ili turnir -" />
    <div class="static-wrapper">
        <h1 class="text-align-center">DODAJ LIGU ILI TURNIR NA opentennis.rs</h1>
>>>>>>> ade4fe2 (Rebranding)
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
<<<<<<< HEAD
            Da dodate sve mečeve sa lige ili turnira popunite spreadsheet za <a href="/storage/Open Tennis Srbija prijava turnira i liga - šablon.xlsx" target="_blank">singlove</a> i/ili za <a href="/storage/Open Tennis Srbija prijava turnira i liga - dublovi - šablon.xlsx" target="_blank">dublove</a> i pošaljite ih na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
=======
            Da dodate sve mečeve sa lige ili turnira popunite spreadsheet za <a href="/storage/opentennis.rs prijava turnira i liga - šablon.xlsx" target="_blank">singlove</a> i/ili za <a href="/storage/opentennis.rs prijava turnira i liga - dublovi - šablon.xlsx" target="_blank">dublove</a> i pošaljite ih na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
>>>>>>> ade4fe2 (Rebranding)
        </p>
        <p>
            Takođe možete da nam samo pošaljete i fotografije rezultata na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
        </p>
        <p>Hvala.</p>
    </div>
</template>
