import React from 'react';
import './Profile.css';

const Profile = ({ studied }) => {
  return (
    <div className="profile">
      <h3>Мой профиль (изучаемое)</h3>
      {studied.length === 0 ? (
        <p>Пока ничего не добавлено</p>
      ) : (
        <ul>
          {studied.map(prof => (
            <li key={prof.id}>{prof.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;