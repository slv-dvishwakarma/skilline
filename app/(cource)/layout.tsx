import { GridBox } from "@/components/GridBox"
import { SVGIcon } from "@/components/Icons"
import { ParentContainer } from "@/components/ParentContainer"
import en from "./en.json"
import { SideBar } from "./reactjs/SideBar"


const CourceLayout = ({ children }: any) => {
    return <ParentContainer className="bg-section py-[50px]">
        <div className="flex relative items-center gap-2.5 after:content-[''] after:w-full after:h-[3px] after:absolute after:bg-tertiary after:left-0 after:bottom-[-5px] w-[200px]">
            <SVGIcon className="text-xl text-secondary" name={en.icon} />
            <h1 className='text-blog_title text-xl'>{en.title}</h1>
        </div>
        <GridBox columns={3} gap={10} className='py-[20px]'>
            <GridBox.GridItem columnMerge={1} >
                <div className="shadow-[rgba(149,157,165,0.2)_0px_8px_24px] border p-5 rounded-xl border-solid border-white">
                    <SideBar sidebar={en.sidebar} />
                </div>
            </GridBox.GridItem>
            <GridBox.GridItem columnMerge={2}>
                {children}
            </GridBox.GridItem>
        </GridBox>
    </ParentContainer>
}

export default CourceLayout