const capitalize = (value) => {
  const newString = value.slice(0, 1).toUpperCase() + value.slice(1);
  return newString;
};

export default capitalize;
