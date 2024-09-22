import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { topicsList, userProgress } from "../redux/slices/TopicSlice";
import { getUserProgress } from "../redux/slices/AuthSlice";
import { Card, Collapse, Checkbox, Tag } from "antd";

const { Panel } = Collapse;

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.topic);

  // State to track completed problems
  const [completedProblems, setCompletedProblems] = useState({});

  // Fetch topics list and user progress on mount
  const getTopicsList = async (userId) => {
    await dispatch(topicsList());
    let resultAction = await dispatch(getUserProgress({ userId }));
    if (getUserProgress.fulfilled.match(resultAction)) {
      const fetchedUserProgressDetails = resultAction.payload;
      console.log(
        "fetchedUserProgressDetails ---> ",
        fetchedUserProgressDetails
      );
      const progress = fetchedUserProgressDetails.progress || [];
      // Update completedProblems based on fetched progress
      const newCompletedProblems = {};
      progress.forEach(({ topicId, completed }) => {
        newCompletedProblems[topicId] = completed;
      });
      setCompletedProblems(newCompletedProblems);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const tokenDetails = jwt_decode(userToken);
      const id = tokenDetails.userId;
      setUserId(id); // Set userId

      // Call getTopicsList only after userId is set
      getTopicsList(id);
    }
  }, [dispatch]);

  // Handle checkbox change
  const handleCheckboxChange = async (topicId) => {
    const updatedCompletedProblems = {
      ...completedProblems,
      [topicId]: !completedProblems[topicId],
    };

    // Save to state and localStorage
    setCompletedProblems(updatedCompletedProblems);
    await dispatch(
      userProgress({
        userId,
        topicId,
        completed: updatedCompletedProblems[topicId], // Use updated value
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        DSA Topics Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card
            key={topic._id}
            title={topic.name}
            className="shadow-md"
            extra={
              <Tag color={getLevelColor(topic.level)}>Level {topic.level}</Tag>
            }
          >
            <Collapse accordion>
              {topic.chapters.map((chapter) => (
                <Panel key={chapter._id} header={`${chapter.name}`}>
                  {chapter.subtopics.map((subtopic) => (
                    <Card key={subtopic._id} className="mb-2">
                      <Checkbox
                        checked={completedProblems[subtopic._id] || false}
                        onChange={() => handleCheckboxChange(subtopic._id)}
                      >
                        {subtopic.problem}
                      </Checkbox>
                      <div className="flex justify-end space-x-2">
                        <a
                          href={subtopic.tutorialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "skyblue" }}
                        >
                          Tutorial
                        </a>
                        <a
                          href={subtopic.leetcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LeetCode
                        </a>
                        <a
                          href={subtopic.articleLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Article
                        </a>
                      </div>
                    </Card>
                  ))}
                </Panel>
              ))}
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Function to return color based on level
const getLevelColor = (level) => {
  switch (level) {
    case "Easy":
      return "green";
    case "Medium":
      return "orange";
    case "Hard":
      return "red";
    default:
      return "blue";
  }
};

export default Dashboard;
