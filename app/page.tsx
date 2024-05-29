import { Banner } from "@/components/Home/Banner";
import { ParentContainer } from "@/components/ParentContainer";
import en from "./en.json";
import { Trusted } from "@/components/Home/Trusted";
import { Card } from "@/components/Card";
import { Blog } from "@/components/Blog";
import { ImageTextLayout } from "@/components/ImageTextLayout";
import { Courses } from "@/components/Courses";
import { Practice } from "@/components/Practice";

export default function Home() {
  return (
    <>
      <ParentContainer className='bg-primary'>
        <Banner banner={en.banner} calander={en.banner_card.calander} placement={en.banner_card.placement} />
      </ParentContainer>
      {/* <ParentContainer className="bg-section border-y-[#FFF2E1] border-t border-solid border-b">
        <Trusted image={en.Trusted} label={en.Trusted_label} />
      </ParentContainer>
      <ParentContainer className="bg-section border-y-[#FFF2E1] border-t border-solid border-b">
        <Card carddata={en.card_item.carddata} card={en.card_item.card} />
      </ParentContainer>
      <ParentContainer className="bg-section border-y-[#FFF2E1] border-t border-solid border-b">
        <ImageTextLayout ImageTextLayout={en.ImageTextLayout} />
        <ImageTextLayout ImageTextLayout={en.ImageTextLayout_two} />
      </ParentContainer>
      <ParentContainer className="bg-section border-y-[#FFF2E1] border-t border-solid border-b">
        <Blog blogdata={en.blog_item.blogdata} news={en.blog_item.news} blogs={en.blog_item.blogs} />
      </ParentContainer> */}
      <ParentContainer className="bg-section border-y-[#FFF2E1] border-t border-solid border-b">
        <Courses course={en.courses}/>
      </ParentContainer>
      <ParentContainer className="bg-section border-y-[#FFF2E1] border-t border-solid border-b">
        <Practice practice={en.Practice}/>
      </ParentContainer>
    </>
  );
}
