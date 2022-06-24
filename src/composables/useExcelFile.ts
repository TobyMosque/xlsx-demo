import { computed, watch, ref } from 'vue';
import { read, WorkBook, CellObject } from 'xlsx';

// composable
export function useExcelFile() {
  const file = ref<File>();
  const name = ref('');
  const workbook = ref<WorkBook>();
  watch(
    () => file.value,
    async () => {
      workbook.value = undefined;
      if (!file.value) {
        return;
      }
      const array = await file.value.arrayBuffer();
      workbook.value = read(array, { type: 'array' });
    },
    { immediate: true }
  );

  const worksheet = computed(() => {
    if (!name?.value || !workbook.value?.Sheets) {
      return undefined;
    }
    return workbook.value.Sheets[name.value];
  });
  const names = computed(() => {
    return workbook.value?.SheetNames || [];
  });

  function validate() {
    if (!worksheet.value) {
      return 'Please, pick a file and select a sheet';
    }
    const row = worksheet.value?.['A1'] as CellObject;
    if (!row || !row.v) {
      return "That doesn't seems like a valid sheet";
    }
    return true;
  }

  return {
    file,
    name,
    names,
    workbook,
    worksheet,
    validate,
  };
}
