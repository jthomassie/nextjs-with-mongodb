// components/Nav.js

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="">
      <ul className="">
        <li className="">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/add-post">
            <a>Add post</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
