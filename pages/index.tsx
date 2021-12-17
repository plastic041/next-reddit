import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/shortscarystories">
        <a>
          <span className="text-blue-500 underline">r/shortscarystories</span>
        </a>
      </Link>
    </div>
  );
};

export default Home;
