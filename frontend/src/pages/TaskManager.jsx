import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useTodoStore } from "../store/todo.js";
import {
	Plus,
	FilePenLine,
	Trash,
	Circle,
	CircleCheckBig,
	Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "../components/ui/badge";

import {
	Dialog,
	DialogContent,

} from "@/components/ui/dialog";

const TaskManager = () => {
	const {
		fetchTodos,
		todos,
		loading,
		error,
		loaded,
		formData,
		setFormData,
		addTodo,
		updateTodo,
	} = useTodoStore();

	const [editingId, setEditingId] = useState(null);
	const editTodo = todos.find((todo) => todo.id === editingId);

	useEffect(() => {
		console.log("Component mounted, loaded state:", loaded);
		if (!loaded) {
			fetchTodos();
		}
	}, [fetchTodos, loaded]);

	const handleEditSubmit = (e) => {
		e.preventDefault();
		if (editTodo) {
			updateTodo(editTodo.id);
			setEditingId(null);
			setFormData({ task: '', priority: '', category: '' });
		}
	};

	return (
		<section className="flex items-center flex-col mt-6 px-4 sm:px-0">
			<Card className="bg-gray-950 w-full sm:w-auto flex-1">
				<CardHeader>
					<CardTitle>Add Todo</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-2">
						<Input
							placeholder="Add Todo"
							value={formData.task || ""}
							onChange={(e) =>
								setFormData({ ...formData, task: e.target.value })
							}
							className="bg-gray-900 flex-1"
							required
						/>

						{/* Task Priority */}
						<Select
							onValueChange={(value) =>
								setFormData({ ...formData, priority: value })
							}
						>
							<SelectTrigger className="w-full sm:w-[110px]">
								<SelectValue placeholder="Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="low">Low</SelectItem>
								<SelectItem value="mid">Mid</SelectItem>
								<SelectItem value="high">High</SelectItem>
							</SelectContent>
						</Select>

						{/* Task Category */}
						<Select
							onValueChange={(value) =>
								setFormData({ ...formData, category: value })
							}
						>
							<SelectTrigger className="w-full sm:w-[110px]">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="personal">Personal</SelectItem>
								<SelectItem value="work">Work</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>

						<Button type="submit" variant="outline">
							<Plus />
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* Task List */}
			<div className="w-full sm:w-auto space-y-2">
				{error && (
					<div className="text-black-500 mt-4 rounded-lg flex-1 bg-red-400 py-2 px-6 text-center">
						{error}
					</div>
				)}
				{loading ? (
					<div>Loading...</div>
				) : (
					todos.map((todo) => {
						const {
							id,
							task,
							priority_category,
							type_category,
							completed,
							created_date,
						} = todo;
						return (
							<Card key={id} className="mt-4 p-4 bg-gray-950">
								<div className="flex flex-col sm:flex-row items-start justify-between w-full gap-3">
									{/* Task Content */}
									<div className="flex flex-col space-y-2 w-full sm:w-auto">
										{/* Task Title with Checkbox */}
										<div className="flex items-center justify-between w-full">
											<div className="flex items-center gap-2 cursor-pointer">
												{completed ? (
													<CircleCheckBig className="text-green-500" />
												) : (
													<Circle className="text-gray-400" />
												)}
												<div
													className={`${
														completed ? "line-through text-gray-200" : ""
													}`}
												>
													{task}
												</div>
											</div>

											{/* Mobile Actions */}
											<div className="flex sm:hidden space-x-2">
												<Button
													className="hover:text-cyan-600 hover:bg-transparent"
													variant="outline"
													size="sm"
													onClick={() => setEditingId(id)}
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
											onClick={() => setEditingId(id)}
										>
											<FilePenLine size={18} />
										</Button>
										<Button
											className="hover:text-red-600 hover:bg-transparent"
											variant="outline"
										>
											<Trash size={18} />
										</Button>
									</div>
								</div>
							</Card>
						);
					})
				)}
			</div>

			{editingId && (
				<Dialog open={!!editingId} onOpenChange={(open) => setEditingId(open ? editingId : null)}>
					<DialogContent>
						<form onSubmit={handleEditSubmit} className="flex flex-col sm:flex-row m-4 gap-2">
							<Input
								value={editTodo?.task || ""}
								onChange={(e) =>
									setFormData({ ...formData, task: e.target.value })
								}
								className="bg-gray-900 flex-1"
		
							/>

							{/* Task Priority */}
							<Select
								onValueChange={(value) =>
									setFormData({ ...formData, priority: value })
								}
							>
								<SelectTrigger className="w-full sm:w-[110px]">
									<SelectValue placeholder="Priority" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="low">Low</SelectItem>
									<SelectItem value="mid">Mid</SelectItem>
									<SelectItem value="high">High</SelectItem>
								</SelectContent>
							</Select>

							{/* Task Category */}
							<Select
								onValueChange={(value) =>
									setFormData({ ...formData, category: value })
								}
							>
								<SelectTrigger className="w-full sm:w-[110px]">
									<SelectValue placeholder="Category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="personal">Personal</SelectItem>
									<SelectItem value="work">Work</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>

							<Button type="submit" variant="outline">
								<Plus />
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			)}
		</section>
	);
};

export default TaskManager;