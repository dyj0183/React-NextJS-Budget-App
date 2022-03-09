import { Button, HStack, Input, Text, VStack, Select, Box } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
        <VStack w={'100%'} align={'start'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>Add Your Expenses</Text>
            {fields.map((item, index) => {
                return (
                    <HStack w={'100%'} key={item.id}>
                        <Input flexGrow={'1'} placeholder="Name" {...register(`expenses.${index}.name`)} />
                        <Input type={'number'} step={'0.01'} min={"0.01"} placeholder="Amount" {...register(`expenses.${index}.amount`)} />
                        <Select {...register(`expenses.${index}.frequency`)} >
                            <option value='Weekly'>Weekly</option>
                            <option value='Bi-Monthly'>Bi-Monthly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Bi-Annually'>Bi-Annually</option>
                            <option value='Annually'>Annually</option>
                        </Select>
                        <Box flexBasis={'100%'}>
                            <Controller control={control} name={`expenses.${index}.category`} render={({ field: { onChange, onBlur, value } }) => (
                                <ReactSelect
                                    onCreateOption={(category) => setCategories(prev => [...prev, { label: category, value: category }])}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    options={categories}
                                />
                            )}
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