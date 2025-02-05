import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface RichTextEditorProps {
  initialContent: string;
  editorItems: string[]; // Expecting this prop
  addItemToEditor: (item: string) => void; // Expecting this prop
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, editorItems, addItemToEditor }) => {
  const [editorContent, setEditorContent] = useState<string>(''); 
  const [savedContent, setSavedContent] = useState<string[]>([]);

  useEffect(() => {
    console.log(editorItems);
    const storedContent = localStorage.getItem('savedContent');
    if (storedContent) {
      setSavedContent(JSON.parse(storedContent)); 
    }
  }, [[editorItems]]);

  useEffect(() => {
    const content = initialContent || ''; 
    const formattedContent = content
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');  
    setEditorContent(formattedContent);
  }, [initialContent]);

  const handleEditorChange = (value: string) => {
    setEditorContent(value); 
  };

  const handleSave = () => {
    if (editorContent.trim()) {
      const newSavedContent = [...savedContent, editorContent];
      setSavedContent(newSavedContent); 
      localStorage.setItem('savedContent', JSON.stringify(newSavedContent)); 
      addItemToEditor(editorContent); // Add content to the editorItems in parent component
      setEditorContent(''); 
    }
  };

  const handleDelete = (index: number) => {
    const newSavedContent = savedContent.filter((_, i) => i !== index); 
    setSavedContent(newSavedContent);
    localStorage.setItem('savedContent', JSON.stringify(newSavedContent)); 
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

      <div className="mt-4">
        <h3 className="font-semibold">Output Content:</h3>
        <div className="border p-4 rounded mt-2" style={{ minHeight: '100px' }}>
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        </div>
      </div>

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
