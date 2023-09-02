import React from "react";
import styles from "./Home.module.css";
import ChartContainer from "../../components/Chart/Chart";
import Wiget from "../../components/Wiget/Wiget";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader/Loader";

export const CenterAdminHome = () => {
  const [centerData, setCenterData] = useState();
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/home/center`, { headers });
        console.log(response.data.data);
        setCenterData(response.data.data);
      } catch (error) {
        console.log(error);
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
    ],
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.aboutPageContainer}>
          <h2 className={styles.heading}>Welcome Admin!</h2>
          <div className={styles.container}>
            <div className={styles.wigetContainer}>
              <Wiget
                heading="registration"
                value={centerData?.newStudentsLastMonth}
                img="/images/student.png"
              />
              <Wiget
                heading="Total Students"
                value={centerData?.totalStudents}
                img="/images/students.png"
              />
            </div>
            <ChartContainer data={data} />
          </div>
        </section>
      )}
    </>
  );
};
