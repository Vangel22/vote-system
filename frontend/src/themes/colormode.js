import { useColorMode, IconButton } from '@chakra-ui/react'
import { BiMoon } from 'react-icons/bi'
import { BsSun } from 'react-icons/bs'

const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      {colorMode === 'light' ? (
        <IconButton
          aria-label="dark"
          icon={<BiMoon />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          aria-label="light"
          icon={<BsSun />}
          onClick={toggleColorMode}
        />
      )}
    </>
  )
}

export { ColorMode }
