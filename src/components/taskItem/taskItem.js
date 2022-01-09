import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components/macro";
import tw from "twin.macro";


export default function TaskItem(props){
    const task = props.task;
    const [edit, setEdit] = useState(false);
    const [input,setInput] = useState(task.taskName);
    const [btnVisible, setBtnVisible] = useState(false);

    const Wrap = styled.div`${tw`flex font-thin text-black bg-white justify-evenly items-center border border-bottom[1px] border-color[gray] w-full h-[60px]`}`;

    const Icon = styled.input`${tw`w-10 h-10 outline-none`}`;

    const Task = styled.input`${tw`items-center w-full h-full p-2 text-xl font-thin bg-transparent outline-none`}
        ${(edit? tw`border border-gray-200 shadow-md` : tw`border-none`)}`;

    const DeleteBtn = styled.button`${tw`w-10 h-10 text-[#cc9a9a] transition duration-1000 ease-in-out`}
    ${(btnVisible ? tw`visible` : tw`invisible`)}`;
     

    const finishEdit = ()=>{
        setEdit(false);
        
        if(task.taskName === input) return;
        if(!input) return setInput(task.taskName);
        
        props.rename(task.taskId, input);
    }


    return <>
            <Wrap onMouseOver={(e)=> setBtnVisible(true)} onMouseLeave={(e)=>setBtnVisible(false)} >
                <Icon type={'text'}/>
                <Task value={input} 
                    readOnly={!edit}
                    autoFocus={edit}
                    onBlur={e=>{ finishEdit()}}
                    onInput={e=>setInput(e.target.value)} 
                    onKeyPress={e=> {e.key === 'Enter' && finishEdit()} }
                    onDoubleClick={(e)=>{ setEdit(true)}}></Task>

                <DeleteBtn 
                    hidden={edit}
                    disabled={!btnVisible}
                    onClick={(e)=>props.delete(task.taskId)}>X</DeleteBtn>
            </Wrap>
        </>
}
