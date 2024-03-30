import { create } from "zustand";
import { ExpenseGroup } from "../utils/fetchUserExpenses";

type ExpensesStore = {
	expenses: ExpenseGroup[];
	setExpenses: (expenses: ExpenseGroup[]) => void;
};

export const useExpensesStore = create<ExpensesStore>((set) => ({
	expenses: [],
	setExpenses: (expenses: ExpenseGroup[]) => set({ expenses }),
}));

