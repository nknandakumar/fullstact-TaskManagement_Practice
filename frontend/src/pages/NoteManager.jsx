

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import  Selects  from "../components/Selects";
import { MoreVertical, FilePenLine, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";

const NoteManager = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 w-full mt-6">
      {/* Add Note Section */}
      <Card className="bg-gray-950 w-full sm:max-w-3xl">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <Input placeholder="Note Title" className="bg-gray-900 text-white placeholder-gray-400" />
            <Textarea placeholder="Write your note..." className="bg-gray-900 text-white placeholder-gray-400" />
            <div className="flex items-center gap-3">
              <Selects name="Category" width="w-full sm:w-[120px]" op1="Work" op2="Personal" op3="Other" />
              <Button className="bg-cyan-600 hover:bg-cyan-500 transition">Add Note</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note List */}
      <div className="w-full sm:max-w-3xl mt-8 space-y-4">
        {[1, 2, 3].map((_, index) => (
          <Card key={index} className="bg-gray-900 shadow-md hover:shadow-lg transition">
            <CardHeader className="flex justify-between items-center p-4">
              <div>
                <CardTitle className="text-white">Meeting Notes</CardTitle>
                <p className="text-gray-400 text-sm">Last Updated: Feb 25, 2025 - 10:45 AM</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" className="hover:text-cyan-500 p-2 rounded-md">
                  <FilePenLine className="w-5 h-5" />
                </Button>
                <Button variant="ghost" className="hover:text-red-500 p-2 rounded-md">
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
              {/* Mobile More Options */}
              <div className="sm:hidden">
                <Popover>
                  <PopoverTrigger>
                    <MoreVertical className="text-white w-6 h-6" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 text-white p-2 flex flex-col space-y-2">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <FilePenLine className="w-5 h-5" /> Edit
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2 text-red-500">
                      <Trash className="w-5 h-5" /> Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="p-4 text-gray-400 text-sm">
              Discussed project timelines and assigned tasks for next phase...
              <div className="mt-2">
                <Badge variant="outline">Work</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoteManager;
