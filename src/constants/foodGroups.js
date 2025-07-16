export function getFoodGroups() {
  const saved = localStorage.getItem('food_groups_meta');
  if (saved) return JSON.parse(saved);
  return [
    { key: "verduras", label: "Verduras", meta: null },
    { key: "frutas", label: "Frutas", meta: null },
    { key: "cereales", label: "Cereales", meta: null },
    { key: "leguminosas", label: "Leguminosas", meta: null },
    { key: "productos_origen_animal", label: "Productos de origen animal", meta: null },
    { key: "lacteos", label: "Lácteos", meta: null },
    { key: "grasa", label: "Grasa", meta: null },
    { key: "azucares", label: "Azúcares", meta: null },
  ];
}

export const FOOD_GROUPS = getFoodGroups();
