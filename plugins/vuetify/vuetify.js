// vuetify.js ou main.js
import 'vuetify/styles'; // Importation des styles Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Importation des icônes MDI

import { createVuetify } from 'vuetify';

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // Utilisation du set d'icônes MDI
  },
});
