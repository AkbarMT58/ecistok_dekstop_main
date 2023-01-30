import Link from 'next/link';

export default function NavItem({ url, text }) {
  return (
    <Link href={url}>
      <a
        // target={text !== 'Cara Belanja' ? '_self' : '_blank'}
        target='_self'
        className='text-md text-orange-500'
        rel={text === 'Cara Belanja' ? 'noopener noreferrer' : undefined}
      >
        {text}
      </a>
    </Link>
  );
}
