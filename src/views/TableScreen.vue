<template>
  <div class="pt-10 pb-5">
    <input
      class="py-1.5 px-5 rounded-2xl min-w-[250px] w-1/2 border border-slate-400 dark:border-slate-500 dark:bg-slate-800"
      id="search"
      v-model="search"
      placeholder="Введите поисковый запрос:"
    />
  </div>
  <table id="table">
    <thead>
      <tr>
        <th
          v-for="header in table.tableHeaders"
          :key="header.label"
          @click="toggleSort(header)"
        >
          <div class="flex justify-between">
            <p class="pr-2">{{ header.label }}</p>

            <button v-if="header.value === sortBy">
              {{ sortIcon }}
            </button>
            <button v-else>[&nbsp;]</button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in sortedData" :key="row.tag_id">
        <td v-for="cell in table.tableHeaders" :key="cell.label">
          {{ getCellContent(cell, row) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { loadData } from "@/api/api.js";
import { useTable } from "@/hooks/useTable";

const table = ref({});

const {
  sortedData,
  getCellContent,
  toggleSort,
  sortDirection,
  sortBy,
  search,
} = useTable(table);

const sortIcons = {
  asc: "/\\",
  desc: "\\/",
};

const sortIcon = computed(() => {
  return sortIcons[sortDirection.value];
});

onMounted(async () => {
  table.value = await loadData();
});
</script>

<style scoped>
#table {
  @apply rounded-2xl p-5 font-sans border-separate w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm;
}

#table td,
#table th {
  @apply border border-slate-600;
}

#table thead {
  @apply bg-slate-50 dark:bg-slate-700;
}

#table tr:hover {
  background-color: #dddddd23;
}

#table td {
  @apply border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400;
}

#table th {
  @apply select-none border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left cursor-pointer;
}
</style>
