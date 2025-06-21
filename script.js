document.addEventListener("DOMContentLoaded", () => {
  const setBudgetBtn = document.getElementById("set-budget-btn");
  const budgetValue = document.getElementById("budget-value");
  const remainingOutput = document.querySelector(".remaining-balance p:last-child");
  const expenseList = document.getElementById("expense-list");
  const addExpenseBtn = document.getElementById("add-expense-btn");
  const transactionList = document.getElementById("transaction-history-list");
  const addPlanBtn = document.getElementById("add-plan-btn");
  const planList = document.getElementById("plan-list");
  const addSavingsBtn = document.getElementById("add-savings-btn");
  const savingsTotal = document.getElementById("savings-total");
  const resetBtn = document.querySelector(".reset-btn"); // Updated selector

  
  // Update UI Functions

  function updateBudgetUI() {
    const budget = parseFloat(localStorage.getItem("monthlyBudget")) || 0;
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

    budgetValue.textContent = `Budget: ₹${budget}`;
    remainingOutput.textContent = `Remaining: ₹${budget - totalSpent}`;
  }

  function updateExpenseList() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenseList.innerHTML = "";

    expenses.slice().reverse().forEach(exp => {
      const li = document.createElement("li");
      li.textContent = `₹${exp.amount} - ${exp.desc}`;
      expenseList.appendChild(li);
    });
  }

  function updateTransactionHistory() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    transactionList.innerHTML = "";

    expenses.slice().reverse().forEach(t => {
      const li = document.createElement("li");
      li.textContent = `${new Date(t.date).toLocaleDateString()} - ₹${t.amount} - ${t.desc}`;
      transactionList.appendChild(li);
    });
  }

  function updatePlannedExpenses() {
    const plans = JSON.parse(localStorage.getItem("plans")) || [];
    planList.innerHTML = "";

    plans.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.category}: ₹${p.amount}`;
      planList.appendChild(li);
    });
  }

  function updateSavings() {
    const savings = JSON.parse(localStorage.getItem("savings")) || [];
    const total = savings.reduce((sum, val) => sum + val.amount, 0);
    savingsTotal.textContent = `Total Saved: ₹${total}`;
  }

  // Event Handlers

  setBudgetBtn.addEventListener("click", () => {
    const input = prompt("Enter your monthly budget:");
    const value = parseFloat(input);

    if (!isNaN(value) && value > 0) {
      localStorage.setItem("monthlyBudget", value);
      updateBudgetUI();
    } else {
      alert("Please enter a valid budget.");
    }
  });

  addExpenseBtn.addEventListener("click", () => {
    const amount = parseFloat(prompt("Enter expense amount:"));
    const desc = prompt("Enter description:");

    if (!isNaN(amount) && amount > 0 && desc) {
      const newExpense = {
        amount,
        desc,
        date: new Date().toISOString()
      };

      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));

      updateExpenseList();
      updateTransactionHistory();
      updateBudgetUI();
    } else {
      alert("Invalid input.");
    }
  });

  addPlanBtn.addEventListener("click", () => {
    const category = prompt("Enter planned expense category:");
    const amount = parseFloat(prompt("Enter amount for the category:"));

    if (category && !isNaN(amount) && amount > 0) {
      const plans = JSON.parse(localStorage.getItem("plans")) || [];
      plans.push({ category, amount });
      localStorage.setItem("plans", JSON.stringify(plans));
      updatePlannedExpenses();
    } else {
      alert("Invalid input.");
    }
  });

  addSavingsBtn.addEventListener("click", () => {
    const amount = parseFloat(prompt("Enter savings for this month:"));

    if (!isNaN(amount) && amount > 0) {
      const savings = JSON.parse(localStorage.getItem("savings")) || [];
      savings.push({ amount, date: new Date().toISOString() });
      localStorage.setItem("savings", JSON.stringify(savings));
      updateSavings();
    } else {
      alert("Invalid amount.");
    }
  });

  
  // Reset Button Handler
  
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all data?")) {
        localStorage.clear();
        updateBudgetUI();
        updateExpenseList();
        updateTransactionHistory();
        updatePlannedExpenses();
        updateSavings();
        alert("All data has been reset.");
      }
    });
  }

  
  // Init on Load

  updateBudgetUI();
  updateExpenseList();
  updateTransactionHistory();
  updatePlannedExpenses();
  updateSavings();
  
  const menuToggle = document.getElementById('menu-toggle');
const mobileSidebar = document.getElementById('mobile-sidebar');

menuToggle.addEventListener('click', () => {
  mobileSidebar.classList.toggle('active');
});

});












