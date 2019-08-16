import React from "react";

function Dashboard(props) {
  const { user } = props;
  const name = user.name !== undefined ? user.name : "";

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{`Welcome back ${name}`}</p>
    </div>
  );
}

export default Dashboard;
