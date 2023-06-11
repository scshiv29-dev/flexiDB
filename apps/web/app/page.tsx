"use client";
import { DashBoard, useAuth } from "@flexidb/ui";
import LoginPage from "./login";

export default function Page() {
  const { isLoggedIn } = useAuth();

  return <div>{!isLoggedIn ? <LoginPage /> : <DashBoard />}</div>;
}
