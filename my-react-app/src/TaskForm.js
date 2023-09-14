import React, { useState } from "react";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [team, setTeam] = useState("");
  // Define available teams
  const availableTeams = [
    { value: "Team A", label: "Team A" },
    { value: "Team B", label: "Team B" },
    { value: "Team C", label: "Team C" },
    // Add more teams as needed
  ];
  const [assignedTask, setAssignedTask] = useState(null); // State to store assigned task info

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API with task and team data
      const response = await fetch("http://localhost:3001/api/assignTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, team }),//
      });

      if (response.ok) {
        const responseData = await response.json();
        // Extract additional information from the response
        const { message, task, team, assignedTo } = responseData;

        // Handle success and display the information
        alert(message);
        console.log(`Task "${task}" assigned to ${assignedTo} of ${team}`);
        setAssignedTask(responseData); // Update the assigned task info state

        // You can also update your UI state or component to display this information
        // Example: setAssignedTask({ task, assignedTo, team });

        // Clear the form
        setTask("");
        setTeam("");
      } else {
        alert("Error assigning task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          required
        />
        <select value={team} onChange={(e) => setTeam(e.target.value)} required>
          <option value="">Select a Team</option>
          {availableTeams.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit">Assign Task</button>
      </form>

      {/* Display assigned task info if available */}
      {assignedTask && (
        <div>
          <h3>Assigned Task Information</h3>
          <p>Task: {assignedTask.task}</p>
          <p>Assigned To: {assignedTask.assignedTo}</p>
          <p>Team: {assignedTask.team}</p>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
