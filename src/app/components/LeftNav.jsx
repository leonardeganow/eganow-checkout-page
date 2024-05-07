"use client"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation"
import React from "react";
import { IoCard } from "react-icons/io5";
import { MdOutlineMobileScreenShare } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

export default function LeftNav() {
  const pathname = usePathname()

  const items = [
    {
      id: 1,
      title: "Card",
      icon: <IoCard />,
      href: "/",
    },
    {
      id: 2,
      title: "Momo",
      icon: <MdOutlineMobileScreenShare />,
      href: "/momo",
    },
  ];

  const renderItems = () => {
    return items.map((item) => {
      return (
        <Link href={item.href} key={item.id} className="hover:bg-emerald-900" >
          <hr className=" border-gray-200"/>

          <li className={clsx({
            "font-medium  p-2 my-4  rounded  ": true,
           "bg-white text-gray-700 ": pathname === item.href,
           
          })}
          style={{
            cursor: "pointer"
          }}
          >
            <div className="flex justify-center sm:justify-between items-center ">
              <div className="flex items-center gap-x-2  ">
                {item.icon}
                <p className="hidden sm:block">{item.title}</p>
              </div>
            {pathname === item.href &&  <GoDotFill className="hidden sm:block" />}
            </div>
          </li>
          <hr className=" border-gray-200"/>
        </Link>
      );
    });
  };

  return <div>
    
    
    {renderItems()}</div>;
}
