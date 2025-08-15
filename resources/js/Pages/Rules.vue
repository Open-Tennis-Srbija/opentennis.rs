<script setup>
import { nextTick, onMounted } from 'vue';
import bus from 'vue3-eventbus';
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});
</script>
<template>

    <Head title="Uputstva -" />
    <div class="static-wrapper">
        <h1 class="show-mobile text-align-center">UPUTSTVA</h1>
        <p>
            <Link prefetch="false" :href="'/'">SrpskaTenisLiga.rs</Link> je osnovao <a
                href="https://www.linkedin.com/in/nikolatosic/" target="_blank">Nikola Tošić</a> 9 decembra 2024.
        </p>
        <p>SrpskaTenisLiga.rs je sajt posvećen rekreativnom tenisu u Srbiji. SrpskaTenisLiga.rs samo dokumentuje
            rezultate spariga, turnira i liga koje organizuju teniseri, klubovi i drugi. Dakle, SrpskaTenisLiga.rs je
            agregator svih sparinga, liga i turnira u Srbiji.
        </p>
        <p>Ciljevi sajta SrpskaTenisLiga.rs su:</p>
        <p style="margin-bottom: 0;">1) Dokumentacija i analiza svih podataka korisnih za rekreativni tenis u Srbiji,
        </p>
        <p>2) Motivacija tenisera da igraju više i generalni razvoj rekreativnog tenisa.</p>

        <p>SrpskaTenisLiga.rs postiže ove ciljeve kroz sledeće aktivnosti:</p>
        <p style="margin-bottom: 0;">1) Kategorisanje svih tenisera u Srbiji, od početnika do Novaka Đokovica.
            Kategorisanje pomaže teniserima da nađu druge tenisere, učestvuju u takmičenjima, i prate svoj napredak,</p>
        <p style="margin-bottom: 0;">2) Merenje aktivnosti tenisera kroz poene,</p>
        <p>3) Dokumentovanje svih liga, turnira, i terena.</p>

        <p>SrpskaTenisLiga.rs je besplatna za korišćenje - nema kvalifikacija, naplate, rokove, niti obaveze. Na
            teniserima je da dodaju svoje mečeve i na organizatorima takmičenja da dodaju mečeve sa takmičenja. Svaki
            teniser može biti dodat na sajt, dovoljno je da dokumentuje jedan meč koji je odigrao.</p>


        <h2>Privatnost tenisera</h2>
        <br>
        <p>Mečevi na SrpskaTenisLiga.rs su dodati na sledeće načine:</p>
        <p style="margin-bottom: 0;">1) Teniseri ih sami dodaju kroz <a href="/dodaj">dodaj meč formu</a>,</p>
        <p style="margin-bottom: 0;">2) Naš tim dodaje javno objavljene rezultate liga i turnira,</p>
        <p>3) Naš tim, u saradnji sa organizatorima, dodaje rezultate liga i turnira koji nisu javno objavljeni.</p>
        <p>Ako teniser ne želi da bude vidljiv na sajtu njihovo ime može da se zameni inicijalima ili da se potpuno sakrije. Ako oba tenisera u dodatom meču ne žele da budu vidljivi, njihov meč može da se obriše. Za obe akcije pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
        </p>
       

        <h2>Dodavanje mečeva</h2>
        <br>
        <p>
            Mečevi se dokumentuju tako što se dodaju preko <a href="/dodaj">dodaj meč forme</a>. Može da se doda bilo koji meč igran bilo gde 12 meseci pre dodavanja. Da bi meč bio prihvaćen on mora da ima barem jednog takmičara koji je građanin Republike Srbije ili da se odigra na teritoriji Republike Srbije. Znači meč između građanina Srbije i stranca u stranoj državi može da bude dodat na sajt. Takođe meč između dva stranca u Srbiji može da bude dodat.
        </p>
        <p>
            Svi formati bodovanja mečeva su prihvaćeni dokle god je rezultat pobednika barem 4 gema. Znači minimalni rezultat da bi meč bio dokumentovan je 4:0. Primeri formata bodovanja su setovi do 4 gema, setovi do 6 gema, meč do 9 gemova, ili meč na vreme sa minimalnim rezultatom od 4:0. Tie break treba da se doda kao jedan gem. Na primer, ako se u meču od 5:5 igra tie break koji je 10:8, onda se upisuje rezultat 6:5.
        </p>


        <h2>Poeni za aktivnost</h2>
        <br>
        <p>Rang tenisera favorizuje aktivnost tenisera i kalkuliše se dodavanjem poena za svaki pobedu, gubitak, i osvojeni gem.</p>
        <table class="rules-table">
          
            <tbody>
                <tr>
                    <td class="under-header" colspan="2">za pobednika</td>
                </tr>
                <tr>
                    <td>za meč u kome je teniser pobedio</td> <td class="points">+100</td>
                </tr>
                <tr>
                    <td>za svaki dobijeni gem u meču koji je teniser pobedio</td> <td>+10</td>
                </tr>
                <tr>
                    <td>drugi dobijeni meč sa istim gubitnikom u roku od 30 dana</td> <td>+75</td>
                </tr>
                <tr>
                    <td>svaki sledeći dobijeni meč sa istim gubitnikom u roku od 30 dana</td> <td>+50</td>
                </tr>
                <tr>
                    <td class="under-header" colspan="2">za gubitnika</td>
                </tr>
                <tr>
                    <td>za meč u kome je teniser izgubio</td> <td>+25</td>
                </tr>
                <tr>
                    <td>za svaki dobijeni gem u meču koji je teniser izgubio</td> <td>+7</td>
                </tr>
                <tr>
                    <td>drugi izgubljeni meč sa istim pobednikom u roku od 30 dana</td> <td>+20</td>
                </tr>
                <tr>
                    <td>svaki sledeći izgubljeni meč sa istim pobednikom u roku od 30 dana</td> <td>+15</td>
                </tr>
                <tr>
                    <td class="under-header" colspan="2">vremenski faktor</td>
                </tr>
                <tr>
                    <td>svakih 30 dana svi poeni se smanjuju za</td> <td>-5%</td>
                </tr>
            </tbody>
        </table>
        <p>
            Cilj poena aktivnosti je da se motiviše što više igranja (čak i ako se gubi) i da se motiviše različitost u izboru tenisera.
        </p>

        <h2>Kategorije tenisera</h2>
        <br>
        <p>Kategorija tenisera je za sada definisana ručno na osnovu subjektivne ocene. Kategorije su:</p>
        <p style="margin-bottom: 0;">
            Kategorija 1) Odigrao prvi meč - dobrodošao je u svet tenisa.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 2) Teniser je igrao više mečeva ali ima nestabilne osnovne udarce.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 3) Dobra kontrolu jednog ili dva udarca, bez snage i preciznosti.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 4) Dobra kontrola osnovnih udaraca, snaga u nekim.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 5) Stabilnost, snaga i preciznost u svim osnovnim udarcima.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 6) Stabilni, snažni, i precizni osnovni udarci sa dobrom strategijom.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 7) Bivši takmičari i treneri.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 8) Juniorski i mlađi takmičari.
        </p>
        <p style="margin-bottom: 0;">
            Kategorija 9) Seniorski, ATP, ITF takmičari.
        </p>
        <p>
            Kategorija 10) Novak Djoković.
        </p>
        <p>
            Ručno određivanje kategorija je privremeno rešenje i biće zamenjeno automatskim kategorisanjem tenisera na osnovu rezultata mečeva.
        </p>
        <p> Ako se ne slažete sa svojom kategorijom pošaljite email na <a
                href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>.
        </p>

        <h2>Pristup podatcima</h2>
        <br>
        <p>
            Ako želite podatke svih mečeva u formatu tabela, za vaše sopstveno istraživanje, pošaljite email na <a href="mailto:nikola@srpskatenisliga.rs">nikola@srpskatenisliga.rs</a>. Uvek smo zainteresovani da vidimo nove načine prikazivanja podataka.

        </p>

    </div>
</template>
<style lang="scss" scoped>

h2{
    margin-top: 50px;
}

</style>