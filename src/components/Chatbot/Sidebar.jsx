import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "visible" : "hidden"}`}>
      <h2>VerdiHome IA</h2>
      <ul>
        <li><NavLink to="/"><i className="bi bi-house-door"></i> Home</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;