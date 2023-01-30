export default function Spinner({ label, className, diameter = 10 }) {
  return (
    <div className='flex flex-col items-center'>
      <svg
        className={`animate-spin h-${diameter} w-${diameter} text-white`}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'>
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='#ffa83d'
          strokeWidth='4'></circle>
        <path
          className='opacity-75'
          fill='#ff8c00'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
      </svg>
      <p className='text-sm mt-2 text-orange-500'>{label}</p>
    </div>
  );
}
