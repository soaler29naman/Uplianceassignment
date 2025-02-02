import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setContent(JSON.stringify(JSON.parse(savedData), null, 2));
    }
  }, []);

  const handleChange = (value: string) => {
    setContent(value);
    localStorage.setItem('editorContent', value);
  };

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={handleChange}
      modules={{
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ]
      }}
    />
  );
}