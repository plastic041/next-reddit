import { Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex
      height="100%"
      width="100%"
      className="bg-[var(--gray-1)] flex justify-center items-center"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--gray-3)]" />
    </Flex>
  );
}
