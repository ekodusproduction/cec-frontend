import React from "react";
import styles from "./Home.module.css";
import ChartContainer from "../../components/Chart/Chart";
import Wiget from "../../components/Wiget/Wiget";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { indianDate } from "../../utils/index";

export const SuperAdminHome = () => {
  const [superAdminHome, setSuperAdminHome] = useState();
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/home/super", { headers });
        console.log(response.data.data);
        setSuperAdminHome(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch super admin Data");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const data = {
    options: {
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "student Registration",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 46, 89, 23, 46],
      },
      {
        name: "center registration",
        data: [23, 37, 62, 57, 34, 78, 34, 63, 43, 73, 29, 89],
      },
    ],
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.homePageContainer}>
          <h2 className={styles.heading}>Welcome Dipankar Dutta!</h2>
          <div className={styles.container}>
            <div className={styles.wigetContainer}>
              <Wiget
                heading="registration"
                value={superAdminHome?.totalNewStudentLastMonth}
                img="/images/student.png"
              />
              <Wiget
                heading="Total Centers"
                value={superAdminHome?.totalCenters}
                img="/images/center.png"
              />
              <Wiget
                heading="Total Students"
                value={superAdminHome?.totalStudents}
                img="/images/students.png"
              />
              <Wiget
                heading="Total Courses"
                value={superAdminHome?.totalCourses}
                img="/images/book.png"
              />
            </div>
            <div className={styles.tableContainer}>
              <ChartContainer data={data} />
              <div className={styles.notificationContainer}>
                <h2 className={styles.subHeading}>Recent Updates</h2>
                <div className={styles.notificationList}>
                  {superAdminHome &&
                    superAdminHome.fourNewStudentsLastMonth.map((item) => {
                      return (
                        <article key={item._id} className={styles.notification}>
                          <div className={styles.notificationContent}>
                            <h4 className={styles.centerName}>
                              {` ${item.centerId.centerName} ${item.centerId.centerCode}`}
                            </h4>
                            <p>
                              <span>{`${item.firstName} ${item.lastName}`}</span>
                            </p>
                            <p>{item.course[0].courseName}</p>
                          </div>
                          <div className={styles.dateContainer}>
                            <p>{indianDate(item.createdAt)}</p>
                          </div>
                        </article>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
