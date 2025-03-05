import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Bookmark, FilePenLine, Trash } from "lucide-react";
import { Badge } from "../components/ui/badge";
import Selects from "../components/Selects";
import { useBookMarkStore } from "../store/bookmark.js";
const BookMarkManager = () => {
	const { bookmark, fetchBookMarks, loading, error, loaded } = useBookMarkStore();
	useEffect(() => {
		console.log('Component mounted, loaded state:', loaded);
		if (!loaded) {
			fetchBookMarks();
		}
	}, [fetchBookMarks,loaded]);

	return (
		<div className=" mt-6 px-4 flex flex-col items-center justify-center sm:px-0">
			<Card className="bg-gray-950 w-full   sm:max-w-3xl">
				<CardContent className="p-4">
					<div className="flex flex-col sm:flex-row gap-3">
						<Input
							placeholder="Title"
							className="flex-1 bg-gray-900 text-white placeholder-gray-400"
						/>
						<Input
							placeholder="URL"
							className="flex-1 bg-gray-900 text-white placeholder-gray-400"
						/>
						<Selects
							name="Category"
							width="w-full sm:w-[120px]"
							op1="Personal"
							op2="Work"
							op3="Other"
						/>
						<Button className="flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 transition">
							<Plus className="w-5 h-5" />
						</Button>
					</div>
				</CardContent>
			</Card>
			{/* BookMark List */}

			<div className="w-full mt-10 sm:w-auto space-y-2">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{error && (
						<div className="text-black-500 mt-4 rounded-lg flex-1 bg-red-400 py-2 px-6 text-center">
							{error}
						</div>
					)}
					{loading ? (
						<div>Loading....</div>
					) : (
						bookmark.map((b)=>{
                             const {id,title,url,category,created_date
							 } = b;
							 return(
								<Card key={id} className="flex flex-col items-start">
								<CardHeader className="flex flex-row gap-4  items-center">
									<div className="flex gap-1">
										<Bookmark />{" "}
										<CardTitle className="flex items-center gap-2 ">
											{title}
											
										</CardTitle>
									</div>
									<div className="flex items-center gap-2">
					  <Button className="hover:text-cyan-600 hover:bg-transparent" variant="outline">
					  <FilePenLine />
					</Button>
					<Button className="hover:text-red-600 hover:bg-transparent" variant="outline">
					  <Trash />
					</Button>
									</div>
								</CardHeader>
		
								<CardContent className="flex flex-col items-start gap-2">
									<a
										href={url}
										target="_blank"
										rel="noreferrer"
										className="text-gray-400 text-lg mb-2 hover:text-cyan-200 "
									>
										{url}
									</a>
									<Badge className="" variant="outline">
										{category}
									</Badge>
									<p className="text-xs"><span>Created On : </span>{created_date}</p>
								</CardContent>
							</Card>
							 )

						})
					)}
				</div>
			</div>
		</div>
	);
};

export default BookMarkManager;
