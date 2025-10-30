import {AppShell, Burger, Flex, Grid, Image, NavLink} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Outlet} from "react-router-dom";
import {useAuth} from "../../features/auth/hooks/useAuthContext.ts";
import {ROOT} from "../../utils/constants.ts";

export function Layout() {
    const [opened, {toggle}] = useDisclosure();
    const {isAuthenticated, logout} = useAuth();

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
                <Grid>
                    <Grid.Col span={4}>
                        <Flex style={{
                            justifySelf: 'start',
                            paddingLeft: '10px',
                            alignItems: 'center',
                            alignContent: 'center'
                        }}>
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Image src='logo.svg' h={20} w={'auto'}/>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <div style={{justifySelf: 'center'}}>
                            <Image src='title.svg' h={20} w={'auto'}/>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                    </Grid.Col>
                </Grid>
            </AppShell.Header>
            <AppShell.Navbar>
                <NavLink label="검사 페이지" href={ROOT.DASHBOARD}/>

                {isAuthenticated ? (
                    <NavLink label="로그아웃" onClick={logout}/>
                ) : (
                    <>
                        <NavLink label="로그인" href={ROOT.LOGIN}/>
                        <NavLink label="회원가입" href={ROOT.SIGNUP}/>
                    </>
                )}
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}