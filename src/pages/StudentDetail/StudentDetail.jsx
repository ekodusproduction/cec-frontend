import styles from "./StudentDetail.module.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { TabView, TabPanel } from "primereact/tabview";
import { indianDate } from "../../utils/index";
import Button from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router";

const StudentDetail = () => {
  const [student, setStudent] = useState("");
  const [loading, setLoading] = useState(false);
  const { roll } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      const response = await axios.get(`api/student/roll/${roll}`, { headers });
      console.log(response);
      const data = response.data.data;
      setStudent(data);
      setLoading(false);
    };

    try {
      fetchStudentData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const navigateHandler = () => {
    navigate("edit", { state: student });
  };

  return (
    <section>
      {loading && <Loader />}
      {student && !loading && (
        <>
          <Link to="/student" className="backLink">
            <BsArrowLeft />
            Go Back
          </Link>
          <section className={styles.studentContainer}>
            <article className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={`${student.image || "/images/students.png"}`}
                  alt="student Image"
                  className={styles.studentImg}
                />
              </div>
              <div className={styles.basicCard}>
                <p className={styles.info}>
                  First Name:<span>{student.firstName}</span>
                </p>
                <p className={styles.info}>
                  Last Name:<span> {student.lastName}</span>
                </p>
                <p className={styles.info}>
                  Roll Number :<span> {student.rollNumber} </span>
                </p>

                <p className={styles.info}>
                  Reg Date:<span>{`${indianDate(student.createdAt)}`}</span>
                </p>
                <p className={styles.info}>
                  Course Name
                  {student.course.map((item, idx) => (
                    <span key={idx}>{item.courseName}</span>
                  ))}
                </p>
                <p className={styles.info}>
                  Course Code:
                  {student.course.map((item, idx) => (
                    <span key={idx}>{item.courseCode}</span>
                  ))}
                </p>
                <p className={styles.info}>
                  Center:<span>{student.centerId.centerName}</span>
                </p>
              </div>
            </article>
            <div className={styles.infoTable}>
              <TabView>
                <TabPanel header="Personal">
                  <div>
                    <p className={styles.info}>
                      Gender:<span>{student.gender || "__"}</span>
                    </p>
                    <p className={styles.info}>
                      DOB:<span>{`${indianDate(student.DOB)}`} </span>
                    </p>
                    <p className={styles.info}>
                      Phone No:<span>{student.mobile} </span>
                    </p>
                    <p className={styles.info}>
                      Emergency Phone No:
                      <span>{student.emergencyContact || "__"} </span>
                    </p>
                    <p className={styles.info}>
                      Father Name:
                      <span>{student.fathersName || "__"}</span>
                    </p>
                    <p className={styles.info}>
                      Mother Name:
                      <span>{student.mothersName || "__"}</span>
                    </p>
                    <p className={styles.info}>
                      Blood Group:
                      <span>{student.bloodGroup || "__"}</span>
                    </p>
                  </div>
                </TabPanel>

                <TabPanel header="Contact">
                  <div className={styles.section}>
                    <h3 className={styles.sectionHeading}>Present Address</h3>
                    <div>
                      <p className={styles.info}>
                        Address: <span>{student.presentAddress}</span>
                      </p>
                      <p className={styles.info}>
                        City :<span>{student.cityPresent}</span>
                      </p>
                      <p className={styles.info}>
                        State:<span>{student.statePresent}</span>
                      </p>
                      <p className={styles.info}>
                        Pincode:<span>{student.pinCodePresent}</span>
                      </p>
                    </div>
                  </div>

                  {/* <div className={styles.section}>
                    <h3 className={styles.sectionHeading}>Pramanent Address</h3>
                    <div>
                      <p className={styles.info}>
                        Address: <span>{student.permanentAddress}</span>
                      </p>
                      <p className={styles.info}>
                        City :<span>{student.cityPermanent}</span>
                      </p>
                      <p className={styles.info}>
                        State:<span> {student.statePermanent}</span>
                      </p>
                      <p className={styles.info}>
                        Pincode:<span> {student.pinCodePermanent}</span>
                      </p>
                    </div>
                  </div> */}
                </TabPanel>

                <TabPanel header="Education">
                  <p className={styles.info}>
                    Qualification:
                    <span>{student.qualification.qualification || "__"}</span>
                  </p>
                  <p className={styles.info}>
                    Year of Passing:<span>{student.year || "__"}</span>
                  </p>
                  <p className={styles.info}>
                    University/Board:<span>{student.institute || "__"} </span>
                  </p>
                  <p className={styles.info}>
                    Division/Grade:<span>{student.grade || "__"} </span>
                  </p>
                  <p className={styles.info}>
                    Percentage:<span>{student.percentage || "__"} </span>
                  </p>
                </TabPanel>

                <TabPanel header="Documents">
                  <div className={styles.documents}>
                    <h3 className={styles.sectionHeading}>Student Documents</h3>
                    {/* <ImageSlider images={images} /> */}
                    <article className={styles.documentsContainer}>
                      <div className={styles.document}>
                        <h3>Address Proof</h3>
                        {student?.addressProof ? (
                          <a
                            target="_blank"
                            href={`http://139.59.83.187${student.addressProof}`}
                          >
                            View
                          </a>
                        ) : (
                          <span>Not Uploaded</span>
                        )}
                      </div>
                      <div className={styles.document}>
                        <h3>ID Proof</h3>
                        {student?.idProof ? (
                          <a
                            href={`http://139.59.83.187${student.idProof}`}
                            target="_blank"
                          >
                            View
                          </a>
                        ) : (
                          <span>Not Uploaded</span>
                        )}
                      </div>
                      <div className={styles.document}>
                        <h3>Academic Certificate</h3>
                        {student?.academicCertificates ? (
                          <a
                            target="_blank"
                            href={`http://139.59.83.187${student.academicCertificates}`}
                          >
                            View
                          </a>
                        ) : (
                          <span>Not Uploaded</span>
                        )}
                      </div>
                    </article>
                  </div>
                </TabPanel>
              </TabView>
            </div>

            <div className={styles.btnContainer}>
              {!student.isProfileComplete && (
                <Link to="studentdetails">
                  <Button>Add Students Details</Button>
                </Link>
              )}

              <Button onClick={navigateHandler}>Edit Student </Button>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default StudentDetail;
