/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
import { createApp } from 'vue'



// const myCustomLightTheme = {
//   dark: false,
//   colors: {
//     backgroundApp: 'hsl(0, 0%, 98%)',
//     primaryText: 'hsl(200, 15%, 8%)', //light-mode-text
//     'elements': 'hsl(0, 0%, 100%)', //dark-mode-elements
//     'input': 'hsl(0, 0%, 52%)',
//   }
// }
// const myCustomDarkTheme = {
//   dark: true,
//   colors: {
//     backgroundApp: 'hsl(207, 26%, 17%)',
//     primaryText: 'hsl(0, 0%, 100%)', //dark-mode-text
//     'elements': 'hsl(209, 23%, 22%)', //dark-mode-elements
//     'input': 'hsl(0, 0%, 52%)',
//   }

// }
export default createVuetify({
        
})


// - Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%) //ja foi
// - Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%) //ja foi
// - Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
// - Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
// - Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
// - White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)