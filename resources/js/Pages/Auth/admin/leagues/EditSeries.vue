<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {onMounted, reactive} from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import bus from 'vue3-eventbus';

const page = usePage();
const allSeries = ref([]);
const isLoading = ref(true);

onMounted(() => {
    page.props['title'] = `Upravljaj serijama`;
    loadAllSeries();
});

const loadAllSeries = () => {
    axios.get('/api/tournament-series').then((response) => {
        allSeries.value = response.data.map(series => ({
            ...series,
            color: series.color || '#ebebeb', // Default color
            isEditing: false,
            isSaving: false
        }));
        isLoading.value = false;
        bus.emit('loading', false);
    }).catch((error) => {
        console.error('Error fetching series:', error);
        isLoading.value = false;
        bus.emit('loading', false);
    });
};

const saveSeries = async (series, index) => {
    if (!series.name || series.name.trim() === '') {
        alert('Ime serije je obavezno');
        return;
    }
    
    allSeries.value[index].isSaving = true;
    
    try {
        const payload = {
            name: series.name.trim(),
            color: series.color
        };
        
        if (series.id) {
            // Update existing series
            await axios.put(`/api/tournament-series/${series.id}`, payload);
        } else {
            // Create new series
            const response = await axios.post('/api/tournament-series', payload);
            allSeries.value[index].id = response.data.id;
        }
        
        allSeries.value[index].isEditing = false;
        alert('Serija je uspešno sačuvana');
    } catch (error) {
        console.error('Error saving series:', error);
        alert('Greška pri čuvanju serije');
    } finally {
        allSeries.value[index].isSaving = false;
    }
};

const deleteSeries = async (series, index) => {
    if (!confirm('Da li ste sigurni da želite da obrišete ovu seriju?')) {
        return;
    }
    
    if (series.id) {
        try {
            await axios.delete(`/api/tournament-series/${series.id}`);
            allSeries.value.splice(index, 1);
            alert('Serija je obrisana');
        } catch (error) {
            console.error('Error deleting series:', error);
            alert('Greška pri brisanju serije');
        }
    } else {
        allSeries.value.splice(index, 1);
    }
};

const isSavingAll = ref(false);

const saveAll = async () => {
    const invalid = allSeries.value.find(s => !s.name || s.name.trim() === '');
    if (invalid) {
        alert('Sva imena serija su obavezna');
        return;
    }

    isSavingAll.value = true;

    try {
        const payload = {
            series: allSeries.value.map(s => ({
                id: s.id || null,
                name: s.name.trim(),
                color: s.color
            }))
        };

        const response = await axios.put('/api/tournament-series/bulk', payload);

        // Update IDs for newly created series
        response.data.forEach((saved, i) => {
            allSeries.value[i].id = saved.id;
        });

        alert('Sve serije su uspešno sačuvane');
    } catch (error) {
        console.error('Error saving all series:', error);
        alert('Greška pri čuvanju serija');
    } finally {
        isSavingAll.value = false;
    }
};

</script>
<template>
   <Head title="Upravljaj serijama -" />
    <div class="static-wrapper">
        <h1 id="title">Upravljaj serijama</h1>
        
        <div v-if="isLoading" class="loading">
            Učitavanje serija...
        </div>
        
        <div v-else>
            <div v-for="(series, index) in allSeries" :key="series.id || index">
                <div class="form-section">
                    <div class="form-row three">
                        <div class="form-group">
                            <label for="series-name" class="input-label">
                                Ime serije<span class="required">*</span>
                            </label>
                            <input 
                                v-model="series.name" 
                                type="text" 
                                placeholder="Ime serije..."
                                :disabled="series.isSaving"
                                id="series-name"
                            />
                        </div>
                        <div class="form-group">
                            <label for="series-color" class="input-label">
                                Boja
                            </label>
                            <div class="color-input-wrapper">
                                <input 
                                    v-model="series.color" 
                                    type="color" 
                                    :disabled="series.isSaving"
                                    class="color-input"
                                    id="series-color"
                                />
                                <input 
                                    v-model="series.color" 
                                    type="text" 
                                    placeholder="#ebebeb"
                                    :disabled="series.isSaving"
                                    class="hex-input"
                                />
                            </div>
                        </div>
                        <div class="form-group buttons">
                           <button 
                            @click="saveSeries(series, index)"
                            :disabled="series.isSaving"
                            class="btn-save"
                            id="submit"
                        >
                            <span>{{ series.isSaving ? 'Čuvanje...' : 'Sačuvaj' }}</span>
                        </button>
                        
                        <button 
                            @click="deleteSeries(series, index)"
                            :disabled="series.isSaving"
                            class="delete"
                        >
                            Obriši
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="save-all-wrapper">
                <button
                    @click="saveAll"
                    :disabled="isSavingAll"
                    class="btn-save-all"
                    id="submit"
                >
                    <span>{{ isSavingAll ? 'ČUVANJE...' : 'SAČUVAJ SVE' }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@abstracts/variables' as *;

.loading {
    text-align: center;
    padding: 40px;
    font-size: 16px;
}
.form-section {
    margin-bottom: 30px;
}
.form-group {
    width: 350px !important;
    flex: 0 0 350px !important;
}

.color-input-wrapper {
    display: flex;
    align-items: center;
}

.color-input {
    width: 57px !important;
    height: 57px !important;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
    margin-right: 10px;
    padding: 0 !important;
    border: 0 !important;
    background-color: transparent !important;
}

.hex-input {
    width: 283px !important;
}

.buttons {
    display: flex;
    flex-direction: row !important;
    gap: 20px;
    
    .btn-save, .delete {
        flex: 1;
        width: auto !important;
        margin: 0 !important;
        display: block !important;
        position: relative !important;
        top: unset !important;
        left: unset !important;
        right: unset !important;
        bottom: unset !important;
        transform: unset !important;
        padding-top: 5px;
        background-color: #e0e0e0;
        color: #333;
        span{
          font-family: 'Helvetica Neue' !important;
        }

        &:hover{
          color: white;
          background-color: $blue;
        }
    }

    .delete{
      background-color: #e0e0e0;
      color: #333;
        &:hover{
          background-color: $red;
          color: white;
        }
    }
}

.save-all-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    .btn-save-all {
        width: 350px !important;
        height: 50px;
        margin: 0 !important;
        display: block !important;
        position: relative !important;
        top: unset !important;
        left: unset !important;
        right: unset !important;
        bottom: unset !important;
        transform: unset !important;
        padding-top: 5px;
        background-color: #e0e0e0;
        color: #333;
        font-size: 18px;
        font-weight: inherit;
        border: none;
        cursor: pointer;
        span {
            font-family: 'Helvetica Neue' !important;
        }

        &:hover {
            background-color: $blue;
            color: white;
        }
    }
}

@media only screen and (max-width: 900px) {
    .form-section {
        margin-bottom: 40px;
    }
    .form-row{
        gap: 20px !important;
    }
    .form-group {
        width: 100% !important;
        flex: 0 0 100% !important;

    }

    .hex-input {
        width: 100% !important;
        flex: 1;
    }

    .buttons {
        .btn-save, .delete {
            width: 100% !important;
        }
    }

    .save-all-wrapper {
        justify-content: stretch;

        .btn-save-all {
            width: 100% !important;
        }
    }
}

h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    color: #1f2937;
    font-size: 18px;
}

h2:first-of-type {
    margin-top: 20px;
}
</style>
