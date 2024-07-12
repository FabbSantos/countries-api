<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme(); 
        theme.global.name.value = 'dark';

function toggleTheme() {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

<template>
        <v-app-bar app dense>
                <v-app-bar-title class="font-weight-bold">Where in the world?</v-app-bar-title>
                <v-spacer></v-spacer>

                <v-btn @click="toggleTheme">
                        <v-icon class="mx-2">{{ theme.global.name.value === 'light' ? 'mdi-weather-night' :
                                'mdi-weather-sunny'
                                }}</v-icon>
                        <span class="text-capitalize">{{ theme.global.name.value === 'light' ? 'Dark Mode' : 'light mode'}}</span>
                </v-btn>
        </v-app-bar>
</template>

<style scoped>
        @media (max-width: 768px) {
                .v-spacer {
                        display: none !important;
                }
        }
</style>