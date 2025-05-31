<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>
    <Head title="Pravila -" />
    <div class="static-wrapper">
        <h1>PRAVILA</h1>
        <p>SrpskaTenisLiga.rs je sajt posvećen rekreativnom tenisu u Srbiji. SrpskaTenisLiga.rs ne organizuje mečeve, turnine i  lige, nego samo dokumentuje rezultate sa spariga, turninra i liga.
</p>
        <p>Ciljevi sajta SrpskaTenisLiga.rs su:</p>
        <p style="margin-bottom: 0;">1) Dokumentacija i analiza svih podataka relevantnih za amaterski tenis u Srbiji,</p>
        <p>2) Motivacija amatera da igraju više i generalni razvoj amaterskog tenisa.</p>
        <p>SrpskaTenisLiga.rs je besplatan za korišćenje - nema nikakve naplate, rokove, niti obaveze. Na teniserima je da dodaju svoje mečeve i samim tim poboljšavaju svoj rang.  Svaki teniser može da bude dodat na sajt, dovoljno je da dokumentuje jedan meč sa svojim imenom. Nema kvalifikacija i sve je besplatno.</p>
        <p>Mečevi se dokumentuju tako što se dodaju preko <Link prefetch="false" :href="'/dodaj'">dodaj meč forme</Link>. Može da se doda bilo koji meč igran bilo gde 12 meseci pre dodavanja. Da bi meč bio prihvaćen on mora da ima barem jednog takmičara koji je građanin Republike Srbije ili da se odigra na teritoriji Republike Srbije. Znači meč između građanina Srbije i stranca u stranoj državi može da bude dodat na sajt. Takođe meč između dva stranca u Srbiji može da bude dodat.</p>
        <p>Za sada se rangiraju samo singles mečevi. Svi formati bodovanja singles mečeva su prihvaćeni dokle god je rezultat pobednika barem 4 gema. Znači minimalni rezultat da bi meč bio dokumentovan je 4:0. Primeri formata bodovanja su setovi do 4 gema, setovi do 6 gema, meč do 9 gemova, ili meč na vreme sa minimalnim rezultatom od 4:0. Tie break treba da se doda kao jedan gem. Na primer, ako se u meču od 5:5 igra tie break koji je 10:8, onda se upisuje rezultat 6:5.</p>
        <p>Rang tenisera favorizuje aktivnost tenisera i kalkuliše se dodavanjem poena za svaki pobedu, gubitak, i osvojeni gem. Dakle, izgubljeni meč takođe nosi poene, kao i gemovi koje je osvojio gubitnik. Ako ista dva tenisera igraju više puta u istih 30 dana onda dobijaju manje poena nego da su igrali sa različitim teniserima. Takođe dobijeni poeni opadaju za 10 % svakih 30 dana od dana meča. CIlj ovih pravila je da se motiviše što više igranja (čak i ako se gubi), da se nagrade gubitnici za osvojene gemove, a i da se motiviše različitost u izboru tenisera i konstantno igranje.</p>
        <p>Kategorija tenisera je za sada definisana ručno na osnovu subjektivne ocene. Najslabija kategorija je 1 koja definiše tenisere u prvoj godini časova i igranja. Ne znamo još koja je najviša kategorija. Kategorije su privremeno rešene i kasnije će biti zamenjene automatskom evaluacijom nivoa tenisera na osnovu rezultata. Ako se ne slažete sa svojom kategorijom pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
</p>
        <p>Ako teniser ne želi da bude vidljiv na sajtu njihovo ime može da se zameni inicijalima ili da se potpuno sakrije. Ako se oba učesnika u dodatom meču slažu, meč može da se obriše. Ako želite da je vaše ime sakriveno ili obrisano sa <Link prefetch="false" :href="'/'">SrpskaTenisLiga.rs</Link> pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.</p>
        <p><Link prefetch="false" :href="'/'">SrpskaTenisLiga.rs</Link> je osnovao  <a href="https://www.linkedin.com/in/nikolatosic/" target="_blank">Nikola Tošić</a> 9 decembra 2024.</p>
    </div>
</template>
