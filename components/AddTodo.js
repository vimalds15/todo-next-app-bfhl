"use client"

import { useRef } from "react"
import {v4 as uuidv4} from 'uuid';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/api";
import styled from "@emotion/styled";

const AddTodo = () => {
  const titleRef=useRef(null);
  const queryClient = useQueryClient();

  const {mutate:createTodoMutuation} = useMutation({
    mutationFn:(id)=>addTodo(id,titleRef.current.value),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['todos']})
      titleRef.current.value=""
    },
    onError:(error)=>{
        console.log(error.message)
    }
  })

  const submitHandler = async() =>{
    createTodoMutuation(uuidv4())
  }

  return (
    <Container>
    <Input type="text" ref={titleRef} />
    <Button type="submit" onClick={submitHandler}>Add</Button>
    </Container>
  )
}

export default AddTodo

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
`

const Input = styled.input`
    width: 100%;
    border:2px solid #d4d2d2;
    border-right: none;
    padding: 10px 10px;
    :focus{
        border-color: gray;
        outline: none;
    }
`

const Button = styled.button`
    border: 2px solid black;
    background-color: black;
    color: white;
    padding: 10px 15px;
`