import {AppShell, Box, Burger, Flex, Group, Image, NavLink, Stack} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../features/auth/hooks/useAuthContext.ts";
import {ROOT} from "../../utils/constants.ts";

export function Layout() {
    const [opened, {toggle}] = useDisclosure();
    const {isAuthenticated, logout} = useAuth();
    const location = useLocation();

    return (
        <AppShell
            padding="md"
            header={{height: 50}}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    {/* 왼쪽 영역 */}
                    <Flex justify="flex-start" align="center" gap="sm">
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Image src='logo.svg' h={20} w={'auto'}/>
                    </Flex>

                    {/* 중앙 영역: 타이틀 */}
                    <Image src='title.svg' h={20} w={'auto'}/>

                    {/* 오른쪽 영역 */}
                    <Box w={100}/>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <Stack justify="space-between" style={{height: '100%'}}>
                    {/* 메인 네비게이션 영역*/}
                    <Stack>
                        <NavLink
                            label="검사 페이지"
                            component={Link}
                            to={ROOT.DASHBOARD}
                            active={location.pathname === ROOT.DASHBOARD}
                        />
                    </Stack>
                    <Stack>
                        {isAuthenticated ? (
                            <NavLink
                                label="로그아웃"
                                onClick={logout}
                            />
                        ) : (
                            <>
                                <NavLink
                                    label="로그인"
                                    component={Link}
                                    to={ROOT.LOGIN}
                                    active={location.pathname === ROOT.LOGIN}
                                />
                                <NavLink
                                    label="회원가입"
                                    component={Link}
                                    to={ROOT.SIGNUP}
                                    active={location.pathname === ROOT.SIGNUP}/>
                            </>
                        )}
                    </Stack>

                </Stack>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}