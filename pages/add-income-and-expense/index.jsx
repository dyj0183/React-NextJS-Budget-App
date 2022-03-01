import { Center } from "@chakra-ui/react";
import { useState } from "react";
import Expenses from "../../components/add-income-and-expenses/Expenses";
import Income from "../../components/add-income-and-expenses/Income";

export default function AddIncomeAndExpense() {

    const [page, setPage] = useState('income')

    const onToExpenses = () => {
        setPage('expenses')
    }

    const onBack = () => {
        setPage('income')
    }

    const onFinish = () => {
        console.log("finsh")
    }


    const currentPage = page == 'income' ? <Income onToExpenses={onToExpenses} /> : <Expenses onFinish={onFinish} onBack={onBack} />;

    return (
        <Center h={'80vh'}>
            {currentPage}
        </Center>
    )
}