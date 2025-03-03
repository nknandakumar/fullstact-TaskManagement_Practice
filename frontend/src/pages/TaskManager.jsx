import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import Selects from "../components/Selects";
import { useTodoStore } from "../store/todo.js";
import {
	Plus,
	FilePenLine,
	Trash,
	Circle,
	CircleCheckBig,
	Calendar,
} from "lucide-react";
import { useEffect } from "react";
import { Badge } from "../components/ui/badge";

const TaskManager = () => {
	const { fetchTodos, todos,loading,error } = useTodoStore();
	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);
	console.log(todos);
	//const [check, setCheck] = useState(false);
	return (
		<section className="flex items-center flex-col mt-6 px-4 sm:px-0">
			<Card className="bg-gray-950 w-full sm:w-auto flex-1">
				<CardHeader>
					<CardTitle>Add Todo</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col sm:flex-row gap-2">
						<Input placeholder="Add Todo" className="bg-gray-900 flex-1" />
						{/* Task Priority */}
						<Selects
							name="Medium"
							width="w-full sm:w-[110px]"
							op1="Low"
							op2="Medium"
							op3="Hard"
						/>
						<Selects
							name="Personal"
							width="w-full sm:w-[110px]"
							op1="Personal"
							op2="Work"
							op3="Other"
						/>
						<Button variant="outline">
							<Plus />
						</Button>
					</div>
				</CardContent>
			</Card>
			{/* Task List */}
      
    <div className="w-full  sm:w-auto space-y-2">
    {error && (
                <div className="text-black-500 mt-4 rounded-lg flex-1 bg-red-400 py-2 px-6 text-center">
                    {error}
                </div>
            )}
      {loading ? (
        <div>loading....</div>
      ) : (
        todos.map((todo) => {
          const { id, task, completed, priority_category, type_category, created_date } = todo;
          return (
            <Card key={id} className="mt-4 p-4 bg-gray-950">
              <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-3">
                {/* Task Content */}
                <div className="flex flex-col space-y-2 w-full sm:w-auto">
                  {/* Task Title with Checkbox */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {completed ? (
                        <CircleCheckBig className="text-green-500 cursor-pointer" />
                      ) : (
                        <Circle className="cursor-pointer" />
                      )}
                      <div className={`${completed ? "line-through text-gray-200" : ""}`}>
                        {task}
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex sm:hidden space-x-2">
                      <Button
                        className="hover:text-cyan-600 hover:bg-transparent"
                        variant="outline"
                        size="sm"
                      >
                        <FilePenLine size={18} />
                      </Button>
                      <Button
                        className="hover:text-red-600 hover:bg-transparent"
                        variant="outline"
                        size="sm"
                      >
                        <Trash size={18} />
                      </Button>
                    </div>
                  </div>

                  {/* Tags and Date in a single row */}
                  <div className="flex items-center mt-2 sm:gap-10 justify-between">
                    {/* Tags */}
                    <div className="flex space-x-1">
                      <Badge variant="outline">{priority_category}</Badge>
                      <Badge variant="outline">{type_category}</Badge>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar size={14} />
                      <span>{created_date}</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden sm:flex space-x-2">
                  <Button
                    className="hover:text-cyan-600 hover:bg-transparent"
                    variant="outline"
                  >
                    <FilePenLine />
                  </Button>
                  <Button
                    className="hover:text-red-600 hover:bg-transparent"
                    variant="outline"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
		</section>
	);
};

export default TaskManager;
