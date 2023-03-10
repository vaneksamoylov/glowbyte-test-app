export async function loadData() {
  const { result } = await fetch("/data.json").then((res) => res.json());
  const { data, tableHeaders } = adapter(result);

  return { data, tableHeaders };
}

function attributesAdapter(data) {
  const countAttrs = data
    .map((row) => row.tag_attributes?.map((attr) => attr.attribute_id))
    .flat();

  return Array.from({
    length: Math.max(...countAttrs),
  })
    .fill("")
    .map((attr, index) => ({
      label: `Аттрибут ${index + 1}`,
      value: {
        getter: (row) => {
          return row.tag_attributes.find(
            (tag) => tag.attribute_id === index + 1
          )?.attribute_value;
        },
      },
    }));
}

function adapter(data) {
  const attributes = attributesAdapter(data);
  const tableHeaders = [
    { label: "id тега", value: "tag_id" },
    { label: "Имя тега", value: "tag_name" },
    ...attributes,
  ];

  return { data, tableHeaders };
}
