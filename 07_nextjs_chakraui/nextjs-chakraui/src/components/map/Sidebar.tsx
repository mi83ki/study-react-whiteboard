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
import { FiMenu } from "./icons";
/**
 * リンクアイテムの定義
 */
export interface LinkItemProps {
  id: string;
  name: string;
  icon: IconType;
}

/**
 * サイドバーコンポーネントの引数
 */
interface SidebarProps extends FlexProps {
  naviItems: LinkItemProps[];
  onClickNavi: (name: string) => void;
  children: ReactNode;
}

/**
 * サイドバーコンポーネント
 * @param param0
 * @returns
 */
export default function Sidebar({
  naviItems,
  onClickNavi,
  children,
  ...rest
}: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        naviItems={naviItems}
        onClose={() => onClose}
        onClickNavi={onClickNavi}
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
          <SidebarContent
            naviItems={naviItems}
            onClose={onClose}
            onClickNavi={onClickNavi}
          />
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
interface SidebarContentProps extends BoxProps {
  naviItems: LinkItemProps[];
  onClose: () => void;
  onClickNavi: (name: string) => void;
}

/**
 * サイドバーコンテンツのコンポーネント
 * @param param0
 * @returns
 */
const SidebarContent = ({
  naviItems,
  onClose,
  onClickNavi,
  ...rest
}: SidebarContentProps) => {
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
      {naviItems.map((navi) => (
        <NavItem
          id={navi.id}
          key={navi.name}
          icon={navi.icon}
          onClickNavi={onClickNavi}
        >
          {navi.name}
        </NavItem>
      ))}
    </Box>
  );
};

/**
 * ナビゲーションコンポーネントの引数
 */
interface NavItemProps extends FlexProps {
  id: string;
  icon: IconType;
  onClickNavi: (name: string) => void;
  children: string;
}

/**
 * ナビゲーションコンポーネント
 * @param param0
 * @returns
 */
const NavItem = ({
  id,
  icon,
  onClickNavi,
  children,
  ...rest
}: NavItemProps) => {
  const handleClick = (event: any) => {
    onClickNavi(id);
  };
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        onClick={handleClick}
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
