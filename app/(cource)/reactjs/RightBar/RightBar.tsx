"use client";
import { Description } from "@/components/Description";
import { Terminal } from "@/components/Terminal";
import { Title } from "@/components/Title";
import { YoutubeVideo } from "@/components/YoutubeVideo";
import React, { useState } from "react";

interface RightBarProps {
  data: {
    [key: string]: {
      type: string;
      props: object;
      content: object;
    };
  };
}

export const RightBar: React.FC<RightBarProps> = ({ data }) => {
  const [json, setJson] = useState(data);

  const onChange = (prop: any, key: string) => {
    const newData = { ...json, [key]: { ...json[key], content: prop } };
    setJson(newData);
    console.log(newData);
  };

  const onDelete = (key: string) => {
    const newData = { ...json };
    delete newData[key];
    setJson(newData);
    console.log(newData);
  };

  const render: { [key: string]: React.FC<any> } = {
    title: Title,
    description: Description,
    YoutubeVideo: YoutubeVideo,
    terminal: Terminal,
  };

  return (
    <div className="space-y-4 p-8">
      {Object.keys(json).map((key, index) => {
        const item = json[key];
        const RenderItem = render[item.type];
        if (!RenderItem) {
          return (
            <div key={index} className="text-red-500 font-[600]">
              {item.type} template is not found
            </div>
          );
        }
        return (
          <div key={index}>
            <RenderItem {...item.content} onChange={(prop: any) => onChange(prop, key)} onDelete={() => onDelete(key)} />
          </div>
        );
      })}
    </div>
  );
};
