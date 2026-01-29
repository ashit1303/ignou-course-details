export function breadcrumbToChp(breadcrumb) {
  const obj = {};
  breadcrumb.forEach((val, idx) => {
    obj[`chp${idx + 1}`] = val;
  });
  return obj;
}
