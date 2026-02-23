import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <motion.div
        className="navbar-logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <span className="logo-text">EasyFund</span>
        </Link>
      </motion.div>
      <div className="navbar-links">
        {["Home", "Dashboard", "Funding"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="nav-link"
            >
              {item}
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
