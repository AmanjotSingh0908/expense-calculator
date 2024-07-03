import { useRouter } from "next/router";
import { motion } from "framer-motion";
import styles from "@/styles/expense.module.css";
import Select from "react-select";
import { toastMessage } from "@/utils/toasts/toasts";
import { BeatLoader } from "@/components/loader/loader";
import { useCallback, useState } from "react";
import axios from "axios";
// import { response } from "express";

const options = [
  { value: "health_insurance", label: "Health Insurance" },
  { value: "insurance", label: "Insurance" },
  { value: "subscriptions", label: "Subscriptions" },
  { value: "transportation", label: "Transportation" },
  { value: "utilities", label: "Utilities" },
  { value: "cellphone", label: "Cellphone" },
  { value: "entertainment", label: "Entertainment" },
  { value: "groceries", label: "Groceries" },
  { value: "cable", label: "Cable" },
  { value: "emergency_fund", label: "Emergency Fund" },
  { value: "housing", label: "Housing" },
  { value: "repairs", label: "Repairs" },
  { value: "clothes", label: "Clothes" },
  { value: "education", label: "Education" },
  { value: "living_expenses", label: "Living Expenses" },
  { value: "pet_care", label: "Pet Care" },
  { value: "retirement", label: "Retirement" },
  { value: "bank_fees", label: "Bank Fees" },
  { value: "business_meals", label: "Business Meals" },
  { value: "car_payment", label: "Car Payment" },
  { value: "car_registration", label: "Car Registration" },
  { value: "travel", label: "Travel/Fuel" },
  { value: "gas", label: "Gas" },
  { value: "gifts", label: "Gifts" },
  { value: "others", label: "Others" },
];

export default function AddExpense() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [expenseOption, setExpenseOption] = useState(options[0]);
  const [expenseMoneySpent, setexpenseMoneySpent] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setExpenseOption("");
    setexpenseMoneySpent("");
  };

  const validateData = useCallback(() => {
    if (!expenseMoneySpent || isNaN(parseFloat(expenseMoneySpent)))
      return {
        isValid: false,
        msg: "Expense amount and option must be valid",
      };
    if (expenseMoneySpent.length < 1 || expenseMoneySpent.length > 8) {
      // console.log("Hello inside validate data");
      return {
        isValid: false,
        msg: "Either the amount is too short or you exceeded the word limit!",
      };
    }
    return { isValid: true, msg: null };
  }, [expenseMoneySpent]);

  const handleAdd = useCallback(() => {
    const isDataValid = validateData();
    // console.log(isDataValid);
    if (!isDataValid?.isValid) {
      // "?" intially isValid undefined hai but it will be defined later on...so code waits for it to get the value
      return toastMessage.warning(isDataValid?.msg);
    }
    setLoading(true);
    if (expenseMoneySpent && expenseOption) {
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { option: expenseOption, amount: parseFloat(expenseMoneySpent) },
      ]);
      console.log(expenses);
      setexpenseMoneySpent("");
      setExpenseOption(options[0]);
    }
    setLoading(false);
    toastMessage.info("Expense is added");
    return;
  }, [expenseOption, expenseMoneySpent]);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const promises = expenses.map(async (expense) => {
        const { option, amount } = expense;
        const response = await axios.post("http://localhost:5002/users/expense", {
          userId: userName,
          password: userPassword,
          expenditures: [{
            amount: amount,
            expenditure: option.label
        }]
      });
        return response.data;
      });

      const results = await Promise.all(promises);
      console.log("All expenses submitted:", results);
      toastMessage.success("Expenses submitted successfully");
    } catch (error) {
      console.error("Error submitting expenses:", error);
      toastMessage.error("Server error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <motion.div
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
          className={styles.box}
        >
          <textarea
            className={styles.UserIdColumn}
            rows={5}
            placeholder="Enter Email ID (required for OTP verification later)"
            onChange={(e) => setUserName(e.target.value)}
          ></textarea>
          <input
            className={styles.UserPasswordColumn}
            rows={5}
            placeholder="Set your password"
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
          ></input>
          <hr></hr>
          <Select
            options={options}
            value={expenseOption}
            onChange={(expenseOption) => setExpenseOption(expenseOption)}
            className={styles.ExpenseSelection}
          />
          <textarea
            className={styles.textarea}
            value={expenseMoneySpent}
            onChange={(e) => setexpenseMoneySpent(e.target.value)}
            rows={5}
            placeholder="Enter expenditure amount"
          ></textarea>
          <div className={styles.btnGroup}>
            <button
              onClick={() => router.push("/")}
              className={`${styles.backBtn} ${styles.commonBtn}`}
            >
              Back
            </button>
            <button
              onClick={handleClear}
              className={`${styles.clearBtn} ${styles.commonBtn}`}
            >
              Clear
            </button>
            <button
              onClick={handleAdd}
              className={`${styles.publishBtn} ${styles.commonBtn}`}
            >
              {!loading ? "Add" : <BeatLoader />}
            </button>
          </div>
        </motion.div>
      </div>
      <div className={`${styles.expensesContainer}`}>
        <div className={`${styles.expenseList}`}>
          <h2>Expenses List</h2>
          {expenses.map((expense, index) => (
            <div key={index} className={`${styles.eachExpense}`}>
              {/* {} will not retrun HTMl  it will return JS...to return HTML use () or leave it as it is */}
              <p>
                {expense.option.label}: {expense.amount} INR{" "}
                <button
                  onClick={() => handleDelete(index)}
                  className={`${styles.deleteBtn}`}
                >
                  🗑
                </button>
              </p>
            </div>
          ))}
        </div>
        <hr></hr>
        {expenses.length > 0 && (
          <div className={styles.Total}>
            <div>
              <h3>Total: {totalExpenses} INR</h3>
            </div>
            <div className={`${styles.submitContainer}`}>
              <button
                onClick={handleSubmit}
                className={`${styles.submitButton} ${styles.commonBtn}`}
              >
                {!loading ? "Submit" : <BeatLoader />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
