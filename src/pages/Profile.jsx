import React, { useEffect, useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Descriptions, Progress } from "antd";
import { useDispatch } from "react-redux";
import { getUserProgress } from "../redux/slices/AuthSlice";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const dispatch = useDispatch();

  // Map of topicId to chapter names
  const topicMap = {
    1: "Strings",
    2: "Sorting",
    3: "Trees",
    4: "Graphs",
    5: "Hashmaps",
    6: "Array",
    7: "Linked Lists",
    // Add more mappings as per your data
  };

  useEffect(() => {
    // Fetch user token and decode it
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const tokenDetails = jwt_decode(userToken);
      setUserDetails(tokenDetails);

      // Fetch user progress data
      const fetchUserProgress = async () => {
        const resultAction = await dispatch(
          getUserProgress({ userId: tokenDetails.userId })
        );
        if (getUserProgress.fulfilled.match(resultAction)) {
          const fetchedProgress =
            resultAction.payload.topicCompletedDetails || [];

          // Create an initial array from `topicMap` with progress set to 0
          const allTopicsProgress = Object.keys(topicMap).map((topicId) => ({
            topicId: topicId,
            topicName: topicMap[topicId],
            progress: 0, // Default to 0
          }));

          // Update progress based on fetched data
          fetchedProgress.forEach((item) => {
            const topicIndex = allTopicsProgress.findIndex(
              (topic) => topic.topicName === item.topicName
            );
            if (topicIndex !== -1) {
              allTopicsProgress[topicIndex].progress = item.completed ? 100 : 0;
            }
            // Filter out any topics with "Unknown Topic"
            const filteredProgress = allTopicsProgress.filter(
              (item) => item.topicName !== "Unknown Topic"
            );

            setProgressData(filteredProgress);
          });

          // setProgressData(allTopicsProgress); // Set the final progress data
        }
      };

      fetchUserProgress();
    }
  }, [dispatch]);

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
              <div key={item.topicId} className="flex items-center">
                <span className="w-32 font-medium text-gray-600">
                  {item.topicName}
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
