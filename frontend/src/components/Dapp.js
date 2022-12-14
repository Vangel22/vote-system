import React, { useEffect, useState } from 'react'
import {
  Flex,
  Container,
  VStack,
  Heading,
  HStack,
  Text,
  useColorMode,
} from '@chakra-ui/react'

import { ethers } from 'ethers'

import CheckVoterAddress from './CheckVoterAddress'
import Proposals from './Proposals'
import AddVoter from './AddVoter'

import TokenArtifact from '../ABI/Ballot.json'
import contractAddress from '../ABI/contract-address.json'
import { ColorMode } from '../themes/colormode'
import { WinningProposal } from './WinningProposal'
import { parseName, parseBytes } from '../utils'

export const Dapp = () => {
  const [token, setToken] = useState()
  const [newVoter, setNewVoter] = useState('')
  const [newVoterStatus, setNewVoterStatus] = useState('')
  const [voterStatus, setVoterStatus] = useState()
  const [voterAddressToCheck, setVoterAddressToCheck] = useState('')
  const [proposals, setProposals] = useState([])
  const [chairperson, setChairperson] = useState('')
  const [winnerName, setWinnerName] = useState('')

  // **************** Ethers Connection for the SmartContract ****************
  const { colorMode } = useColorMode()

  async function _initialize() {
    await _intializeEthers()
  }

  const _intializeEthers = async () => {
    // ethers connection for the smartcontract
    const _provider = new ethers.providers.Web3Provider(window.ethereum)

    const _token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      _provider.getSigner(0),
    )

    // get the proposals
    const newProposal = await _token.getAllProposals()

    // get the chairman address
    const newChairperson = await _token.chairperson()

    // save the token data into a hook to reuse it along the app
    setToken(_token)
    setProposals(newProposal)
    setChairperson(newChairperson)
  }

  // Connects to the smart contract token id (check /contracts/contract-address.json)
  async function init() {
    const [selectedAddress] = await window.ethereum.enable()
    _initialize(selectedAddress)
  }

  useEffect(() => {
    // When the page loads it will initialize the init function
    // that we need to connect the frontend with the smartcontract
    init()
  })

  // **************** Here Starts The Real Logic of the Frontend -> SmartContract ****************

  // Vote the selected proposal (you can only vote one time)
  const voteProposal = async (proposal) => {
    await token.vote(proposal)
  }

  // Check if the address the user entered is a a voter or not
  const checkAddressVoter = async () => {
    try {
      const voterData = await token.voters(`${voterAddressToCheck}`)
      setVoterStatus(voterData)
    } catch (err) {
      console.log(err)
      setVoterStatus('An error has occured')
    }
  }

  // It gives the right to vote to a new address
  const addNewVoter = async () => {
    try {
      await token.giveRightToVote(newVoter)
      setNewVoterStatus('Success')
    } catch (err) {
      console.log(err)
      setNewVoterStatus('An error has occured')
    }
  }

  const getWinningProposal = async () => {
    try {
      const winnerHex = await token.winningProposal()
      const winnerIndex = parseInt(winnerHex._hex)
      const winnerName = parseName(parseBytes(proposals[winnerIndex].name))
      setWinnerName(winnerName)
    } catch (err) {
      console.log(err)
      setNewVoterStatus('An error has occured')
    }
  }

  return (
    <>
      <HStack w="full" justify="flex-end" pt={4} pr={4}>
        <ColorMode />
      </HStack>
      <Container maxW="container.xl" p={0}>
        <Flex border="md" h="full" py={10}>
          <VStack
            w="full"
            h="full"
            bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            borderRadius="md"
            shadow="lg"
          >
            <VStack w="full" h="full" spacing={12} p={10}>
              <Heading>Voting System</Heading>
              <Text>
                ChairPerson Token: <u style={{ color: 'red' }}>{chairperson}</u>
              </Text>
              <Proposals proposals={proposals} voteProposal={voteProposal} />
              <AddVoter
                addNewVoter={addNewVoter}
                setNewVoter={setNewVoter}
                newVoter={newVoter}
                newVoterStatus={newVoterStatus}
              />
              <CheckVoterAddress
                voterAddressToCheck={voterAddressToCheck}
                setVoterAddressToCheck={setVoterAddressToCheck}
                checkAddressVoter={checkAddressVoter}
                voterStatus={voterStatus}
              />
              <WinningProposal
                getWinningProposal={getWinningProposal}
                winnerName={winnerName}
              />
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}
