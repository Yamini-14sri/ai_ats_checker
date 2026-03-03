import React, { useState } from "react";

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Srilu",
    email: "srilu@example.com",
    bio: "AI Enthusiast | React Developer | Building Smart Projects 🚀",
    phone: "+91 9876543210",
    location: "India",
    profilePic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    coverPic:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    created_at: "2024-01-15",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      {/* COVER SECTION */}
      <div className="relative">
        <img
          src={profile.coverPic}
          alt="Cover"
          className="w-full h-64 object-cover"
        />

        <div className="absolute -bottom-16 left-10">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-24 bg-white rounded-2xl shadow-xl p-10">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            {editing ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-3xl font-bold border-b border-gray-300"
              />
            ) : (
              <h1 className="text-3xl font-bold">{profile.name}</h1>
            )}
            <p className="text-gray-500">
              Member since{" "}
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>

          {editing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Bio Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Bio / Interests</h2>
          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          ) : (
            <p className="text-gray-700">{profile.bio}</p>
          )}
        </div>

        {/* Contact Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact Details</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p>{profile.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Phone</label>
                {editing ? (
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-500">Location</label>
                {editing ? (
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                ) : (
                  <p>{profile.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p>{profile.email}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Password</label>
                <button className="text-indigo-600 hover:underline">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Updated Resume</li>
            <li>• Checked ATS Score</li>
            <li>• Applied for Software Developer Job</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;