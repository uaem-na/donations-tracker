import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>
      <Link className="block" to="/request/623e3e5b9f900b336e2f2878">Dummy request</Link>
      <Link className="block" to="/offer/623e3cd09f900b336e2f2874">Dummy offer</Link>
      <Link className="block" to="/new-request">New request</Link>
      <Link className="block" to="/new-offer">New offer</Link>
      <Link className="block" to="/profile">Profile</Link>
    </div>
  );
};

export default Dashboard;
