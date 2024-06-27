import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";
import UserMenu from "./navbar/UserMenu";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-950 my-0 flex justify-between items-center py-1 px-4 sticky top-0 w-full z-50 shadow-sm">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <div className="flex gap-x-2 justify-center items-center">
          <img
            className="w-12 h-12 rounded-full"
            src="https://i.postimg.cc/mkh4mJ9R/Logo-Mario-Salazar.gif"
            alt=""
          />
          <h1 className="text-2xl font-bold">Task</h1>
        </div>
      </Link>

      <ul className="flex gap-x-2 justify-center items-center">
        {isAuthenticated ? (
          <>
            <li>
              <ButtonLink to="/add-task">Add Task</ButtonLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Sign in</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Sign up</ButtonLink>
            </li>
          </>
        )}
        <UserMenu />
      </ul>
    </nav>
  );
}
