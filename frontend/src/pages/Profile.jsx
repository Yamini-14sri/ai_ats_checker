import React, { useState } from "react";

function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Srilu",
    email: "srilu@example.com",
    bio: "AI Enthusiast | React Developer 🚀",
    avatar: "https://i.pravatar.cc/150",
    coverImage:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    created_at: "2024-01-15",
  });

  const [formData, setFormData] = useState(profile);

  const [analyses] = useState([
    { id: 1, title: "Resume Analysis - Software Role", score: 85 },
    { id: 2, title: "Frontend Developer Resume", score: 90 },
  ]);

  const handleEdit = () => {
    setFormData(profile);
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData({ ...formData, [type]: imageURL });
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-100">
      {/* COVER SECTION */}
      <div className="relative h-64 bg-gradient-to-r from-indigo-700 to-blue-600">
        <img
          src={editing ? formData.coverImage : profile.coverImage}
          alt="cover"
          className="w-full h-full object-cover opacity-60"
        />

        {editing && (
          <label className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg shadow cursor-pointer text-sm">
            Change Cover
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "coverImage")}
            />
          </label>
        )}

        {/* PROFILE IMAGE */}
        <div className="absolute -bottom-16 left-10">
          <img
            src={editing ? formData.avatar : profile.avatar}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />

          {editing && (
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer text-xs shadow">
              ✎
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "avatar")}
              />
            </label>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-24 pb-16">
        {/* NAME + ACTION */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            {editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-3xl font-bold border-b outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-gray-600 border-b outline-none"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-800">
                  {profile.name}
                </h1>
                <p className="text-gray-600">{profile.email}</p>
              </>
            )}
          </div>

          {editing ? (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* BIO */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Bio</h2>

          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="4"
            />
          ) : (
            <p>{profile.bio}</p>
          )}
        </div>

        {/* ACTIVITY */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          {analyses.length > 0 ? (
            <div className="space-y-3">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="p-4 border rounded-lg"
                >
                  <p className="font-medium">
                    {analysis.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Score: {analysis.score}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent activity.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;