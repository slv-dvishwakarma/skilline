import Link from 'next/link';
import React from 'react';

interface LearnItem {
  title: string;
  url: string;
}

interface DataItem {
  label: string;
  chapter?: string;
  video?: string;
  learn?: LearnItem[];
}

interface CourseData {
  title: string;
  data: DataItem[];
}

interface RightBarProps {
  course: CourseData | null;
}

export const RightBar: React.FC<RightBarProps> = ({ course }) => {
  return (
    <>
      {course && (
        <div>
          <h2 className='mdx-heading mt-0 text-blog_title -mx-.5 break-words text-3xl font-display font-bold leading-tight'>{course.title}</h2>
          {course.data.map((item, index) => (
            <div key={index}>
              <p className='whitespace-pre-wrap my-4 font-display text-xl text-common leading-relaxed'>{item.label}</p>
              {item.chapter ? (
              <div className='p-6 rounded-xl border border-solid border-[gray]'>
                <h3 className='mdx-heading text-common  mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6'>{item.chapter}</h3>
                <ul className='space-y-2 pl-[22px]'>
                  {item.learn?.map((menu, index) => (
                    <li className='text-common list-disc' key={index}><Link  href={menu.url}>{menu.title}</Link></li>
                  ))}
                </ul>
              </div> 
              ): (null)}
              <div className='mt-4'>
              <iframe src={item.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  className='w-full xl:h-[400px] lg:h-[400px] md:h-[400px] h-[200px]'></iframe>
            </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
