import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light px-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="display-1 fw-bold text-warning">404</h1>
        <h2 className="fw-semibold mb-3">Page Not Found</h2>
        <p className="mb-4 text-muted">
          The page you are looking for might have been removed or temporarily unavailable.
        </p>
        <button
          className="btn btn-warning px-4 py-2 fw-semibold rounded-pill"
          onClick={() => navigate("/")}
          aria-label="Go back to homepage"
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
}
