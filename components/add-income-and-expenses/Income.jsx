import { Button, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";

export default function Income({ onToExpenses }) {

    const { register, control, watch } = useForm({
        defaultValues: {
            incomes: [{ name: "", amount: "", frequency: "Weekly" }]
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

    const fieldValues = watch()

    return (
        <VStack w={'100%'} align={'start'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>Add Your Income</Text>
            {fields.map((item, index) => {
                return (
                    <HStack w={'100%'} key={item.id}>
                        <Input placeholder="Name" {...register(`incomes.${index}.name`)} />
                        <Input type={'number'} step={'0.01'} min={"0.01"} placeholder="Amount" {...register(`incomes.${index}.amount`)} />
                        <Select {...register(`incomes.${index}.frequency`)}>
                            <option value='Weekly'>Weekly</option>
                            <option value='Bi-Monthly'>Bi-Monthly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Bi-Annually'>Bi-Annually</option>
                            <option value='Annually'>Annually</option>
                        </Select>
                        <Button w={'15rem'} colorScheme={'red'} onClick={() => remove(index)}>Remove</Button>
                    </HStack>
                )
            })}
            <Button onClick={() => append({ name: "", amount: "", frequency: "Weekly" })} isFullWidth>Add an Income</Button>
            <Button isFullWidth colorScheme={'blue'} onClick={() => onToExpenses(fieldValues)}>Continue to Expenses</Button>
        </VStack>
    )
}