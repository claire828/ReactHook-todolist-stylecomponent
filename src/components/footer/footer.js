import React from "react";
import styled from "styled-components"
import tw from "twin.macro"
import {MenuEnum} from "../../App";
import { TaskContext } from "../../utilities/context/context";

export default function Footer(props){
    const {tabMenu,menuType,clear} = props;
    const names = ['All', 'Active', 'Complete'];
    const Wrap = styled.div`${tw` flex w-[550px] h-[50px] bg-white mx-auto font-thin text-black items-center justify-evenly border border-gray-600`}`
    const Info = styled.span`${tw`w-[100px]`}`;
    const TabContent = styled.div`${tw`w-[300px] flex justify-center`}`
    const Tab = styled.button`${tw`w-auto h-auto px-1 mx-2 border border-gray-600 rounded hover:border-red-300 hover:text-red-400`}
        ${(selfProps) => (selfProps.active ? tw`text-white bg-red-300` : "")}`;
    const Clear = styled.button`${tw` hover:border-red-300 hover:text-red-400`}`;
    
    return <>
        <Wrap>
            <TaskContext.Consumer>
                {tasks=>( <Info>{tasks.filter(x=>!x.complete).length} items left</Info>)}
            </TaskContext.Consumer>
            <TabContent>
                {Object.keys(MenuEnum).map((x,inx)=>
                    <Tab key={inx} active={menuType===inx} onClick={e=>tabMenu(inx)} >{names[inx]}</Tab>)}
            </TabContent>
            <Clear onClick={(e)=>clear()}>Clear</Clear>
        </Wrap>
    </>
}

