import { Text, View } from "react-native"
import { ExpenseGroup } from "../utils/fetchUserExpenses";
import { useExpensesStore } from "../store/ExpensesStore";
import { BarChart, PieChart, barDataItem } from "react-native-gifted-charts";
import { useEffect, useState } from "react";

export function Stats() {
	const [expensesFromLastFiveDays, setExpensesFromLastFiveDays] = useState<barDataItem[]>([])
	const [pieGraphData, setPieGraphData] = useState<barDataItem[]>([])
	const [currentPiePercent, setCurrentPiePercent] = useState<number | null>(null)
	const [chartKey, setChartKey] = useState(0);

	const { expenses } = useExpensesStore()

	useEffect(() => {
		function totalExpensesForLastNDays(expenseGroups: ExpenseGroup[], days: number) {
			let dailyTotals = new Array(days).fill(0);
			const today = new Date();
			let labels = new Array(days).fill('').map((_, i) => {
				const targetDate = new Date(today);
				targetDate.setDate(targetDate.getDate() - i);
				return targetDate.getDate().toString();
			});

			expenseGroups.forEach(group => {
				group.expenses.forEach(expense => {
					const expenseDate = new Date(expense.date);
					const diffTime = today.getTime() - expenseDate.getTime();
					const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

					if (diffDays >= 0 && diffDays < days) {
						dailyTotals[diffDays] += expense.cost;
					}
				});
			});

			return dailyTotals.map((total, index) => ({
				value: total,
				label: labels[index]
			})).reverse();
		}

		function getPieChartData(expenseGroups: ExpenseGroup[]): { value: number, color: string }[] {
			const thirtyDaysAgo = new Date();
			thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

			// Aggregate expenses by category within the last 30 days
			const categoryTotals: Record<string, number> = {};
			let totalCost = 0;

			expenseGroups.forEach(group => {
				group.expenses.forEach(expense => {
					if (expense.date >= thirtyDaysAgo) {
						totalCost += expense.cost;
						categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.cost;
					}
				});
			});

			const pieData = Object.entries(categoryTotals).map(([color, cost]) => {
				const percentage = (cost / totalCost) * 100;
				return {
					value: percentage,
					color,
					text: `${percentage.toFixed(0)}%`
				};
			});

			return pieData;
		}

		const data = totalExpensesForLastNDays(expenses, 5);
		const pieData = getPieChartData(expenses)
		setExpensesFromLastFiveDays(data);
		setPieGraphData(pieData)

		setChartKey(chartKey + 1)


	}, [expenses]);

	return (
		<View className="px-6 pt-10">
			<Text className="font-bold mb-2">Gastos nos últimos 5 dias</Text>
			<BarChart key={chartKey} yAxisLabelPrefix="R$" yAxisTextStyle={{ marginRight: "auto" }} horizontalRulesStyle={{ marginLeft: 6 }} data={expensesFromLastFiveDays} />
			<Text className="font-bold mb-2 mt-6">% dos gastos totais por categoria no último mês</Text>
			<View className="relative">
				<PieChart
					data={pieGraphData}
					textColor="black"
					radius={150}
					textSize={16}
					focusOnPress
					onPress={(item, index) => { setCurrentPiePercent(item.text) }}
					donut
					centerLabelComponent={() => (
						<Text className="text-xl font-bold">{currentPiePercent}</Text>
					)
					}
					showValuesAsLabels
					showTextBackground
					textBackgroundRadius={20}

				/>
			</View>
		</View>
	)
}
