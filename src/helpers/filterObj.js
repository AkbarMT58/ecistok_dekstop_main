export default function filterObj(prop) {
  const patt = new RegExp(prop);

  const obj = [];
  dataProduct?.sku.find((o, i) => {
    if (patt.test(o.properties)) {
      obj.push(o);
    }
  });
  return obj;
}
