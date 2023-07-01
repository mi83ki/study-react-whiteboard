"use client";
import { Container } from "./index";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container as="main" m={0} p={0} maxW="100%" size="full">
        {children}
      </Container>
    </>
  );
}
