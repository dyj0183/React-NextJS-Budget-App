import { Center, Container } from "@chakra-ui/react";
import { useState } from "react";
import Expenses from "../../components/add-income-and-expenses/Expenses";
import Income from "../../components/add-income-and-expenses/Income";
import Show from "../../components/utility/Show";

export default function AddIncomeAndExpense() {

    const [page, setPage] = useState('income')
    const [data, setData] = useState({})

    const onToExpenses = (result) => {
        console.log(result)
        setData(prev => {
            return {
                ...prev,
                ...result
            }
        })
        setPage('expenses')
    }
    
    const onFinish = (result) => {
        console.log(result)
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