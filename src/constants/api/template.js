import axios from 'axios';

export async function getTemplate(path) {
  const URL = `${process.env.URL_CMS}/desktops?path=${path}`;
  const response = await axios.get(URL);
  const axiosResponse = response.data;
  const tempReturn = [];
  return tempReturn;
}
