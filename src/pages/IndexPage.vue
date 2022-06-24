<template>
  <q-page class="row items-center justify-evenly">
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-file
          label="Pick a File"
          filled
          dense
          v-model="file"
          accept=".xlsx"
        ></q-file>
      </div>
      <div class="col-12">
        <q-select :options="names" filled dense v-model="name"></q-select>
      </div>
      <div class="col-12">
        <q-btn @click="save" color="primary" label="Read Sheet"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'IndexPage',
});
</script>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useExcelFile } from 'src/composables/useExcelFile';

const { file, name, names, worksheet, validate } = useExcelFile();
const quasar = useQuasar();

function save() {
  const isValid = validate();
  if (isValid === true) {
    console.log(worksheet.value);
  } else {
    quasar.notify({
      message: isValid,
      color: 'warning',
    });
  }
}
</script>
