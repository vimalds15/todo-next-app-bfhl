
import Todos from "@/components/Todos";
import { ReactQueryProvider } from "@/utils/ReactQueryProvider";


export default function Home() {
  
  return (
    <ReactQueryProvider>
       <Todos /> 
    </ReactQueryProvider>
  )
}
