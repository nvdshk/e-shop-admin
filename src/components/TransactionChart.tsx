import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'


interface IData { name: string, expense: number, income: number }

const data: Array<IData> = [
    {
        name: 'Jan',
        expense: 4000,
        income: 2400
    },
    {
        name: 'Feb',
        expense: 3000,
        income: 1398
    },
    {
        name: 'Mar',
        expense: 2000,
        income: 9800
    },
    {
        name: 'Apr',
        expense: 2780,
        income: 3908
    },
    {
        name: 'May',
        expense: 1890,
        income: 4800
    },
    {
        name: 'Jun',
        expense: 2390,
        income: 3800
    },
    {
        name: 'July',
        expense: 3490,
        income: 4300
    },
    {
        name: 'Aug',
        expense: 2000,
        income: 9800
    },
    {
        name: 'Sep',
        expense: 2780,
        income: 3908
    },
    {
        name: 'Oct',
        expense: 1890,
        income: 4800
    },
    {
        name: 'Nov',
        expense: 2390,
        income: 3800
    },
    {
        name: 'Dec',
        expense: 3490,
        income: 4300
    }
]

const TransactionChart = () => {
    return (
        <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Transactions</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="#0ea5e9" />
                        <Bar dataKey="expense" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer >
            </div>
        </div>
    )
}

export default TransactionChart