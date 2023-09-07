import Chart from "react-apexcharts";
import styles from "./Chart.module.css";

const ChartContainer = ({data}) => {
  return (
    <section className={styles.chartContainer}>
      <h3 className={styles.heading}>Total Registrations</h3>
      <article>
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          width="100%"
          className={styles.chart}
        />
      </article>
    </section>
  );
};

export default ChartContainer;
