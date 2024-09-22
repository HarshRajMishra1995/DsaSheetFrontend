import React, { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Descriptions, Progress } from "antd";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Fetch user token and decode it
    let userToken = localStorage.getItem("token");
    if (userToken) {
      let tokenDetails = jwt_decode(userToken);
      setUserDetails(tokenDetails);

      // Sample progress data for topics (could be fetched from API)
      const sampleProgress = [
        { topic: "Strings", progress: 70 },
        { topic: "Sorting", progress: 40 },
        { topic: "Trees", progress: 90 },
        { topic: "Graphs", progress: 60 },
        { topic: "Hashmaps", progress: 50 },
      ];

      setProgressData(sampleProgress);
    }
  }, []);

  return (
    <div className="w-full h-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">User Profile</h1>

      {userDetails ? (
        <>
          {/* User Information */}
          <Descriptions
            title="User Info"
            bordered
            className="bg-gray-50 p-4 rounded-md mb-6"
            column={1}
          >
            <Descriptions.Item label="Name">
              {userDetails.username || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {userDetails.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {userDetails.role || "User"}
            </Descriptions.Item>
          </Descriptions>

          {/* Progress on Topics */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Progress
          </h2>
          <div className="space-y-4">
            {progressData.map((item) => (
              <div key={item.topic} className="flex items-center">
                <span className="w-32 font-medium text-gray-600">
                  {item.topic}
                </span>
                <Progress
                  percent={item.progress}
                  className="flex-grow"
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading user details...</p>
      )}
    </div>
  );
}

export default Profile;
