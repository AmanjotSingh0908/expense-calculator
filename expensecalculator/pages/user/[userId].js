import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "@/styles/userpage.module.css";
import ApexCharts from 'apexcharts';

const UserPage = () => {
  const router = useRouter();
  const { userId, userData: userDataQuery } = router.query;
  const [expenditureDetails, setExpenditureDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !userDataQuery) return;

    try {
      const userData = JSON.parse(userDataQuery);
      setExpenditureDetails(userData.expenditureDetails);
    } catch (error) {
      setError('Error parsing user data');
    }
  }, [userId, userDataQuery]);

  useEffect(() => {
    if (expenditureDetails.length) {
      const groupedData = expenditureDetails.reduce((acc, curr) => {
        const { expenditureType, amount } = curr;
        if (!acc[expenditureType]) {
          acc[expenditureType] = 0;
        }
        acc[expenditureType] += amount;
        return acc;
      }, {});

      const series = Object.values(groupedData);
      const labels = Object.keys(groupedData);

      const options = {
        chart: {
          type: 'donut',
        },
        series: series,
        labels: labels,
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
        },
        
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '16px',
                },
                value: {
                  show: true,
                  fontSize: '14px',
                },
              },
            },
            expandOnClick: false,
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      };

      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [expenditureDetails]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!expenditureDetails.length) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.userExpenseContainer}>
        <h1 className={styles.h1}>Username: {userId}</h1>
        <h2 className={styles.h2}>Expenditures:</h2>
        <ul className={styles.ul}>
          {Object.entries(expenditureDetails.reduce((acc, curr) => {
            const { expenditureType, amount } = curr;
            if (!acc[expenditureType]) acc[expenditureType] = 0;
            acc[expenditureType] += amount;
            return acc;
          }, {})).map(([type, amount], index) => (
            <li key={index} className={styles.li}>
              <strong>{type}:</strong> {amount.toFixed(2)} INR
            </li>
          ))}
        </ul>
      </div>
      <div id='chart' className={styles.expenseChart}></div>
    </div>
  );
};

export default UserPage;
