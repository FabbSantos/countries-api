<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style>
  body {
    font-family: 'Nunito Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
  .v-theme--light {
    --v-theme-background: 250, 250, 250 !important;
    --v-theme-surface: 255, 255, 255 !important;
  }
  .v-theme--dark {
    --v-theme-background: 32, 44, 55 !important;
    --v-theme-surface: 43, 57, 69 !important;
  }
  input.v-theme--dark {
    background-color: var(--v-theme-surface);
  }
  .v-field__outline {
    --v-field-border-width: 0px !important;
  }
  .v-field__outline:hover,
  .v-field__outline:focus,
  .v-field__outline:active,
  .v-field__outline:focus-visible {
    --v-field-border-width: 1px !important;
  }
  img {
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  }

    input, input.v-theme--light,
    select, .v-field, .v-input__prepend
    textarea {
      color: hsl(0, 0%, 52%);
    }
  .v-input--horizontal .v-input__prepend {
    margin-inline-start: 16px;
  }
    .v-field--appended {
      margin-inline-end: 0px;
    }
  .v-input__details {
    display: none !important;
  }
  .v-img__img {
    /* width: auto; */
    max-width: 100%;
  }

  @media (max-width: 768px) {
    header {
      position: relative !important;
    }
    .v-toolbar__content {
      flex-direction: column !important;
      padding-block: 1rem;
      height: auto !important;
    }
    main {
      --v-layout-top: 0 !important;
    }
  }
</style>