import { vMaska } from 'maska';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('maska', vMaska);
  nuxtApp.vueApp.component('VueDatePicker', VueDatePicker);
});
