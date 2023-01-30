import Link from 'next/link';

const BreadCrumb = ({ title }) => {
  return (
    <div className='shadow bg-white rounded-md mt-2'>
      <nav className='bg-grey-light p-3 rounded font-sans w-full'>
        <ol className='list-reset flex text-xs text-grey-700'>
          <li>
            <Link href='/'>
              <a className='text-blue font-bold'>Beranda</a>
            </Link>
          </li>
          <li>
            <span className='mx-2'>/</span>
          </li>
          <li className='line-clamp-2'>{title}</li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
