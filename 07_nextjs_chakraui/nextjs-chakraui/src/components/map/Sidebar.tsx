import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  FiCircle,
  FiMenu,
  FiMinus,
  FiStopCircle,
  FiTarget,
  LiaRouteSolid,
} from "./icons";

/**
 * リンクアイテムの定義
 */
interface LinkItemProps {
  name: string;
  icon: IconType;
}

/**
 * サイドバーのリンクアイテム
 */
const LinkItems: Array<LinkItemProps> = [
  { name: "充電ステーション", icon: FiTarget },
  { name: "ミッションパッド", icon: FiStopCircle },
  { name: "ノード", icon: FiCircle },
  { name: "パス", icon: FiMinus },
  { name: "タスク", icon: LiaRouteSolid },
];

/**
 * サイドバーコンポーネント
 * @param param0
 * @returns
 */
export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={0} h="calc(100vh - 60px)">
        {children}
      </Box>
    </Box>
  );
}

/**
 * サイドバーコンポーネントの引数
 */
interface SidebarProps extends BoxProps {
  onClose: () => void;
}

/**
 * サイドバーコンテンツのコンポーネント
 * @param param0
 * @returns
 */
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          MapItem
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

/**
 * ナビゲーションコンポーネントの引数
 */
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
}

/**
 * ナビゲーションコンポーネント
 * @param param0
 * @returns
 */
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "rgb(255, 101, 117)",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

/**
 * モバイル画面コンポーネントの引数
 */
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

/**
 * モバイル画面用のコンポーネント
 * @param param0
 * @returns
 */
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
