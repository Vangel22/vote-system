import {
  HStack,
  VStack,
  Input,
  Text,
  Button,
  useColorMode,
} from '@chakra-ui/react'

const CheckVoterAddress = ({
  voterAddressToCheck,
  setVoterAddressToCheck,
  checkAddressVoter,
  voterStatus,
}) => {
  const { colorMode } = useColorMode()

  const handleNewAddressToCheckVote = (e) => {
    setVoterAddressToCheck(e.target.value)
  }

  return (
    <VStack w="full" h="full">
      <HStack w="full" display="flex" justifyContent="space-between">
        <Text>Check address vote status</Text>
        <Input
          placeholder="Enter user address"
          bg={colorMode === 'light' ? 'white' : 'whiteAlpha.400'}
          value={voterAddressToCheck}
          onChange={handleNewAddressToCheckVote}
        />
        <Button colorScheme="orange" onClick={checkAddressVoter}>
          Check
        </Button>
      </HStack>
      {voterStatus !== 'An error has occured' && voterStatus && (
        <VStack pt={2}>
          <Text>Voter Status</Text>
          <Text>Account: {voterAddressToCheck}</Text>
          <Text>Voted: {voterStatus?.voted?.toString()}</Text>
          <Text>Vote Weight: {Number(voterStatus?.weight?._hex)}</Text>
        </VStack>
      )}
      {voterStatus === 'An error has occured' && <p>{voterStatus}</p>}
    </VStack>
  )
}

export default CheckVoterAddress
