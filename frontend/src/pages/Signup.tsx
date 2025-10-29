import { Button, Paper, PasswordInput, Stack, TextInput, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useAuth } from "../hooks/useAuth.ts";
import {ROOT} from "../route/root.ts";

export function Signup() {
    const { signupMutation } = useAuth();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            username: (val) => (val.length > 3 ? null : 'Invalid email'),
            password: (val) => (val.length <= 5 ? 'Password should include at least 6 characters' : null),
            confirmPassword: (val, values) =>
                val !== values.password ? 'Passwords did not match' : null,
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        signupMutation.mutate({ username: values.username, password: values.password });
    };

    return (
        <Paper radius="md" p="xl" withBorder style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
            <Title order={2} ta="center" mt="md" mb={50}>
                Sign Up
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="ID"
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
                    <PasswordInput
                        label="Confirm Password"
                        placeholder="다시 비밀번호를 입력해주세요"
                        required
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Button type="submit" fullWidth mt="xl" loading={signupMutation.isPending}>
                        Sign Up
                    </Button>
                </Stack>
            </form>

            <Text ta="center" mt="md">
                Already have an account?{' '}
                <Link to={ROOT.LOGIN}>
                    Login
                </Link>
            </Text>
        </Paper>
    );
}