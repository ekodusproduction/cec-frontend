import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import styles from "./Courses.module.css";
import axios from "../../api/axios";
import CourseItem from "./CourseItem";
import Loader from "../Loader/Loader";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

const Courses = ({ qualification }) => {
  const itemsPerPage = 5;
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      const response = await axios.get(
        `/api/course/qualification/${qualification}`,
        { headers }
      );
      const { data } = response.data;
      const filteredData = data.filter(
        (item) => item.qualificationType.value <= qualification
      );
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
      setCourses(filteredData);
      setLoading(false);
    };

    getCourses();
  }, [qualification]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Filter function to filter courses based on the search query (course name or code)
  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <Container>
      <section className={styles.courseList}>
        <div className={styles.headerContainer}>
          <h3 className={styles.heading}> Course List</h3>

          {/* Search bar */}

          <div className={styles.searchContainer}>
            <GoSearch />
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {displayedCourses.length > 0 ? (
              displayedCourses.map((item, idx) => (
                <CourseItem
                  key={item.courseCode}
                  item={item}
                  idx={startIndex + idx}
                />
              ))
            ) : (
              <p className={styles.noCourse}>No courses found.</p>
            )}
            <div className={styles.pagination}>
              <div
                onClick={() => handlePageChange(currentPage - 1)}
                className={`${
                  currentPage === 1 ? styles.disabled : styles.navigateBtn
                }`}
              >
                <BiChevronLeft size={22} />
              </div>
              <p>
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredCourses.length)} of{" "}
                {filteredCourses.length}
              </p>
              <div
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages
                    ? styles.disabled
                    : styles.navigateBtn
                }`}
              >
                <BiChevronRight size={22} />
              </div>
            </div>
          </>
        )}
      </section>
    </Container>
  );
};

export default Courses;
