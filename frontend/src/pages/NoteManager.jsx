import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Pencil, Trash2, X } from 'lucide-react';

const NoteManager = () => {
  // Initialize with some example notes for demonstration
  const [notes, setNotes] = useState([
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Discussed project timelines and assigned tasks for next sprint',
      category: 'work',
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Shopping List',
      content: 'Milk, eggs, bread, fruits, vegetables',
      category: 'shopping',
      updatedAt: new Date().toISOString()
    }
  ]);
  
  const [newNote, setNewNote] = useState({ 
    title: '', 
    content: '', 
    category: 'personal'
  });
  
  const [editingNote, setEditingNote] = useState(null);

  const addNote = (note) => {
    const newNoteObj = {
      ...note,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNoteObj, ...notes]);
  };

  const updateNote = (id, content) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, content, updatedAt: new Date().toISOString() } 
        : note
    ));
  };

  const updateNoteDetails = (id, details) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...details, updatedAt: new Date().toISOString() } 
        : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    
    addNote(newNote);
    setNewNote({ 
      title: '', 
      content: '', 
      category: 'personal'
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingNote) return;
    
    updateNoteDetails(editingNote.id, {
      title: editingNote.title,
      content: editingNote.content,
      category: editingNote.category,
    });
    setEditingNote(null);
  };

  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center flex-col py-6 space-y-6">
      {/* Add Note Form - at the top */}
      <Card className="bg-gray-950 ">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col ma sm:flex-row gap-2">
              <Input
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Note title"
                className="flex-1 bg-gray-900 text-white placeholder-gray-400 border-gray-700"
              />
              <Select 
                value={newNote.category}
                onValueChange={(value) => setNewNote({ ...newNote, category: value })}
              >
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
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
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
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Your Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length === 0 ? (
            <Card className="col-span-full bg-gray-900 text-gray-400">
              <CardContent className="p-8 text-center">
                No notes yet. Add your first note above!
              </CardContent>
            </Card>
          ) : (
            notes.map((note) => (
              <Card key={note.id} className="bg-gray-900 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {editingNote?.id === note.id ? (
                    <form onSubmit={handleUpdate} className="space-y-2">
                      <Input
                        value={editingNote.title}
                        onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                        className="w-full bg-gray-800 text-white border-gray-700"
                        placeholder="Title"
                      />
                      <Select 
                        value={editingNote.category}
                        onValueChange={(value) => setEditingNote({ ...editingNote, category: value })}
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
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-cyan-500" />
                          <h3 className="font-medium text-white">{note.title}</h3>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            onClick={() => setEditingNote(note)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-cyan-500 hover:bg-transparent"
                          >
                            <Pencil className="w-5 h-5" />
                          </Button>
                          <Button
                            onClick={() => deleteNote(note.id)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-500 hover:bg-transparent"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={note.content}
                        onChange={(e) => updateNote(note.id, e.target.value)}
                        className="w-full mt-2 text-sm text-gray-300 bg-gray-800 border-gray-700"
                        rows={4}
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-800">
                          {note.category}
                        </Badge>
                        <p className="text-xs text-gray-400">
                          Last updated: {new Date(note.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteManager;