"use client";
import { useState } from "react";
import { Container, useBreakpointValue } from "./index";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function Main({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <>
      <Container as="main" m={0} p={0} maxW="100%" minH="calc(100vh)">
        {children}
      </Container>
    </>
  );
}
