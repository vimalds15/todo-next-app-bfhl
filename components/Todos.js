"use client";

import {  getTodos } from "@/api";
import {  useQuery } from "@tanstack/react-query";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import styled from "@emotion/styled";

const Todos = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) {
    return (
      <div>
        <p>loading....</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log("render");

  return (
    <Container>
      <SubContainer>
        <Title>Todo App</Title>
        <AddTodo />

        <div>
          {data?.map((item) => (
            <TodoItem {...item} />
          ))}
        </div>
      </SubContainer>
    </Container>
  );
};

export default Todos;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: rgb(238,174,202);
background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  height: 100vh;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding:50px;
  background-color: white;
  box-shadow: 0px 11px 30px 1px rgba(0,0,0,0.12);
-webkit-box-shadow: 0px 11px 30px 1px rgba(0,0,0,0.15);
-moz-box-shadow: 0px 11px 30px 1px rgba(0,0,0,0.62);
`
const Title = styled.h2`
  margin-bottom: 20px;
`