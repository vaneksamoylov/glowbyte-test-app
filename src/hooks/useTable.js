import { ref, computed } from "vue";
import orderBy from "lodash.orderby";

const isComplexCell = (cell) => typeof cell === "object";

export function useTable(table) {
  const search = ref("");
  const sortDirection = ref(null);
  const sortBy = ref(null);

  const filteredData = computed(() => {
    if (search.value) {
      return table.value.data.filter((row) =>
        row.tag_name.toLowerCase().includes(search.value)
      );
    }
    return table.value.data;
  });

  const sortedData = computed(() => {
    if (sortBy.value) {
      return orderBy(
        filteredData.value,
        (row) => {
          if (isComplexCell(sortBy.value)) {
            return sortBy.value.getter(row);
          }
          return row[sortBy.value];
        },
        sortDirection.value
      );
    }
    return filteredData.value;
  });

  const toggleSort = (header) => {
    sortBy.value = header.value;

    if (!sortDirection.value) {
      sortDirection.value = "desc";
      return;
    }
    if (sortDirection.value === "desc") {
      sortDirection.value = "asc";
      return;
    }
    if (sortDirection.value === "asc") {
      sortDirection.value = null;
      sortBy.value = null;
      return;
    }
  };

  const getCellContent = (cell, row) => {
    return isComplexCell(cell.value) ? cell.value.getter(row) : row[cell.value];
  };

  return {
    sortedData,
    getCellContent,
    toggleSort,
    sortDirection,
    sortBy,
    search,
  };
}
