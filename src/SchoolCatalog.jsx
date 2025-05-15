import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  
  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
  };

  const filteredCourses = courses.filter((course) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      course.courseNumber.toLowerCase().includes(lowerSearch) ||
      course.courseName.toLowerCase().includes(lowerSearch)
    );
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>
              Trimester{" "}
              {sortColumn === "trimester" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("courseNumber")}>
              Course Number{" "}
              {sortColumn === "courseNumber" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("courseName")}>
              Course Name{" "}
              {sortColumn === "courseName" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("semesterCredits")}>
              Semester Credits{" "}
              {sortColumn === "semesterCredits" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("totalClockHours")}>
              Total Clock Hours{" "}
              {sortColumn === "totalClockHours" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastRow >= sortedCourses.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
