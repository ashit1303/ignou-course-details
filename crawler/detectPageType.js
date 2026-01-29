export function detectPageType($) {
  if ($(".panel-heading").text().includes("Files in This Item")) {
    return "ITEM";
  }

  if ($("th#t1").text().includes("Issue Date")) {
    return "COLLECTION";
  }

  if ($(".list-group-item-heading a").length > 0) {
    return "COMMUNITY";
  }

  return "UNKNOWN";
}
