import { Flex, Kbd } from "@chakra-ui/react"

const Footer = () => {
    return(
        <Flex direction="column" m="2em" alignItems="center" color="gray.500"> 
        <span>Press <Kbd>Enter</Kbd> to register a todo</span>
        <span>Double <Kbd>Click</Kbd> to edit a todo</span>
        <span>Created By <a href="https://www.linkedin.com/in/igor-shinji-itiroko-a95100222/">I.Itiroko</a></span>
      </Flex>
    )
}

export default Footer