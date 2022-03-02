import { Center } from "@chakra-ui/react";
import { useState } from "react";
import Expenses from "../../components/add-income-and-expenses/Expenses";
import Income from "../../components/add-income-and-expenses/Income";
import Show from "../../components/utility/Show";

export default function AddIncomeAndExpense() {

    const [page, setPage] = useState('income')

    const onToExpenses = (result) => {
        console.log(result)
        setPage('expenses')
    }

    const onBack = () => {
        setPage('income')
    }

    const onFinish = () => {
        console.log("finsh")
    }

    return (
        <Center h={'80vh'}>
            <Show show={page == 'income'}>
                <Income onToExpenses={onToExpenses} />
            </Show>
            <Show show={page == 'expenses'}>
                <Expenses onFinish={onFinish} onBack={onBack} />
            </Show>
        </Center>
    )
}