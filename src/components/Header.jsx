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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 text-base-content rounded-box z-[100] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link>Welcome</Link>
            </li>
            <li>
              <Link>Categories</Link>
            </li>
            <li>
              <Link>Post</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          ContentLens
        </Link>
      </div>
      <div className="navbar-end">
        {!user && <GoogleLoginButton />}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                <img
                  alt={initials}
                  src={
                    user.avatar_url ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
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
