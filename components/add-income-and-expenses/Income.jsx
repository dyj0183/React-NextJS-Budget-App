import { useEffect } from "react";
import { Button, Container, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useForm, useFieldArray, Controller, useWatch, useFormState } from "react-hook-form";

export default function Income({ onToExpenses }) {

    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            incomes: [{ name: "", amount: "", period: "Weekly" }]
        }
    })

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "incomes"
    })

    const test = watch()

    return (
        <Container>
            <VStack align={'start'}>
                <Text fontSize={'4xl'} fontWeight={'bold'}>Add Your Income</Text>
                {fields.map((item, index) => {
                    return (
                        <HStack key={item.id}>
                            <Input placeholder="Name" {...register(`incomes.${index}.name`)} />
                            <Input placeholder="Amount" {...register(`incomes.${index}.amount`)} />
                            <Select {...register(`incomes.${index}.period`)}>
                                <option value='Weekly'>Weekly</option>
                                <option value='Monthly'>Monthly</option>
                                <option value='Bi-Monthly'>Bi-Monthly</option>
                            </Select>
                            <Button w={'15rem'} colorScheme={'red'} onClick={() => remove(index)}>Remove</Button>
                        </HStack>
                    )
                })}
                <Button onClick={() => append({ name: "", amount: "", period: "Weekly" })} isFullWidth>Add an Income</Button>
                <Button isFullWidth colorScheme={'blue'} onClick={() => onToExpenses(test)}>Continue to Expenses</Button>
            </VStack>
        </Container>
    )
}