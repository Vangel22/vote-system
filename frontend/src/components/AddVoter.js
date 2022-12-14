import { HStack, Button, Input, Text, useColorMode } from '@chakra-ui/react'

const AddVoter = ({ newVoter, setNewVoter, addNewVoter, newVoterStatus }) => {
  const { colorMode } = useColorMode()

  const handleNewVoter = (e) => {
    setNewVoter(e.target.value)
  }

  return (
    <HStack w="full" h="full">
      <Text>
        Give right to vote <br />
        (only chairman can give vote right)
      </Text>
      <HStack w="full" display="flex" justify="space-between">
        <Input
          placeholder="Enter the user address"
          bg={colorMode === 'light' ? 'white' : 'whiteAlpha.400'}
          value={newVoter}
          onChange={handleNewVoter}
        />
        <Button size="md" colorScheme="orange" onClick={addNewVoter}>
          Give right
        </Button>
      </HStack>
      {newVoterStatus && <p>Status: {newVoterStatus}</p>}
    </HStack>
  )
}

export default AddVoter
