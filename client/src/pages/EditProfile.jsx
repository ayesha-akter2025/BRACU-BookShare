import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProfile({ onUpdate }) {
  const { id } = useParams(); // MongoDB user _id from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', bio: '', location: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.log('GET user error:', err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, formData);
      
      alert('Profile updated!');
      
      // Update user in App.js state
      if (onUpdate) {
        onUpdate(res.data);
      }

      navigate('/profile'); // redirect back to profile
    } catch (err) {
      console.error('PUT user error:', err);
      alert('updated profile'); // check
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Edit Profile</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        style={{ width: '100%', padding: 8, margin: '8px 0' }}
      />
      <input
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        style={{ width: '100%', padding: 8, margin: '8px 0' }}
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        style={{ width: '100%', padding: 8, margin: '8px 0' }}
      />
      <button type="submit" style={{ width: '100%', padding: 10, marginTop: 10 }}>
        Save
      </button>
    </form>
  );
}
