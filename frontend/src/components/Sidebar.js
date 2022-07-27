import MyLink from "./links/MyLink";

export default function Sidebar() {
  return (
    <div className="sidebar sidebar-left">
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li>
            <MyLink to="/">Home</MyLink>
          </li>
          <li>
            <MyLink to="/myprofile">My Profile</MyLink>
          </li>
          <li>
            <MyLink to="/about">About</MyLink>
          </li>
          <li>
            <MyLink to="/auth/logout">Logout</MyLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
