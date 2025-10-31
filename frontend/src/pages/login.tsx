import {Button, Paper, PasswordInput, Stack, Text, TextInput, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {useAuth} from "../features/auth/hooks/useAuth.ts";
import {ROOT} from "../utils/constants.ts";
import {useForm} from "@mantine/form";

export function Login() {
    const {loginMutation} = useAuth();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (val) => (val.length > 3 ? null : '아이디는 4자 이상이어야 합니다.'),
            password: (val) => (val.length <= 5 ? '비밀번호는 6자 이상이어야 합니다.' : null),
        },
        onSubmitPreventDefault: "always"
    });

    const handleSubmit = (values: typeof form.values) => {
        loginMutation.mutate(values);
    };

    return (
        <Paper radius="md" p="xl" withBorder style={{maxWidth: 400, margin: 'auto', marginTop: 50}}>
            <Title order={2} ta="center" mt="md" mb={50}>
                로그인
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
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        required
                        {...form.getInputProps('password')}
                    />
                    {loginMutation.isError && (
                        <Text ta="center" c="red" size="sm" mt="xs">
                            사용자 아이디와 비밀번호를 확인해주세요.
                        </Text>
                    )}
                    <Button type="submit" fullWidth mt="xl" loading={loginMutation.isPending}>
                        로그인
                    </Button>
                </Stack>
            </form>

            <Text ta="center" mt="md" size={'xs'} c={'gray'}>
                계정이 없으신가요? {' '}
                <Link to={ROOT.SIGNUP}>
                    회원가입 하러가기
                </Link>
            </Text>
        </Paper>
    );
}