
//import TaskManager from "./pages/TaskManager";
//import BookMarkManager from "./pages/BookMarkManager";
//import NoteManager from "./pages/NoteManager";
import { Button } from "../components/ui/button"
const DashBoard = () => {
  return (
    <section className=" flex  items-center flex-col  h-screen  " >
      <h1 className=" py-20 text-2xl md:text-4xl lg:text-5xl font-bold " >Productivity</h1>
      <div className="">
        <div className="flex gap-4  ">
        <Button variant="outline">Tasks</Button>
        <Button variant="secondary">BookMark</Button>
        <Button variant="outline">Note</Button>
        </div>
      </div>
    </section>
  )
}

export default DashBoard