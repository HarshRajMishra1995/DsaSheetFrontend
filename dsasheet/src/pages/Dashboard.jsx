import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { topicsList } from "../redux/slices/TopicSlice";
import { Card, Collapse, Checkbox, Tag } from "antd";

const { Panel } = Collapse;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.topic);

  // State to track completed problems (retrieved from localStorage initially)
  const [completedProblems, setCompletedProblems] = useState(
    JSON.parse(localStorage.getItem("completedProblems")) || {}
  );

  // Fetch topics list on mount
  const getTopicsList = async () => {
    await dispatch(topicsList());
  };

  useEffect(() => {
    getTopicsList();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (chapterId, problemId) => {
    const updatedCompletedProblems = {
      ...completedProblems,
      [chapterId]: {
        ...(completedProblems[chapterId] || {}),
        [problemId]: !completedProblems[chapterId]?.[problemId],
      },
    };

    // Save to state and localStorage
    setCompletedProblems(updatedCompletedProblems);
    localStorage.setItem(
      "completedProblems",
      JSON.stringify(updatedCompletedProblems)
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
                        checked={
                          completedProblems[chapter._id]?.[subtopic._id] ||
                          false
                        }
                        onChange={() =>
                          handleCheckboxChange(chapter._id, subtopic._id)
                        }
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
