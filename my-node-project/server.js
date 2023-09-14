const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package

const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Define teams with team members and priorities
const teams = [
  {
    name: "Team A",
    members: ["Member 1", "Member 2", "Member 3"],
  },
  {
    name: "Team B",
    members: ["Member 1", "Member 2", "Member 3"],
  },
  {
    name: "Team C",
    members: ["Member 1", "Member 2", "Member 3"],
  },
  // Add more teams here
];

let currentMemberIndex = 0;

// Endpoint to assign tasks to team members in a round-robin manner
app.post("/api/assignTask", (req, res) => {
  try {
    const { task, team } = req.body;

    console.log(team);

    // Find the team by name
    const selectedTeam = teams.find((t) => t.name === team);

    console.log(selectedTeam);

    if (!selectedTeam) {
      return res.status(400).json({ error: "Invalid team" });
    }

    // Get the current member for task assignment
    const currentMember = selectedTeam.members[currentMemberIndex];
    currentMemberIndex = (currentMemberIndex + 1) % selectedTeam.members.length;

    // Simulate task assignment (replace this with your actual logic)
    console.log(`Task "${task}" assigned to ${currentMember} of ${team}`);

    // Simulate task assignment and provide additional information in the response
    res.status(200).json({
      message: "Task assigned successfully",
      task: task,
      team: team,
      assignedTo: currentMember,
    });
  } catch (error) {
    console.log("Some error occured", error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
