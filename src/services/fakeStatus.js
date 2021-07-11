export const status = [
  { _id: "5b21ca3eeb7f6fbccd471818", title: "Approved", color: "green" },
  { _id: "5b21ca3eeb7f6fbccd471814", title: "Cancelled", color: "red" },
  { _id: "5b21ca3eeb7f6fbccd471820", title: "Pending", color: "black" },
  { _id: "5b21ca3eeb7f6fbccd471839", title: "Happened", color: "gray" },
];

export function getStatus() {
  return status.filter((s) => s);
}
