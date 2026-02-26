import * as React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-md text-sm font-medium transition",
          isActive
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
};

export function TopNav() {
  return (
    <header className="absolute top-0 left-0 z-[1001] w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto w-full px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-semibold tracking-tight">Ctrl + F(ood)</div>
        </div>

        <nav className="flex items-center gap-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/spin">Spin Wheel</NavItem>
          <NavItem to="/profile">Profile</NavItem>
        </nav>
      </div>
    </header>
  );
}