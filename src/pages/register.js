import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import Register from 'components/Register';

export default function register({ template }) {
  return (
    <>
      <Heads title={'Register'} />
      <Register />
    </>
  );
}
export async function getStaticProps() {
  // const template = await getTemplate('/register');

  return {
    props: {
      // template,
    },
  };
}
