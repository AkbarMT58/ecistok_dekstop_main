import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function LoadableImage(props) {
  const [loaded, setLoaded] = useState(false);

  const displayImgStyle = loaded ? '' : 'hidden';

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div width={props.width} height={props.height}>
      <Image
        src={props.src}
        width={props.width}
        height={props.height}
        alt='loadable'
        objectFit='cover'
        className={`rounded-md ${displayImgStyle}`}
        objectPosition='top center'
        placeholder='blur'
        blurDataURL='/default-image.png'
      />
    </div>
  );
}
