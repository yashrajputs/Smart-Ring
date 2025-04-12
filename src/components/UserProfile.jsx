import PropTypes from 'prop-types';

function UserProfile({ name, profilePhoto }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 flex items-center">
      <img src={profilePhoto} alt={`${name}'s profile`} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <p className="text-gray-400">Welcome back!</p>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string.isRequired,
};

export default UserProfile;
