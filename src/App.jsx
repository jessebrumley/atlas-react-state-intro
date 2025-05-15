import { createContext, useState } from "react";
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";

export const EnrollmentContext = createContext();

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    if (!enrolledCourses.find((c) => c.courseNumber === course.courseNumber)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prev) =>
      prev.filter((c) => c.courseNumber !== courseNumber)
    );
  };

  return (
    <EnrollmentContext.Provider
      value={{ enrolledCourses, enrollCourse, dropCourse }}
    >
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
    </EnrollmentContext.Provider>
  );
}
