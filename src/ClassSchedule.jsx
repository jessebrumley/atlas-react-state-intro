import { useContext } from "react";
import { EnrollmentContext } from "./App";

export default function ClassSchedule() {
  const { enrolledCourses, dropCourse } = useContext(EnrollmentContext);

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <tr key={course.courseNumber}>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>
                  <button onClick={() => dropCourse(course.courseNumber)}>
                    Drop
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No courses enrolled</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
