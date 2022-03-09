import { Center, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Expenses from "../../components/add-income-and-expenses/Expenses";
import Income from "../../components/add-income-and-expenses/Income";
import Show from "../../components/utility/Show";
import { useAtom } from 'jotai';
import { userIdAtom } from '../../store/atom'

export default function AddIncomeAndExpense() {

    const [page, setPage] = useState('income')
    const [data, setData] = useState({})
    const [userId] = useAtom(userIdAtom)

    const onToExpenses = (result) => {
        setData(prev => {
            return {
                ...prev,
                ...result
            }
        })
        setPage('expenses')
    }

    const onFinish = async (result) => {
        setData(prev => {
            return {
                ...prev,
                ...result
            }
        })
    }

    const onBack = () => {
        setPage('income')
    }

    useEffect(() => {

        console.log(userId)

        if (!(data.incomes && data.expenses && userId)) return

        const expenses = data.expenses.map(expense => {
            return {
                ...expense,
                category: expense.category.value
            }
        })

        fetch('/api/insert-incomes-and-expenses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, expenses, userId }) })
            .then(() => {
                // TODO: navigate to summary
            })
            .catch((err) => {
                console.error(err)
            })
    }, [data, userId])

    return (
        <Container maxW='container.lg'>
            <Center h={'80vh'}>
                <Show show={page == 'income'}>
                    <Income onToExpenses={onToExpenses} />
                </Show>
                <Show show={page == 'expenses'}>
                    <Expenses onFinish={onFinish} onBack={onBack} />
                </Show>
            </Center>
        </Container>
    )
}