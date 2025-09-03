<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>
    <Head title="Dodaj ligu ili turnir -" />
    <div class="static-wrapper">
        <h1 class="text-align-center">DODAJ LIGU ILI TURNIR NA SRPSKATENISLIGA.RS</h1>
        <!-- <p>
            Srpska Tenis Liga povećava broj mečeva, iznajmljivanje terena, i
            zapošljavanje trenera.
          </p>
          <p>
            Zato predlažemo da klubovi informišu svoje članove da mogu da koriste Ligu.
</p> -->
        <p>
            Organizatori teniskih takmičenja mogu da nam pošalju podatke o svojim takmičenjima kako bi ih dodali na <Link prefetch='false' :href="'/'">SrpskaTenisLiga.rs</Link>. 
        </p>
        <p>
            Da dodate ligu ili turnir pošaljite ime takmičenja, početni datum, završni datum, opštinu, terene, i link ili email za kontakt na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
        </p>
        <p>
            Da dodate sve mečeve sa lige ili turnira popunite spreadsheet za <a href="/storage/SrpskaTenisLiga.rs prijava turnira i liga - šablon.xlsx" target="_blank">singlove</a> i/ili za <a href="/storage/SrpskaTenisLiga.rs prijava turnira i liga - dublovi - šablon.xlsx" target="_blank">dublove</a> i pošaljite ih na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
        </p>
        <p>
            Takođe možete da nam samo pošaljete i fotografije rezultata na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
        </p>
        <p>Hvala.</p>
    </div>
</template>
