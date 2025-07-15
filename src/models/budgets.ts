




// id, user_id, budget_name, budget_icon, amount

export interface BudgetList {
    id: number | null,
    budget_name: string,
    budget_icon: string,
    budget_amount: number,
    total_items: number,
    total_expense_amount: number,
    date_created: number
}

export interface BudgetPost {
    id: number | null,
    budget_name: string,
    budget_icon: string,
    amount: number
}


export interface BudgetDetails {
  data: Data
  expenses: Expense[]
}

export interface Data {
  id: number
  budget_name: string
  budget_icon: string
  budget_amount: number
  total_expense_amount: number
  date_created: string
}

export interface Expense {
  id: number
  budget_id: number
  category_id: number
  date: string
  category_icon: string
  category_name: string
  description: string
  amount: number
  date_created: string
}
