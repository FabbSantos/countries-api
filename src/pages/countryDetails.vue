<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const flags = ref([]);
const countryDetails = ref({});


async function fetchCountryDetails(countryName) {
        try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
                const data = await response.json();
                const country = data[0];
                const borderCountries = country.borders || null;
                const borderCountiesWithFlags = ref([]);
                
                if (borderCountries) {
                        borderCountries.map(async (borderCountry) => {
                                const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`);
                                const data = await response.json();
                                const country = data[0];
                                borderCountiesWithFlags.value.push({
                                        country: country.name.common,
                                        flag: country.flags.svg,
                                        flagAlt: country.flags.alt,
                                        code: country.cca3
                                });
                        });
                }
                        
                countryDetails.value = {
                        name: country.name.common,
                        nativeName: Object.values(country.name.nativeName)[0].official,
                        population: country.population,
                        region: country.region,
                        subRegion: country.subregion,
                        capital: country.capital ? country.capital[0] : 'N/A',
                        topLevelDomain: country.tld ? country.tld[0] : 'N/A',
                        currencies: Object.values(country.currencies).map(c => c.name).join(', '),
                        languages: Object.values(country.languages).join(', '),
                        flag: country.flags.svg, // Adicionando a URL da bandeira em SVG
                        flagAlt: country.flags.alt, // Adicionando a descrição da bandeira
                        borderCountries: borderCountiesWithFlags.value
                };
                console.log(countryDetails.value);
        } catch (error) {
                console.error('Error fetching country details:', error);
        }
}
async function searchAndGoToCountryByCode(code) {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await response.json();
        const country = data[0];
        countryDetails.value = {
                name: country.name.common
        };
        router.push({ name: 'countryDetails', params: { countryName: country.name.common } });
}
function goToListCountries() {
        router.push({ name: 'index' });
}


onMounted(() => {
        fetchCountryDetails(route.params.countryName);
});

watch(() => route.params.countryName, (newCountryName, oldCountryName) => {
        // Verifica se o país realmente mudou para evitar chamadas desnecessárias
        if (newCountryName !== oldCountryName) {
                fetchCountryDetails(newCountryName);
        }
});

</script>
<template>
        <Navbar />

        <v-btn class="goBack" @click="goToListCountries" 
                prepend-icon="mdi-arrow-left"
        >Back</v-btn>
        <div class="countryDetails">
                <v-img :src="countryDetails.flag" :alt="countryDetails.flagAlt" />

                <div class="textContainer">
                        <div class="textTitle text-left">
                                {{ countryDetails.name }}
                        </div>

                        <div class="detailsContainer">

                                <div class="textDetails">
                                        <p>Native Name: <span class="font-weight-light">{{ countryDetails.nativeName
                                                        }}</span>
                                        </p>
                                        <p>Population: <span class="font-weight-light">{{ countryDetails.population
                                                        }}</span>
                                        </p>
                                        <p>Region: <span class="font-weight-light">{{ countryDetails.region }}</span>
                                        </p>
                                        <p>Sub Region: <span class="font-weight-light">{{ countryDetails.subRegion
                                                        }}</span>
                                        </p>
                                        <p>Capital: <span class="font-weight-light">{{ countryDetails.capital
                                                        }}</span></p>
                                </div>

                                <div class="textDetails">
                                        <p>Top Level Domain: <span class="font-weight-light">{{
                                                        countryDetails.topLevelDomain
                                                        }}</span>
                                        </p>
                                        <p>Currencies: <span class="font-weight-light">{{ countryDetails.currencies
                                                        }}</span></p>
                                        <p>Languages: <span class="font-weight-light">{{ countryDetails.languages
                                                        }}</span></p>
                                </div>

                        </div>

                        <p class="borderCountries">Border Countries: {{ countryDetails.borderCountries &&
                                countryDetails.borderCountries.length > 0 ? '' : 'N/A' }}</p>
                        <div class="actionsContainer">
                                <v-btn text v-for="borderCountry in countryDetails.borderCountries" :key="borderCountry"
                                        @click="searchAndGoToCountryByCode(borderCountry.code)">
                                        <img :src=borderCountry.flag :alt=borderCountry.flagAlt>
                                        {{ borderCountry.country }}
                                </v-btn>
                        </div>
                </div>
        </div>
</template>

<style scoped>
        .countryDetails {
                display: flex;
                flex-direction: row;
                height: auto;
                align-items: start;
                justify-content: space-evenly;
                margin: 0 auto;
                margin-top: 10%;
                max-width: 80%;
        }
        .v-btn.goBack {
                margin-top: 2rem;
                margin-left: 2rem;
        }
        .v-img {
                max-width: 40%;
                /* aspect-ratio: 1/1; */
                margin-right: 2rem;
        }
        .textDetails{
                max-width: fit-content;
        }
        .textTitle {
                font-size: 24px;
                padding-left: 0;
                font-weight: 700;
        }
        .textDetails p, .borderCountries p{
                display: flex;
                max-width: 40ch;
                gap: 1ch;
                font-weight: 600;
                font-size: 16px;
                margin-top: .8rem;
        }
        .textContainer {
                display: flex;
                max-width: 50%;
                flex-direction: column;
                gap: 1rem;
        }
        .detailsContainer {
                display: flex;
                flex-direction: row;
                gap: 4rem;
        }
        .actionsContainer {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                flex-wrap: wrap;
                max-width: 100%;
        }
        .v-btn img {
                width: 20px;
                aspect-ratio: 2/1;
                margin-right: 1rem;
                border: none;
        }
        @media (max-width: 768px) {
                .countryDetails {
                        flex-direction: column;
                        align-items: center;
                        gap: 2rem;
                        max-width: 100%;
                }
                .v-img {
                        max-width: 100%;
                        height: 300px;
                        width: 300px;
                        margin: 0 auto;
                }
                .textContainer {
                        max-width: 80%;
                }
                .detailsContainer {
                        flex-direction: column;
                        gap: 1rem;
                }
                .actionsContainer {
                        gap: 1rem;
                }
        }
</style>