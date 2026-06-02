import React from 'react'
import { useAuthStore } from '../store/authStore'

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className='p-6'>
        <h1 className='text-3xl font-bold mb-4'>
            Profile
        </h1>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      
    </div>
  );
};

export default Profile;
