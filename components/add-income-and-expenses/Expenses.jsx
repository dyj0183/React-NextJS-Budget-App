import { Button, HStack, Input, Text, VStack, Select, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReactSelect from "react-select/creatable";

export default function Expenses({ onFinish, onBack }) {

    const [categories, setCategories] = useState([])

    const { register, control, watch } = useForm({
        defaultValues: {
            expenses: [{ name: "", amount: "", frequency: "Weekly", category: "Category" }]
        }
    })

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "expenses"
    })

    const fieldValues = watch()

    return (
        <VStack align={'start'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>Add Your Expenses</Text>
            {fields.map((item, index) => {
                return (
                    <HStack key={item.id}>
                        <Input flexGrow={'1'} placeholder="Name" {...register(`expenses.${index}.name`)} />
                        <Input placeholder="Amount" {...register(`expenses.${index}.amount`)} />
                        <Select {...register(`expenses.${index}.frequency`)} >
                            <option value='Weekly'>Weekly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Bi-Monthly'>Bi-Monthly</option>
                        </Select>
                        <Box flexBasis={'100%'}>
                            <ReactSelect
                                onCreateOption={(category) => setCategories(prev => [...prev, { label: category, value: category }])}
                                options={categories}
                            />
                        </Box>
                        <Button w={'15rem'} colorScheme={'red'} onClick={() => remove(index)}>Remove</Button>
                    </HStack>
                )
            })}
            <Button onClick={() => append({ name: "", amount: "", frequency: "Weekly" })} isFullWidth>Add an Expense</Button>
            <HStack w={'100%'} justify={'space-between'}>
                <Button isFullWidth onClick={onBack}>Back</Button>
                <Button isFullWidth colorScheme={'blue'} onClick={() => onFinish(fieldValues)}>Finish</Button>
            </HStack>
        </VStack>
    )
}