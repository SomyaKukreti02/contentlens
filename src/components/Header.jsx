import GoogleLoginButton from "@/components/GoogleLoginButton";
import { getUser, signOut } from "@/supabase/services/auth.service";
import { useEffect, useState } from "react";
import { Link } from "react-router";
const Header = () => {
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState("JD");

  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      // "Somya Kukreti" -> ["Somya", "Kukreti"] -> ["S", "K"] -> "SK"
      setInitials(
        user?.full_name
          .split(" ")
          .map((n) => n[0])
          .join("")
      );
    });
  }, []);

  return (
    <header className="navbar bg-primary mt-4 text-primary-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <i className="bx bx-menu text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 text-base-content rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link>Welcome</Link>
            </li>

            <li>
              <Link>Post</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-2xl">
          Content Lens
        </Link>
      </div>
      <div className="navbar-end gap-2">
        <div className="tooltip tooltip-bottom" data-tip="Create new content">
          <Link to={"/blog/create"}>
            <button className="btn btn-ghost btn-active btn-circle">
              <i className="bx bx-message-rounded-add  text-3xl" />
            </button>
          </Link>
        </div>
        {!user && <GoogleLoginButton />}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                {user && <img alt={initials} src={user.avatar_url} />}
                {!user && <i className="bx bx-user text-3xl" />}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 text-base-content rounded-box z-[100] mt-3 w-52 p-2 shadow"
            >
              <div>Hi, {user.full_name} 👋</div>
              <div className="text-sm opacity-50">{user.email}</div>
              <div className="divider"></div>
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
