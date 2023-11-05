import { deleteTodo, updateTodo } from '@/api';
import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {MdCheckCircle,MdCheckCircleOutline} from "react-icons/md"


const TodoItemTwo = ({id,completed,title}) => {

  const queryClient = useQueryClient();

  const {mutate:deleteTodoMutation,isLoading:isDeleteLoading} = useMutation({
    mutationFn:()=>deleteTodo(id),
    onSuccess:()=>{
        queryClient.invalidateQueries(['todos'])
    }
  })

  const {mutate:updateTodoMutation,isLoading:isUpdateLoading}=useMutation({
    mutationFn:(newStatus)=>updateTodo(id,newStatus),
    onSuccess:()=>{
        console.log("first")
        queryClient.invalidateQueries(['todos'])
    },
    onError:(error)=>{
        console.log(error.message)
    }
  })

  return (
    <Container>
        <StatusIcon  onClick={()=>updateTodoMutation(!completed)}>   
        {completed
        ?
        <MdCheckCircle size={24} color='green' />
        :
        <MdCheckCircleOutline size={24} color='gray' />
        }
        </StatusIcon>
        <Title completed={completed}>{title}</Title>
        <Button onClick={deleteTodoMutation} disabled={isDeleteLoading}>Delete</Button>
    </Container>
  )
}

export default TodoItemTwo

const Button = styled.button`
    background-color: black;
    color: white;
    height: 40px;
`

const Title = styled.p`
    margin:0px 40px 0px 40px;
    text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding:5px 15px;
    background-color: #edfafa;
    /* background-color: #F1F9F9; */
`

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`