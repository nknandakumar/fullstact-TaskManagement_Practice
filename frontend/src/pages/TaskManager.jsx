import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";

import Selects from "../components/Selects";

import { Plus, FilePenLine, Trash, Circle, CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";

const TaskManager = () => {
  const [check, setCheck] = useState(false);
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
      <div className="w-full sm:w-auto space-y-2">
        <Card className="mt-4 flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-950">
         <div className="flex justify-center items-center gap-2">
         {check ? (
            <CircleCheckBig
              className="text-green-500"
              onClick={() => {
                setCheck(!check);
              }}
            />
          ) : (
            <Circle
              onClick={() => {
                setCheck(!check);
              }}
            />
          )}

          {/* Task Name */}
          <div className={` ${check ? "line-through text-gray-200" : ""} `}>
            Car Washing and service
          </div>
         </div>

          {/* Task Priority */}
          <div className="space-x-1">
            <Badge variant="outline">Medium</Badge>
            <Badge variant="outline">Work</Badge>
          </div>
          {/* Task Actions */}
          <div className="flex space-x-2">
            <Button className="hover:text-cyan-600 hover:bg-transparent" variant="outline">
              <FilePenLine />
            </Button>
            <Button className="hover:text-red-600 hover:bg-transparent" variant="outline">
              <Trash />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TaskManager;
