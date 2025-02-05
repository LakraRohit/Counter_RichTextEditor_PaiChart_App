import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 
import { clearUser, setUser } from '../redux/userFormSlice';
import PieChart from './PieChart'; 
import RichTextEditor from './RichTextEditor'; 

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userForm);  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const [userData, setUserData] = useState<any[]>([]); 
  const [editorItems, setEditorItems] = useState<string[]>([]); 

  useEffect(() => {
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch(setUser(parsedUser));  
        setFormData(parsedUser);  
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }

    
    const savedItems = localStorage.getItem('editorItems');
    if (savedItems) {
      try {
        setEditorItems(JSON.parse(savedItems));  
      } catch (error) {
        console.error('Error parsing saved editor items:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    
    localStorage.setItem('user', JSON.stringify(user));
    setFormData(user);  
    setUserData(prevData => [...prevData, user]); 

   
    localStorage.setItem('editorItems', JSON.stringify(editorItems));
  }, [user, editorItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { id: Date.now().toString(), ...formData };
    dispatch(setUser(newUser));  
  };

  const handleClear = () => {
    dispatch(clearUser()); 
    setFormData({ name: '', email: '', phone: '', city: '' });  
  };

  
  const addItemToEditor = (item: string) => {
    setEditorItems(prevItems => [...prevItems, item]); 
  };

  
  const cityDistribution = userData.reduce((acc: { [key: string]: number }, user) => {
    if (user.city) {
      acc[user.city] = acc[user.city] ? acc[user.city] + 1 : 1;
    }
    return acc;
  }, {});

  return (
    <div className="flex gap-10">
      <div className="p-4 bg-white shadow-lg rounded-lg max-w-md">
        <h2 className="text-lg font-bold mb-4">User Form</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name || ''}  
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email || ''}  
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone || ''}  
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city || ''} 
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save User
          </button>
          <button type="button" onClick={handleClear} className="bg-red-500 text-white p-2 rounded">
            Clear User
          </button>
        </form>
      </div>

     
<RichTextEditor 
  initialContent={`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCity: ${formData.city}`} 
  editorItems={editorItems} 
  addItemToEditor={addItemToEditor} 
/>


      
      <PieChart data={cityDistribution} />
    </div>
  );
};

export default UserForm;
