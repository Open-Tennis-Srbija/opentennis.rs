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
    <Head title="O nama -" />
    <div class="static-wrapper static">
        <h1 class="mobile-neg-margin text-align-center">O NAMA</h1>
=======
    <Head title="Uputstva -" />
    <div class="static-wrapper">
        <h1 class="mobile-neg-margin text-align-center">UPUTSTVA I PRAVILA OPEN TENNIS SRBIJA</h1>
>>>>>>> ade4fe2 (Rebranding)



        <p class="bigger-center">
            Misija Open Tennis Srbija je
            <br>
            transparentan i dugoročan razvoj srpskog tenisa
            <br>
            kroz skupljanje, analiza i publikovanje svih podataka srpskog tenisa
        </p>
        <p class="bigger-center last">
            Svi teniseri, lige i turniri, tereni, i mečevi na jednom mestu
        </p>
        <p>
            <Link prefetch="false" :href="'/'">Open Tennis Srbija</Link> je osnovao <a
                href="https://www.linkedin.com/in/nikolatosic/" target="_blank">Nikola Tošić</a> 9 decembra 2024.
        </p>
        <p>Open Tennis Srbija je sajt posvećen rekreativnom tenisu u Srbiji. Open Tennis Srbija samo dokumentuje
            rezultate spariga, turnira i liga koje organizuju teniseri, klubovi i drugi. Dakle, Open Tennis Srbija je
            agregator svih sparinga, liga i turnira u Srbiji.
        </p>
        <p>Ciljevi sajta Open Tennis Srbija su:</p>
        <p style="margin-bottom: 0;">1) Dokumentacija i analiza svih podataka korisnih za rekreativni tenis u Srbiji,
        </p>
        <p>2) Motivacija tenisera da igraju više i generalni razvoj rekreativnog tenisa.</p>

        <p>Open Tennis Srbija postiže ove ciljeve kroz sledeće aktivnosti:</p>
        <p style="margin-bottom: 0;">1) Kategorisanje svih tenisera u Srbiji, od početnika do Novaka Đokovica.
            Kategorisanje pomaže teniserima da nađu druge tenisere, učestvuju u takmičenjima, i prate svoj napredak,</p>
        <p style="margin-bottom: 0;">2) Merenje aktivnosti tenisera kroz poene,</p>
        <p>3) Dokumentovanje svih liga, turnira, i terena.</p>

        <p>Open Tennis Srbija je besplatna za korišćenje - nema kvalifikacija, naplate, rokove, niti obaveze. Na
<<<<<<< HEAD
            teniserima je da <Link prefetch="false" :href="'/dodaj'">dodaju svoje mečeve</Link> i na organizatorima takmičenja da<Link prefetch="false" :href="'/dodaj-ligu'"> dodaju mečeve sa takmičenja</Link>. Svaki
=======
            teniserima je da dodaju svoje mečeve i na organizatorima takmičenja da dodaju mečeve sa takmičenja. Svaki
>>>>>>> ade4fe2 (Rebranding)
            teniser može biti dodat na sajt, dovoljno je da dokumentuje jedan meč koji je odigrao.</p>


        <h2>Privatnost tenisera</h2>
        <br>
<<<<<<< HEAD
        <p>Mečevi na <Link prefetch="false" :href="'/'">Open Tennis Srbija</Link> su dodati na sledeće načine:</p>
=======
        <p>Mečevi na Open Tennis Srbija su dodati na sledeće načine:</p>
>>>>>>> ade4fe2 (Rebranding)
        <p style="margin-bottom: 0;">1) Teniseri ih sami dodaju kroz <a href="/dodaj">dodaj meč formu</a>,</p>
        <p style="margin-bottom: 0;">2) Naš tim dodaje javno objavljene rezultate liga i turnira,</p>
        <p>3) Naš tim, u saradnji sa organizatorima, dodaje rezultate liga i turnira koji nisu javno objavljeni.</p>
        <p>Ako teniser ne želi da bude vidljiv na sajtu njihovo ime može da se zameni inicijalima ili da se potpuno sakrije. Ako oba tenisera u dodatom meču ne žele da budu vidljivi, njihov meč može da se obriše. Za obe akcije pošaljite email na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
        </p>
       

        <h2>Dodavanje mečeva</h2>
        <br>
        <p>
            Mečevi se dokumentuju tako što se dodaju preko <a href="/dodaj">dodaj meč forme</a>. Može da se doda bilo koji meč igran bilo gde 12 meseci pre dodavanja. Da bi meč bio prihvaćen on mora da ima barem jednog takmičara koji je građanin Republike Srbije ili da se odigra na teritoriji Republike Srbije. Znači meč između građanina Srbije i stranca u stranoj državi može da bude dodat na sajt. Takođe meč između dva stranca u Srbiji može da bude dodat.
        </p>
        <p>
            Svi formati bodovanja mečeva su prihvaćeni dokle god je rezultat pobednika barem 4 gema. Znači minimalni rezultat da bi meč bio dokumentovan je 4:0. Primeri formata bodovanja su setovi do 4 gema, setovi do 6 gema, meč do 9 gemova, ili meč na vreme sa minimalnim rezultatom od 4:0. Tie break treba da se doda kao jedan gem. Na primer, ako se u meču od 5:5 igra tie break koji je 10:8, onda se upisuje rezultat 6:5.
        </p>


         <h2>Kategorije tenisera</h2>
        <br>
        <p>Kategorija tenisera je za sada definisana ručno na osnovu subjektivne ocene. Kategorije su:</p>
        <p style="margin-bottom: 0;">
            Kategorija 1) Odigrao prvi meč - dobrodošao je u svet tenisa,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 2) Teniser je igrao više mečeva ali ima nestabilne osnovne udarce,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 3) Dobra kontrolu jednog ili dva udarca, bez snage i preciznosti,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 4) Dobra kontrola osnovnih udaraca, snaga u nekim,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 5) Stabilnost, snaga i preciznost u svim osnovnim udarcima,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 6) Stabilni, snažni, i precizni osnovni udarci sa dobrom strategijom,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 7) Bivši takmičari i treneri,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 8) Juniorski i mlađi takmičari,
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 9) Seniorski takmičari koji nisu na ATP listi,
        </p>
        <p>
            Kategorija 10) Novak Đoković i drugi ATP takmičari.
        </p>
        <p>
            Ručno određivanje kategorija je privremeno rešenje i biće zamenjeno automatskim kategorisanjem tenisera na osnovu rezultata mečeva.
        </p>
        <p> Ako se ne slažete sa svojom kategorijom pošaljite email na <a
                href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>.
        </p>


        <h2>Pristup podatcima</h2>
        <br>
        <p>
            Ako želite podatke svih mečeva u formatu tabela, za vaše sopstveno istraživanje, pošaljite email na <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>. Uvek smo zainteresovani da vidimo nove načine prikazivanja podataka.

        </p>

    </div>
</template>
<style lang="scss" scoped>

h2{
    margin-top: 50px;
}

</style>