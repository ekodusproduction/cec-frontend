import styles from "./CenterDetail.module.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../components/Loader/Loader";
import { TabView, TabPanel } from "primereact/tabview";
import { indianDate } from "../../utils/index";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const CenterDetail = () => {
  const { id } = useParams();
  const [center, setCenter] = useState([]);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchCenterData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`api/center/${id}`, { headers });
        const data = response.data.data;
        setCenter(data);
      } catch (err) {
        console.log("Opps something went wrong!!");
      } finally {
        setLoading(false);
      }
    };

    fetchCenterData();
  }, []);

  const editCenterHandler = () => {
    naviagte("edit_center", { state: center });
  };

  const editAdminHandler = () => {
    naviagte("edit_center_admin", { state: center });
  };

  const passwordHandler = () => {
    naviagte("changepassword", { state: center });
  };

  return (
    <>
      <Link to="/centers" className="backLink">
        <BsArrowLeft />
        Go Back
      </Link>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.centerPageContainer}>
          <article className={styles.card}>
            <div className={styles.centerImageContainer}>
              <img
                src="/images/CenterAdminPic.png"
                alt=""
                className={styles.centerImg}
              />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.info}>
                Center Name: <span>{center.centerName}</span>
              </p>
              <p className={styles.info}>
                Registration Date:{" "}
                <span>{`${indianDate(center.dateofReg)}`}</span>
              </p>
              <p className={styles.info}>
                Center Code: <span>{center.centerCode}</span>
              </p>
              <p className={styles.info}>
                Total Students: <span>{center.totalStudent}</span>
              </p>
              <p className={styles.info}>
                District: <span>{center.district}</span>
              </p>
            </div>
          </article>

          <section className={styles.tabTable}>
            <TabView className={styles.tableContainer}>
              <TabPanel header=" Admin Info" className={styles.container}>
                {center.headOfInstitute && (
                  <p className={styles.info}>
                    Center Admin Name:{" "}
                    <span>{center.headOfInstitute.adminName}</span>
                  </p>
                )}

                {center.headOfInstitute && (
                  <p className={styles.info}>
                    Mobile: <span>{center.headOfInstitute.mobile}</span>
                  </p>
                )}
                {center.headOfInstitute && (
                  <p className={styles.info}>
                    Email: <span>{center.headOfInstitute.email}</span>
                  </p>
                )}

                {center.headOfInstitute && (
                  <p className={styles.info}>
                    Alternate Number:{" "}
                    <span>{center.headOfInstitute.alternateNumber}</span>
                  </p>
                )}
                {center.headOfInstitute && (
                  <p className={styles.info}>
                    Pin Code: <span>{center.headOfInstitute.pinCode}</span>
                  </p>
                )}
                {center.headOfInstitute && (
                  <p className={styles.info}>
                    Address: <span>{center.headOfInstitute.address}</span>
                  </p>
                )}
                {center.headOfInstitute && (
                  <p className={styles.info}>
                    District: <span>{center.headOfInstitute.district}</span>
                  </p>
                )}
              </TabPanel>

              <TabPanel header="Contact" className={styles.container}>
                <p className={styles.info}>
                  Center address: <span>{center.address}</span>
                </p>
                <p className={styles.info}>
                  Center alternate Number: <span>{center.alternateNumber}</span>
                </p>
                <p className={styles.info}>
                  Pin code:
                  <span>{center.pinCode}</span>
                </p>
                <p className={styles.info}>
                  State:
                  <span>{center.state}</span>
                </p>
                <p className={styles.info}>
                  Landmark:
                  <span>{center.landmark}</span>
                </p>
                <p className={styles.info}>
                  Email:
                  <span>{center.email}</span>
                </p>
                <p className={styles.info}>
                  WhatsApp Number:
                  <span>{center.whatsApp}</span>
                </p>
              </TabPanel>
            </TabView>
          </section>

          <div className={styles.btnContainer}>
            <Button onClick={editCenterHandler}>Edit Center Details</Button>
            <Button onClick={editAdminHandler}>Edit Admin Details</Button>
            <Button onClick={passwordHandler}>
              Change Center Login Password
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default CenterDetail;
