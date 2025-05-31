<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>
    <Head title="Za klubove -" />
    <div class="static-wrapper">
        <h1>DODAJ LIGU ILI TURNIR</h1>
        <!-- <p>
            Srpska Tenis Liga povećava broj mečeva, iznajmljivanje terena, i
            zapošljavanje trenera.
          </p>
          <p>
            Zato predlažemo da klubovi informišu svoje članove da mogu da koriste Ligu.
</p> -->
        <p>
            <Link prefetch='false' :href="'/'">SrpskaTenisLiga.rs</Link> vlasnicima terena i klubova povećava broj mećeva, iznajmljivanje terena, i zapošljavanje trenera.
        </p>
        <p>
            Predlažemo da klubovi informišu svoje članove da mogu da koriste <Link prefetch='false' :href="'/'">SrpskaTenisLiga.rs</Link>.
        </p>
        <p>
                Takođe tereni i klubovi mogu da nam pošalju rezultate sa svojih turnira i liga koje možemo grupno da dodamo u bazu i samim tim dodamo sve tenisere na rang listu.
            </p>
        <p>
            Da bi dodali rezutate sa lige ili turnira pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
        </p>
        <p>Hvala.</p>
    </div>
</template>
