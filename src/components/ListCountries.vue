<script setup>
        import { ref, onMounted, computed } from 'vue';
        import { useRouter } from 'vue-router'; // Import for navigation


        const countries = ref([]);
        const searchQuery = ref('');
        const selectedRegion = ref(''); // Variável reativa para a região selecionada

        const router = useRouter(); // Get router instance

        async function fetchCountries() {
                try {
                        const response = await fetch('https://restcountries.com/v3.1/all');
                        if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();

                        const formattedCountries = data.map(country => ({
                                name: country.name.common,
                                population: country.population,
                                region: country.region,
                                area: country.area || 0,
                                capital: country.capital?.length > 0 ? country.capital[0] : '',
                                flag: country.flags.svg,
                        }));

                        countries.value = formattedCountries;
                } catch (error) {
                        console.error('Error fetching countries:', error);
                        // Handle the error appropriately, e.g., display an error message
                }
        }


        const filteredCountries = computed(() => {
                return countries.value
                        .filter(country => country.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
                        .filter(country => {
                                // Se nenhuma região estiver selecionada, mostra todos os países
                                if (!selectedRegion.value) return true;
                                // Se a região selecionada for 'All Regions', mostra todos os países
                                if (selectedRegion.value === 'All Regions') return true;
                                // Caso contrário, filtra por região
                                return country.region === selectedRegion.value;
                        });
        });


        onMounted(fetchCountries);

        const goToCountryDetails = (countryName) => {
                router.push({ name: 'countryDetails', params: { countryName: countryName } });
                }

</script>

<template>
        <p class="author">
                Developed By <a href=""> Fabrício Bahiense</a> 
        </p>
        <div class="allContainer">
                <div class="filters">
                        <v-text-field type="text" v-model="searchQuery" theme @input="searchCountries"
                                placeholder="Search for a country..." prepend-icon="mdi-magnify" clearable>
                        </v-text-field>
                        <v-select v-model="selectedRegion" theme @change="searchCountries"
                                :items="[ 'All Regions', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania' ]" label="Filter by Region" clearable>
                        </v-select>
                </div>

                <div class="countriesContainer">
                        <CountryInfo v-for="country in filteredCountries" :key="country.name" :name="country.name"
                                :population="country.population" :region="country.region" :capital="country.capital"
                                :flag="country.flag" @click="goToCountryDetails(country.name)" />
                </div>
        </div>
</template>

<style scoped>
        .allContainer {
                display: flex;
                flex-direction: column;
                gap: 3rem;
                justify-content: center;
                align-items: start;
                max-width: 1400px;
                margin:  0 auto;
        }
        .filters {
                display: flex;
                gap: 2rem;
                justify-content: space-between;
                width: 100%;
        }
        .countriesContainer {
                margin-top: 3rem;
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(4, minmax(100px, 1fr));
                gap: 4rem;
        }
        .v-text-field {
                width: 60% !important;
                margin-top: 2rem;
                box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
        }
        .v-input__details  {
                display: none !important; 
        }
        .v-text-field.v-theme--light {
                background-color: hsl(0, 0%, 52%) !important;
        }
        .v-text-field.v-theme--dark {
                background-color: red !important;
        }
         .v-input__prepend {
                margin-inline-start: 16px;
        } 
        .author {
                position: fixed;
                bottom: 3%;
                left: 1%;
                font-weight:300;
                letter-spacing: 1px;
                font-size: .3rem;
                z-index: 99999;
                font-style: italic;
                color: hsl(0, 0%, 52%);
                opacity: .5;
                transition: all .2s ease-in-out;
        }
        .author:hover {
                opacity: 1;
                text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        }
        .author a {
                color: inherit;
                text-decoration: wavy underline;
        }
        @media (max-width: 768px) {
                .allContainer {
                        align-items: center;
                }
                .author {
                        position: relative;
                        bottom: auto;
                        top: .01%;
                        text-align: center;
                }
                .countriesContainer {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                        padding-inline: 1rem;
                }
                .v-card {
                        margin: 0 auto;
                }
                .v-text-field, .v-field__field {
                        width: 90% !important;
                }
                .filters {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: center;
                }
        }
</style>
