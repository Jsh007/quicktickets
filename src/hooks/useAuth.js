import { jwtDecode } from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.userInfo;
    // console.log(roles);
    isManager = roles?.includes("Manager");
    isAdmin = roles?.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    return { username, roles, isManager, isAdmin, status };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};

export default useAuth;
