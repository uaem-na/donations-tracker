import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>
      <Link className="block" to="/request/123">Dummy request</Link>
      <Link className="block" to="/offer/123">Dummy offer</Link>
      <Link className="block" to="/new-request">New request</Link>
      <Link className="block" to="/new-offer">New offer</Link>
      <Link className="block" to="/profile">Profile</Link>
    </div>
  );
};

export default Dashboard;
