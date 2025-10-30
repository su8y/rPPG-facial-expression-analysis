import { Button, Paper, PasswordInput, Stack, TextInput, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useAuth } from "../hooks/useAuth.ts";
import {ROOT} from "../constants/ROOT.ts";

export function Login() {
    const { loginMutation } = useAuth();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (val) => (val.length <= 3 ? 'ID should include at least 4 characters': null),
            password: (val) => (val.length <= 5 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        loginMutation.mutate(values);
    };

    return (
        <Paper radius="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
            <Title order={2} ta="center" mt="md" mb={50}>
                Login
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="아이디"
                        placeholder="아이디를 입력해주세요"
                        required
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="비밀번호를 입력해주세요"
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" fullWidth mt="xl" loading={loginMutation.isPending}>
                        Login
                    </Button>
                </Stack>
            </form>

            <Text ta="center" mt="md">
                Don't have an account? {' '}
                <Link to={ROOT.SIGNUP}>
                    Sign up
                </Link>
            </Text>
        </Paper>
    );
}