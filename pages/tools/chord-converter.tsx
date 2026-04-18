import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  HStack,
  Textarea,
  SimpleGrid,
  Separator,
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Section from '../../components/section'
import { useChordConverter, CopyState } from "@/components/useChordConverter"

const COPY_LABEL: Record<CopyState, string> = {
  idle: 'Copy',
  copied: 'Copied ✓',
  error: 'Failed ✗',
}

const ChordConverter = () => {
  const {
    input,
    output,
    copyState,
    setInput,
    handleCopy,
    handleClear,
    handleLoadSample,
  } = useChordConverter()

  return (
    <Layout title="Chord Converter">
      <Container maxW="container.lg" py={10}>
        <Heading as="h3" textStyle="section-title" fontSize={20} mb={2}>
          Chord Converter
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={6}>
          Paste chord+lyric notation — output is formatted for Planning Center&apos;s chord parser.
        </Text>

        <Separator mb={6} borderColor="divider.border" />

        {/* Format guide */}
        <Section delay={0.1}>
          <Box
            mb={6}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor="divider.border"
            fontSize="sm"
          >
            <Heading as="h4" fontSize={14} mb={3} letterSpacing="wider" textTransform="uppercase">
              Format Guide
            </Heading>
            <SimpleGrid columns={[1, 2]} gap={4}>
              <Box>
                <Text fontWeight="semibold" mb={1}>Input — chord line above lyric line</Text>
                <Box
                  as="pre"
                  fontFamily="mono"
                  fontSize="xs"
                  p={2}
                  borderRadius="sm"
                  bg="blackAlpha.100"
                  whiteSpace="pre"
                  overflowX="auto"
                >
{`G       Em      C           D\nAmazing grace how sweet the sound`}
                </Box>
              </Box>
              <Box>
                <Text fontWeight="semibold" mb={1}>Output — Planning Center format</Text>
                <Box
                  as="pre"
                  fontFamily="mono"
                  fontSize="xs"
                  p={2}
                  borderRadius="sm"
                  bg="blackAlpha.100"
                  whiteSpace="pre"
                  overflowX="auto"
                >
{`[G]Amazing [Em]grace how [C]sweet the [D]sound`}
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        </Section>

        {/* Editor panels */}
        <Section delay={0.2}>
          <SimpleGrid columns={[1, 1, 2]} gap={4}>

            {/* Input */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="gray.500">
                  Input
                </Text>
                <HStack gap={2}>
                  <Button size="xs" variant="ghost" onClick={handleLoadSample}>Sample</Button>
                  <Button size="xs" variant="ghost" onClick={handleClear}>Clear</Button>
                </HStack>
              </HStack>
              <Textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Paste chord chart here:\n\nG       Em      C      D\nAmazing grace how sweet the sound`}
                fontFamily="mono"
                fontSize="sm"
                rows={20}
                resize="vertical"
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                borderColor="divider.border"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Chord line above · Lyric line below · Blank lines preserved
              </Text>
            </Box>

            {/* Output */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="gray.500">
                  Output — Planning Center
                </Text>
                <Button
                  size="xs"
                  variant="outline"
                  colorPalette={
                    copyState === 'copied' ? 'green' :
                    copyState === 'error'  ? 'red'   : 'gray'
                  }
                  onClick={handleCopy}
                  disabled={!output || copyState !== 'idle'}
                  minW="64px"
                >
                  {COPY_LABEL[copyState]}
                </Button>
              </HStack>
              <Box
                fontFamily="mono"
                fontSize="sm"
                p={3}
                borderWidth="1px"
                borderRadius="md"
                borderColor="divider.border"
                minH="460px"
                whiteSpace="pre-wrap"
                wordBreak="break-word"
                lineHeight="tall"
                overflowY="auto"
              >
                {output ? output : (
                  <Text color="gray.400" fontStyle="italic">
                    Output will appear here as you type…
                  </Text>
                )}
              </Box>
              <Text fontSize="xs" color="gray.500" mt={1}>
                Paste directly into Planning Center&apos;s chord parser
              </Text>
            </Box>

          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default ChordConverter
