import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  if (error) {
    return <div>{error}</div>;
  }

  if (!expenditureDetails.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User ID: {userId}</h1>
      <h2>Expenditures:</h2>
      <ul>
        {expenditureDetails.map((expenditure, index) => (
          <li key={index}>
            <strong>Amount:</strong> {expenditure.amount} | <strong>Type:</strong> {expenditure.expenditureType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
