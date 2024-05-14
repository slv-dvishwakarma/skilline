"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import en from "../en.json";
import learn from "./learn.json";
import { RightBar } from "../reactjs/RightBar";

interface SubCategory {
  title: string;
  url: string;
}

interface SidebarItem {
  category: string;
  sub_category: SubCategory[];
}

interface DataItem {
  label: string;
}

interface CourseData {
  title: string;
  data: DataItem[];
}

const Page = () => {
  const [pageData, setPageData] = useState<CourseData[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const activeSubCategories = [en.sidebar]
      .flatMap((category: SidebarItem) => category.sub_category)
      .filter((subCategory: SubCategory) => subCategory.url === pathname)
      .map((subCategory: SubCategory) => subCategory.title);

    const matchingCourses = learn.course.filter((course: CourseData) =>
      activeSubCategories.includes(course.title)
    );

    setPageData(matchingCourses);
  }, [pathname]);

  return (
    <div>
      {pageData.map((course, index) => (
        <RightBar key={index} data={course} />
      ))}
    </div>
  );
};

export default Page;
