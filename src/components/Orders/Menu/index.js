import Link from "next/link";
import { useRouter } from "next/router";

const BottomBar = ({ icon, text, href }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${
          router.route == href ? "text-orange-500" : "text-gray-400"
        }`}
      >
        {icon}
        <p className="text-xs">{text}</p>
      </a>
    </Link>
  );
};

const Dashboard = ({ icon, text, href }) => {
  return (
    <li>
      <Link href={href}>
        <a className="flex space-x-2">
          {icon}
          <p>{text}</p>
        </a>
      </Link>
    </li>
  );
};

const Mini = ({ href, name, icon }) => {
  return (
    <Link href={href}>
      <a className="w-3/12 flex flex-col items-center mt-3">
        <div className="p-2 w-10 h-10 rounded-md bg-white shadow-md border border-gray-200">
          {icon}
        </div>
        <p className="text-gray-500 text-xs text-center mt-2">{name}</p>
      </a>
    </Link>
  );
};

export { BottomBar, Dashboard, Mini };
