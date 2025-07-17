import { Badge, Button, Card, Flex, Text } from "@radix-ui/themes";
import ThemeProvider from "./ThemeProvider";

export default function RadixDemo() {
  return (
    <ThemeProvider className="p-6">
      <Card className="max-w-md mx-auto">
        <Flex direction="column" gap="4">
          <Text size="5" weight="bold">
            Radix UI + Tailwind CSS 4
          </Text>

          <Text size="2" color="gray">
            This demonstrates the integration of Radix UI components with
            Tailwind CSS 4 utilities.
          </Text>

          <Flex gap="2" wrap="wrap">
            <Badge color="orange">Design System</Badge>
            <Badge color="blue">React</Badge>
            <Badge color="green">Tailwind CSS</Badge>
          </Flex>

          <Flex gap="2">
            <Button className="flex-1">Primary Action</Button>
            <Button variant="outline" className="flex-1">
              Secondary
            </Button>
          </Flex>
        </Flex>
      </Card>
    </ThemeProvider>
  );
}
