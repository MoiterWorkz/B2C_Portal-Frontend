import { User, Lock, Database, Palette, Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import DashBoardHooks from "../../../hooks/dashBoardHooks";

const UserDropdown = ({ user }) => {
  const { dashBoardData } = DashBoardHooks();

  const navigate = useNavigate(); // ✅ Initialize navigate
  const username = user?.name || dashBoardData?.customerName || "";
  const email = user?.email || "";
  const handleLogout = () => {
    localStorage.removeItem("customerId");
    navigate("/");
  };

  const handleNavigate = (to) => {
    navigate(to); // Navigate to the page
  };

  return (
    <div className="bg-popover text-popover-foreground z-50 w-56 rounded-md border p-2 shadow-md dropdown-glass card-bg-br UserDropdown">
      {/* User Info */}
      <div className="flex flex-col space-y-1 p-2 main">
        <p className="text-sm font-medium leading-none name">{username}</p>
        <p className="text-xs leading-none text-muted-foreground mail">
          {email}
        </p>
      </div>

      <div className="bg-border -mx-1 my-1 h-px" />

      {/* Menu Items */}
      <div className="flex flex-col">
        <DropdownItem
          icon={<User size={15} />}
          label="My Profile"
          onClick={() => handleNavigate("/MyProfile")}
        />
        <DropdownItem
          icon={<Lock size={15} />}
          label="Change Pin"
          onClick={() => handleNavigate("/change-pin")}
        />
        <DropdownItem
          icon={<Database size={15} />}
          label="Data Recovery"
          onClick={() => handleNavigate("/data-recovery")}
        />
        <DropdownItem
          icon={<Palette size={15} />}
          label="Style Sheet"
          onClick={() => handleNavigate("/styles")}
        />
        <DropdownItem
          icon={<Home size={15} />}
          label="Back to Landing"
          onClick={() => handleNavigate("/")}
        />
      </div>

      <div className="bg-border -mx-1 my-1 h-px" />

      {/* Logout */}
      <DropdownItem
        icon={<LogOut size={15} />}
        label="Logout"
        onClick={handleLogout}
        destructive
      />
    </div>
  );
};

const DropdownItem = ({ icon, label, onClick, destructive = false }) => {
  return (
    <div
      role="menuitem"
      data-slot="dropdown-menu-item"
      className={`cursor-pointer flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none
        ${destructive ? "logout-item text-destructive" : ""}`}
      onClick={onClick}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default UserDropdown;
