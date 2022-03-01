import { Button, Container, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";

export default function Income({ onToExpenses }) {
    return (
        <Container>
            <VStack align={'start'}>
                <Text fontSize={'4xl'} fontWeight={'bold'}>Add Your Income</Text>
                <HStack>
                    <Input placeholder="Name" />
                    <Input placeholder="Amount" />
                    <Select>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                        <option value='Bi-Monthly'>Bi-Monthly</option>
                    </Select>
                </HStack>
                <HStack w={'100%'} justify={'end'}>
                    <Button colorScheme={'blue'} onClick={onToExpenses}>Continue to Expenses</Button>
                </HStack>
            </VStack>
        </Container>
    )
}