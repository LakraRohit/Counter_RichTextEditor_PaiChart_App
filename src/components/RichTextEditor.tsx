import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

interface RichTextEditorProps {
  initialContent: string;  // Accept the initial content as a prop
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent }) => {
  const [editorContent, setEditorContent] = useState<string>(''); // To hold content in the editor
  const [savedContent, setSavedContent] = useState<string[]>([]); // To store saved formatted content

  // Load saved content from localStorage when the component mounts
  useEffect(() => {
    const storedContent = localStorage.getItem('savedContent');
    if (storedContent) {
      setSavedContent(JSON.parse(storedContent)); // Load saved content from localStorage
    }
  }, []);

  useEffect(() => {
    // Ensure initialContent is not undefined or null
    const content = initialContent || ''; // Fallback to empty string if undefined or null
    
    // Convert \n into <p> tags or <br /> before setting the content
    const formattedContent = content
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');  // Wrap each line with <p> tags
    setEditorContent(formattedContent);
  }, [initialContent]);

  // Handle editor content change
  const handleEditorChange = (value: string) => {
    setEditorContent(value);  // Update the content as the user types
  };

  // Handle save content
  const handleSave = () => {
    if (editorContent.trim()) {
      const newSavedContent = [...savedContent, editorContent];
      setSavedContent(newSavedContent); // Add the current content to the saved list
      localStorage.setItem('savedContent', JSON.stringify(newSavedContent)); // Save to localStorage
      setEditorContent(''); // Clear editor after saving
    }
  };

  // Handle delete saved content
  const handleDelete = (index: number) => {
    const newSavedContent = savedContent.filter((_, i) => i !== index); // Remove the content at the given index
    setSavedContent(newSavedContent);
    localStorage.setItem('savedContent', JSON.stringify(newSavedContent)); // Update localStorage
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-md mt-4">
      <h2 className="text-lg font-bold mb-4">Rich Text Editor</h2>
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        theme="snow"
        className="border p-2 rounded"
      />
      
      <div className="mt-4 flex gap-4">
        <button 
          onClick={handleSave} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Output Content */}
      <div className="mt-4">
        <h3 className="font-semibold">Output Content:</h3>
        <div className="border p-4 rounded mt-2" style={{ minHeight: '100px' }}>
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </div>
      </div>

      {/* Saved Content (To-Do list like) */}
      <div className="mt-6">
        <h3 className="font-semibold">Saved Content:</h3>
        <div>
          {savedContent.length > 0 ? (
            savedContent.map((content, index) => (
              <div 
                key={index} 
                className="border p-4 rounded mt-2"
                style={{ minHeight: '80px' }}
              >
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <button 
                  onClick={() => handleDelete(index)} 
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No saved content yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
