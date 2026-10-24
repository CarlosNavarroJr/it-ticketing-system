import { Link } from "react-router";

function NotFound() {
  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>

        <Link className="back-link" to="/">
          Return to Dashboard
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
