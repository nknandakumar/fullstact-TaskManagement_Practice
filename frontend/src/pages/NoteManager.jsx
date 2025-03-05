import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FileText, Plus, Pencil, Trash2 } from "lucide-react";
import { useNoteStore } from "../store/note.js";
import { useEffect } from "react";

const NoteManager = () => {
	const { note, fetchNotes, loading, error,loaded } = useNoteStore();

	useEffect(() => {

	console.log('Component mounted, loaded state:', loaded);
    if (!loaded) {
		fetchNotes();
    }
	}, [fetchNotes,loaded]);

	
	return (
		<div className="max-w-6xl mx-auto flex justify-center items-center flex-col py-6 space-y-6">
			{/* Add Note Form - at the top */}
			<Card className="bg-gray-950 ">
				<CardHeader className="pb-2">
					<CardTitle className="text-white">Add New Note</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-3">
						<div className="flex flex-col  sm:flex-row gap-2">
							<Input
								placeholder="Note title"
								className="flex-1 bg-gray-900 text-white placeholder-gray-400 border-gray-700"
							/>
							<Select>
								<SelectTrigger className="w-full sm:w-32 bg-gray-900 text-white border-gray-700">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent className="bg-gray-900 text-white border-gray-700">
									<SelectItem value="personal">Personal</SelectItem>
									<SelectItem value="work">Work</SelectItem>
									<SelectItem value="shopping">Shopping</SelectItem>
									<SelectItem value="health">Health</SelectItem>
									<SelectItem value="learning">Learning</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex gap-2">
							<Textarea
								placeholder="Note content..."
								className="flex-1 min-h-24 bg-gray-900 text-white placeholder-gray-400 border-gray-700"
							/>
						</div>
						<Button
							type="submit"
							className="p-2 h-fit w-full bg-cyan-600 hover:bg-cyan-500"
						>
							<Plus className="w-6 h-6" />
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Notes Grid */}
			<div className="mx-4">
				<h2 className="text-xl font-bold mb-4 text-white">Your Notes</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{error && (
						<div className="text-black-500 mt-4 rounded-lg flex-1 bg-red-400 py-2 px-6 text-center">
							{error}
						</div>
					)}

					{loading ? (
						<div>Loading....</div>
					) : (
						note.map((note) => {
							const { id, title, content, category, created_date } = note;
							return (
								<Card
									key={id}
									className="bg-gray-900 hover:shadow-md transition-shadow"
								>
									<CardContent className="p-4">
										<div className="flex items-center justify-between mb-2">
											<div className="flex items-center gap-2">
												<FileText className="w-5 h-5 text-cyan-500" />
												<h3 className="font-medium text-white">{title}</h3>
											</div>
											<div className="flex gap-1">
												<Button
													variant="ghost"
													size="icon"
													className="text-gray-400 hover:text-cyan-500 hover:bg-transparent"
												>
													<Pencil className="w-5 h-5" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="text-gray-400 hover:text-red-500 hover:bg-transparent"
												>
													<Trash2 className="w-5 h-5" />
												</Button>
											</div>
										</div>
										<Textarea
											value={content}
											className="w-full mt-2 text-sm text-gray-300 bg-gray-800 border-gray-700"
											rows={4}
										/>
										<div className="mt-2 flex items-center justify-between">
											<Badge
												variant="outline"
												className="text-cyan-400 border-cyan-800"
											>
												{category}
											</Badge>
											<p className="text-xs text-gray-400">
												Last updated:{" "}
												{created_date
													? created_date.toLocaleString()
													: "N/A"}
											</p>
										</div>
									</CardContent>
								</Card>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default NoteManager;

/**
   {editingNote?.id === note.id ? (
                    <form className="space-y-2">
                      <Input
                        value={editingNote.title}
                        
                        className="w-full bg-gray-800 text-white border-gray-700"
                        placeholder="Title"
                      />
                      <Select 
                        value={editingNote.category}
                       
                      >
                        <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-white border-gray-700">
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="learning">Learning</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea
                        value={editingNote.content}
                        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                        className="w-full bg-gray-800 text-white border-gray-700"
                        placeholder="Content"
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="flex-1 bg-cyan-600 hover:bg-cyan-500"
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setEditingNote(null)}
                          className="bg-gray-600 hover:bg-gray-500 text-white"
                        >
                          <X className="w-6 h-6" />
                        </Button>
                      </div>
                    </form>
                  ) 
 */
