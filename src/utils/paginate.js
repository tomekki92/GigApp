import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; //calculating starting index of the items on 'pageNumber'
  return _(items).slice(startIndex).take(pageSize).value();
  //chaining lodash methods with _(items), .slice for slicing array starting from startIndex
  //using .take on newly created array to pick items for the current page
  //converting lodash wrapper object _(items) to a regular array with .value()
}
