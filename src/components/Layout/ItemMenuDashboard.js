import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ItemMenuDashboard = ({ href, icon, text }) => {
  const router = useRouter();

  return (
    <li>
      <Link href={href !== 'ociskill' && href}>
        <a className='flex space-x-2'>
          {icon}
          <p
            className={
              router.asPath === href
                ? 'border-b-2 border-orange-400 transition-all duration-300'
                : ''
            }
          >
            {text}
          </p>
        </a>
      </Link>
    </li>
  );
};

const ItemMenuDashboardDisabled = ({
  href,
  icon,
  text,
  textChild,
  classNameChild,
}) => {
  const router = useRouter();

  return (
    <li>
      <div className='cursor-pointer'>
        <a className='flex space-x-2'>
          {icon}
          <div>
            <p
              className={`
              ${
                router.asPath === href
                  ? 'border-b-2 border-orange-400 transition-all duration-300'
                  : ''
              }
            `}
            >
              {text}
            </p>
            <p className={`${classNameChild}`}>{textChild}</p>
          </div>
        </a>
      </div>
    </li>
  );
};

export { ItemMenuDashboard, ItemMenuDashboardDisabled };
