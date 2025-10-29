import {AppShell, Burger, Container, Flex, NavLink, Text} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {Outlet} from "react-router-dom";

export function Layout() {
    const [opened, { toggle }] = useDisclosure();

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
                <NavLink label="검사 페이지" href={"/"} />

                <NavLink label={"로그인/회원가입"}>
                    <NavLink label="로그인" href={"/"} />
                    <NavLink label="회원가입" href={"/"} />
                    <NavLink label="로그아웃" onClick={() => {
                        localStorage.removeItem('accessToken')
                        location.reload()
                    }
                    }/>
                </NavLink>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container>
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}