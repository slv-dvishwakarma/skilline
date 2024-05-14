import Link from "next/link";
import React from "react";

const BulletLinkBox = ({ data }: any) => {
  return (
    <div className="p-6 rounded-xl border border-solid border-[gray]">
      <h3 className="mdx-heading text-common  mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6">
        {data?.heading}
      </h3>
      <ul className="space-y-2 pl-[22px]">
        {data?.points?.map((menu: any, index: number) => (
          <li
            className="text-common list-disc hover:text-secondary"
            key={index}
          >
            <Link href={menu.url}>{menu.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BulletLinkBox;
