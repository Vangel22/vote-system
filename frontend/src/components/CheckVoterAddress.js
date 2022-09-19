import { HStack, VStack, Input, Text, Button } from "@chakra-ui/react";

const CheckVoterAddress = ({
  voterAddressToCheck,
  setVoterAddressToCheck,
  checkAddressVoter,
  voterStatus,
}) => {
  const handleNewAddressToCheckVote = (e) => {
    setVoterAddressToCheck(e.target.value);
  };
  return (
    <HStack w="full" h="full">
      <Text>Check address vote status</Text>
      <HStack w="full" display="flex" justifyContent="space-between">
        <Input
          placeholder="Enter user address"
          bg="white"
          value={voterAddressToCheck}
          onChange={handleNewAddressToCheckVote}
        />
        <Button colorScheme="orange" onClick={checkAddressVoter}>
          Check
        </Button>
      </HStack>
      {voterStatus !== "An error has occured" && voterStatus && (
        <VStack pt={2}>
          <Text>Voter Status</Text>
          <Text>Account: {voterAddressToCheck}</Text>
          <Text>Voted: {voterStatus?.voted?.toString()}</Text>
          <Text>Vote Weight: {Number(voterStatus?.weight?._hex)}</Text>
        </VStack>
      )}
      {voterStatus === "An error has occured" && <p>{voterStatus}</p>}
    </HStack>
  );
};

export default CheckVoterAddress;
