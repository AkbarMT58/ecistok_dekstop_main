import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
const users = () => {
  const token = Cookies.get('token');

  try {
    if (token) {
      const jwtToken = atob(token);
      const decode = jwt_decode(jwtToken);

      return {
        isLogin: true,
        email: decode?.data?.email,
        is_verified: decode?.data?.is_verified,
        level: decode?.data?.level,
        userName: decode?.data?.userName,
        phone: decode?.data?.sales_number,
        salesName: decode?.data?.nama_sales?.nama,
        salesContact: decode?.data?.nama_sales?.telepon,
        is_first_time: decode?.data?.is_first_time,
      };
    } else {
      throw 'not login';
    }
  } catch (e) {
    Cookies.remove('token');
    Cookies.remove('user');
    return {
      isLogin: false,
      email: null,
      is_verified: null,
      level: null,
      userName: null,
      phone: null,
      salesName: null,
      salesContact: null,
      is_first_time: false,
    };
  }
};

export default users;
