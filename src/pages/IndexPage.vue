<template>
  <q-page class="row items-center justify-evenly">
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-file
          label="Pick a File"
          filled
          v-model="files"
          accept=".xlsx"
        ></q-file>
      </div>
      <div class="col-6">
        <q-btn @click="download" dense label="Download and Pick"></q-btn>
      </div>
      <div class="col-6">
        <q-select :options="names" filled dense v-model="name"></q-select>
      </div>
      <div class="col-6">
        <q-btn @click="readSheet" label="Read Sheet"></q-btn>
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
import { apiKey } from 'src/boot/axios';
import { computed, inject, watch, ref } from 'vue';
import { useQuasar } from 'quasar';
import { read, WorkBook } from 'xlsx';

const quasar = useQuasar();
const files = ref<File[]>();
const wooksheet = ref<WorkBook>();
const api = inject(apiKey);
const name = ref('Sheet1');

watch(
  () => files.value,
  async () => {
    wooksheet.value = undefined;
    if (!files.value || !files.value.length) {
      return;
    }

    const array = await files.value[0].arrayBuffer();
    wooksheet.value = read(array, { type: 'array' });
  },
  { immediate: true }
);

const names = computed(() => {
  if (!wooksheet.value) {
    return [];
  }
  return Object.keys(wooksheet.value.Sheets);
});

async function download() {
  if (!api) {
    return;
  }
  const { data } = await api.get<File>('file_example_XLSX_1000.xlsx', {
    responseType: 'blob',
  });
  var file = new File([data], 'file_example_XLSX_1000.xlsx');
  files.value = [file];
}

function readSheet() {
  if (!wooksheet.value || !name.value) {
    quasar.notify({ message: 'Please, Pick a Sheet' });
    return;
  }
  console.log(wooksheet.value?.Sheets[name.value]);
}
</script>
