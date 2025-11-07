import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user || { name: '', email: '', address: '' });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <img
            src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">{user.name}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{user.email}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.address || 'No address added'}</dd>
                </div>
              </dl>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;