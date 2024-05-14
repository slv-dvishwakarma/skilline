import { Code } from "@/components/Code";
import { Note } from "@/components/Note";
import { Terminal } from "@/components/Terminal";
import VideoComponent from "@/components/VideoComponent";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QuillEditor } from "@/components/Editor/Editor";
import { serverActions } from "@/serverActions";
import BulletLinkBox from "@/components/BulletLinkBox";
interface LearnItem {
  title: string;
  url: string;
}

interface NoteItem {
  icon: string;
  title: string;
  label: string;
}

interface DataItem {
  label: string;
  chapter?: string;
  video?: string;
  learn?: LearnItem[];
  code?: string;
  notes?: NoteItem;
}

interface CourseData {
  title: string;
  data: DataItem[];
  codeString?: string;
}

interface RightBarProps {
  data: CourseData | null;
}

export const RightBar: React.FC<RightBarProps> = ({ data }) => {
  console.log(data);
  const { isAdmin } = useSelector((state: any) => state.auth);
  const [content, setContent] = useState<string>("");
  const [bulkData, setBulkData] = useState<any>(null);
  const handleChange = (value: string) => {
    setContent(value);
  };

  const configHome: any = [
    {
      id: "component_gallery",
      url: "component-gallery",
      method: "GET",
    },
  ];
  const entityData: any = async () => {
    const data = await serverActions(configHome);
    if (data?.component_gallery?.success) {
      setBulkData(data?.component_gallery?.success);
    }
  };
  useEffect(() => {
    entityData();
  }, []);

  const components: any = {
    ["videoComponent"]: VideoComponent,
    ["bulletBox"]: BulletLinkBox,
    ["codeBox"]: Terminal,
    ["noteView"]: Note,
    ["noteEditor"]: QuillEditor,
  };
  const onSave = (data: any) => {
    console.log(data);
  };
  return (
    <>
      {bulkData && (
        <div>
          <h2 className="mdx-heading mt-0 text-blog_title -mx-.5 break-words text-3xl font-display font-bold leading-tight">
            {bulkData?.header}
          </h2>
          <div>
            {bulkData?.data?.map((item: any, index: number) => {
              const Component = components[item?.type];
              return (
                <Fragment key={index}>
                  {Component && (
                    <Component data={item} admin={isAdmin} onSave={onSave} />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
