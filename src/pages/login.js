import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import Login from 'components/Login';
import { useEffect } from 'react';
import router from 'next/router';
import Cookies from 'js-cookie';
import users from 'helpers/users';

export default function login({ template }) {
  useEffect(() => {
    const user = users();

    if (user.isLogin === true) {
      router.push('/dashboard');
    } else {
      Cookies.remove('token');
      Cookies.remove('user');
    }
  }, []);

  return (
    <>
      <Heads title={'Login'} />
      <Login />
    </>
  );
}

export async function getStaticProps() {
  // const template = await getTemplate('/login');
  return {
    props: {
      // template,
    },
  };
}
