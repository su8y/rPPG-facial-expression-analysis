import {AppShell, Burger, Container, Flex, NavLink, Text} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";
import {ROOT} from "../route/root.ts";

export function Layout() {
    const [opened, { toggle }] = useDisclosure();
    const { isAuthenticated, logout } = useAuth();

    return (
        <AppShell
            padding="md"
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header>
                <Flex align="center" gap="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Text size={'lg'} fw={700}>Logo</Text>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar>
                <NavLink label="검사 페이지" href={ROOT.DASHBOARD} />

                {isAuthenticated ? (
                    <NavLink label="로그아웃" onClick={logout} />
                ) : (
                    <>
                        <NavLink label="로그인" href={ROOT.LOGIN} />
                        <NavLink label="회원가입" href={ROOT.SIGNUP} />
                    </>
                )}
            </AppShell.Navbar>
            <AppShell.Main>
                <Container>
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}