const convertRupiah = (value) => {
  return parseInt(
    (parseFloat(value) * parseInt(process.env.CONVERSION_MONEY)).toFixed()
  );
};

export default convertRupiah;
