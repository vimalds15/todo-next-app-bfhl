const baseURL = 'http://localhost:5000';

export const getTodos = async () => {
    const res = await fetch(`${baseURL}/todos`);
    const result = await res.json();
    return result;
}

export const addTodo = async (id,title) => {
    console.log(id,title,"todo")
    const res = await fetch(`${baseURL}/todos`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({id,title})
    })
    const newTodo = await res.json();
    return newTodo;
}

export const deleteTodo = async (id)=> {
    console.log("deleting",id)
    const res = await fetch(`${baseURL}/todos/${id}`,{
        method:'DELETE'
    })
    const newTodo = await res.json();
    return newTodo;
}

export const updateTodo = async (id,completed)=>{
    const data = {"completed":completed}
    const res = await fetch(`${baseURL}/todos/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    const newTodo = await res.json();
    return newTodo;
}