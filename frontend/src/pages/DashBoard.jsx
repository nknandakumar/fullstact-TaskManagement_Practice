
import TaskManager from "./TaskManager";
import BookMarkManager from "./BookMarkManager";
import NoteManager from "./NoteManager";
import { Button } from "../components/ui/button"
import { ListTodo, Bookmark, FileText } from 'lucide-react';
import { useStore } from "../store.js"

const DashBoard = () => {
  const {  activeTab ,  setActiveTab} = useStore()
  // ${ activeTab === 'bookmark' && "bg-gray-950"  } ${activeTab === 'note' && "bg-neutral-900"  } 
  return (
    <section className={` flex  items-center flex-col  `} >
      <h1 className="  py-8 md:py-20 text-2xl md:text-4xl lg:text-5xl font-bold " >Productivity</h1>
      <div className="">
        {/** Navigation */}
        <div className="flex justify-center items-center text-4xl  gap-2 md:gap:4 ">
        <Button className=" text-lg" onClick={()=> setActiveTab('task')} variant={ activeTab === 'task' ? "secondary" : "outline"} ><ListTodo/> Tasks</Button>
        <Button className=" text-lg" onClick={()=> setActiveTab('bookmark')} variant={ activeTab === 'bookmark' ? "secondary" : "outline"}><Bookmark/> BookMark</Button>
        <Button className=" text-lg" onClick={()=> setActiveTab('note')} variant={ activeTab === 'note' ? "secondary" : "outline"}><FileText/> Note</Button>
        </div>
        {/** sections */}
        <div className="  ">
          {activeTab === 'task' && <TaskManager />}
          {activeTab === 'bookmark' && <BookMarkManager />}
          {activeTab === 'note' && <NoteManager />}
        </div>
      </div>
    </section>
  )
}

export default DashBoard