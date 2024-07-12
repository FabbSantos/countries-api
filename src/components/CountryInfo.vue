<script setup>
const props = defineProps({
        name: String,
        region: String,
        capital: String,
        population: Number,
        flag: String,
});
</script>

<template>
        <v-card>
                <v-img :src="flag" cover class="d-flex align-center justify-center" />
                <v-spacer></v-spacer>
                <v-card-title class="font-weight-bold">{{ name }}</v-card-title>

                <v-card-text>
                        <p>Population: <span class="font-weight-regular">{{ population }}</span></p>
                        <p>Region: <span class="font-weight-regular">{{ region }}</span></p>
                        <p>Capital: <span class="font-weight-regular">{{ capital}}</span></p>
                </v-card-text>

        </v-card>

</template>



<style scoped>
        .v-card {
                max-width: fit-content;
                animation: slideIn 0.5s ease-in-out;
                animation-timeline: viewport;
        }
        .v-card:hover {
                transition: all 0.2s ease-in-out;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
                transform: scale(1.02);
                cursor: pointer;
        }
        .v-card-title {
                font-size: 18px;
                font-weight: bold;
                max-width: 100%;
                white-space: wrap;
        }
        .v-card-text p {
                font-weight: 600;
                font-size: 14px;
                margin-top: .4rem;
        }
        .v-img, .v-img__img {
                width: 260px !important;
                aspect-ratio: 2/1;
                object-fit: cover;
        }
        
        @media (max-width: 768px) {
                .v-card {
                        max-width: 100%;
                }
                .v-img {
                        width: 300px !important;
                }
        }
        @keyframes slideIn {
                0% {
                        opacity: 0;
                        transform: translateY(40px);
                }
                100% {
                        opacity: 1;
                        transform: translateY(0);
                }
        }
</style>