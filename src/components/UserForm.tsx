import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Import RootState from store
import { clearUser, setUser } from '../redux/userFormSlice';
import PieChart from './PieChart'; // Import PieChart component
import RichTextEditor from './RichTextEditor'; // Import the RichTextEditor

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userForm);  // Use userForm state from Redux

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const [userData, setUserData] = useState<any[]>([]); // Track the list of users
  const [editorItems, setEditorItems] = useState<string[]>([]); // Track saved editor items

  useEffect(() => {
    // Load saved user data from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch(setUser(parsedUser));  // Set user data from localStorage to Redux
        setFormData(parsedUser);  // Also update the local state with the saved data
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }

    // Load saved editor items from localStorage
    const savedItems = localStorage.getItem('editorItems');
    if (savedItems) {
      try {
        setEditorItems(JSON.parse(savedItems));  // Set editor items from localStorage
      } catch (error) {
        console.error('Error parsing saved editor items:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Save user data to local storage whenever it changes
    localStorage.setItem('user', JSON.stringify(user));
    setFormData(user);  // Update local form data when Redux state changes
    setUserData(prevData => [...prevData, user]); // Add the new user to the list

    // Save editor items to local storage
    localStorage.setItem('editorItems', JSON.stringify(editorItems));
  }, [user, editorItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { id: Date.now().toString(), ...formData };
    dispatch(setUser(newUser));  // Save user data in Redux
  };

  const handleClear = () => {
    dispatch(clearUser());  // Clear user data in Redux
    setFormData({ name: '', email: '', phone: '', city: '' });  // Clear the form data locally
  };

  // Add a new item to the editor list
  const addItemToEditor = (item: string) => {
    setEditorItems(prevItems => [...prevItems, item]);  // Add the new item
  };

  // Prepare data for PieChart
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
            value={formData.name || ''}  // Ensure value is always a string
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email || ''}  // Ensure value is always a string
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone || ''}  // Ensure value is always a string
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city || ''}  // Ensure value is always a string
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

      {/* Pass the rich text content (values only) to the RichTextEditor component */}
<RichTextEditor 
  initialContent={`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCity: ${formData.city}`} 
  editorItems={editorItems} 
  addItemToEditor={addItemToEditor} 
/>


      {/* Pass the city distribution to the PieChart component */}
      <PieChart data={cityDistribution} />
    </div>
  );
};

export default UserForm;