import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import ForgetPassword from 'components/ForgetPassword';

export default function login({ template }) {
  return (
    <>
      <Heads title={'Lupa Password'} />
      <ForgetPassword />
    </>
  );
}

export async function getStaticProps(context) {
  // const template = await getTemplate('/forgetpassword');

  return {
    props: {
      // template,
    },
  };
}
