import { useContext } from "react";
import { EnrollmentContext } from "./App";
import logo from "./assets/logo.png";

export default function Header() {
  const { enrolledCourses } = useContext(EnrollmentContext);

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
