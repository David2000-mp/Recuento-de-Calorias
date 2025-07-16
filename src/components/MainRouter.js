import React from "react";
import { useAuth } from "./AuthProvider";
import Dashboard from "./dashboard/Dashboard";
import Login from "./Login";

export default function MainRouter() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Login />;
}
