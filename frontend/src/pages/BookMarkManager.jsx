import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Bookmark, Trash, Pencil } from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useBookMarkStore } from "../store/bookmark.js";

const BookMarkManager = () => {
	const {
		bookmark,
		fetchBookMarks,
		addBookMark,
		deleteBookMark,
		fetchBookMark,
		loading,
		error,
		loaded,
		formData,
		setFormData,
		updateData,
		setUpdateData,
		updateBookMark,
	} = useBookMarkStore();

	useEffect(() => {
		if (!loaded) {
			fetchBookMarks();
		}
	}, [loaded]);
	console.log(bookmark);
	console.log(formData);
	const handleSubmit = (e) => {
		e.preventDefault();

		// Form validation
		if (!formData.title.trim()) {
			alert("Please enter a title");
			return;
		}

		if (!formData.url.trim()) {
			alert("Please enter a URL");
			return;
		}

		// Basic URL validation
		if (
			!formData.url.startsWith("http://") &&
			!formData.url.startsWith("https://")
		) {
			const updatedFormData = { ...formData, url: `https://${formData.url}` };
			setFormData(updatedFormData);
			// Need to use the updated value directly since state updates are async
			addBookMark(e, updatedFormData);
		} else {
			addBookMark(e);
		}
	};
	const [editId, setEditId] = useState(null);
	const handleUpdate = (id) => {
		setEditId(() => id);
		fetchBookMark(id);
	};
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateBookMark(editId);
      setEditId(null); // Reset edit mode
    } else {
      addBookMark(e);
    }
  };
  

	return (
		<div className="mt-6 px-4 flex flex-col items-center justify-center sm:px-0">
			<Card className="bg-gray-950 w-full sm:max-w-3xl">
				<CardContent className="p-4">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col sm:flex-row gap-3"
					>
						<Input
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder="Title"
							className="flex-1 bg-gray-900 text-white placeholder-gray-400"
						/>
						<Input
							value={formData.url}
							onChange={(e) =>
								setFormData({ ...formData, url: e.target.value })
							}
							placeholder="URL"
							className="flex-1 bg-gray-900 text-white placeholder-gray-400"
						/>
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
						<Button
							type="submit"
							className="flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 transition"
						>
							<Plus className="w-5 h-5" />
						</Button>
					</form>
				</CardContent>
			</Card>

			{/* BookMark List */}
			<div className="w-full mt-10 sm:w-auto space-y-2">
				{error && (
					<div className="text-white mt-4 rounded-lg flex-1 bg-red-500 py-2 px-6 text-center">
						{error}
					</div>
				)}

				{loading ? (
					<div className="flex justify-center py-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
					</div>
				) : bookmark.length === 0 ? (
					<div className="text-center py-8 text-gray-400">
						No bookmarks found. Add your first bookmark above!
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{bookmark.map((b) => {
							const { id, title, url, category, created_date } = b;
							return (
								<Card key={id} className="flex flex-col items-start">
									<CardHeader className="flex flex-row gap-4 items-center">
										<div className="flex gap-1">
											<Bookmark />
											<CardTitle className="flex items-center gap-2 truncate max-w-[150px]">
												{title}
											</CardTitle>
										</div>
										<div className="flex items-center gap-2">
											<Button
												className="hover:text-cyan-600 hover:bg-transparent"
												variant="outline"
												onClick={() => handleUpdate(id)}
											>
												<Pencil />
											</Button>
											<Button
												className="hover:text-red-600 hover:bg-transparent"
												variant="outline"
												onClick={() => deleteBookMark(id)}
											>
												<Trash />
											</Button>
										</div>
									</CardHeader>

									<CardContent className="flex flex-col items-start gap-2">
										<a
											href={url}
											target="_blank"
											rel="noreferrer"
											className="text-gray-400 text-lg mb-2 hover:text-cyan-200 truncate max-w-full"
										>
											{url}
										</a>
										<Badge className="" variant="outline">
											{category}
										</Badge>
										<p className="text-xs">
											<span>Created On: </span>
											{created_date}
										</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</div>
			<Dialog
				open={!!editId}
				onChange={(open) => setEditId(open ? editId : null)}
			>
				<DialogContent>
					<form
						onSubmit={handleUpdateSubmit}
						className="flex flex-col sm:flex-row gap-3"
					>
						<Input
							value={updateData.title}
							onChange={(e) =>
								setUpdateData({ ...updateData, title: e.target.value })
							}
							placeholder="Title"
							className="flex-1 bg-gray-900 text-white placeholder-gray-400"
						/>
						<Input
							value={updateData.url}
							onChange={(e) =>
								setUpdateData({ ...updateData, url: e.target.value })
							}
							placeholder="URL"
							className="flex-1 bg-gray-900 text-white placeholder-gray-400"
						/>
						<Select
							onValueChange={(value) =>
								setUpdateData({ ...updateData, category: value })
							}
						>
							<SelectTrigger className="w-full sm:w-[110px]">
								<SelectValue placeholder="Category">
									{formData.category || "Select Category"}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="personal">Personal</SelectItem>
								<SelectItem value="work">Work</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
						<Button
							type="submit"
							className="flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 transition"
						>
							save
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default BookMarkManager;
