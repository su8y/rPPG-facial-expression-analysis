import {Button, Loader, Paper, PasswordInput, Stack, Text, TextInput, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {useForm} from "@mantine/form";
import {useAuth} from "../features/auth/hooks/useAuth.ts";
import {ROOT} from "../utils/constants.ts";
import {useState} from 'react';
import {useDebouncedCallback} from '@mantine/hooks';
import {IconCheck, IconX} from '@tabler/icons-react';


export function Signup() {
    const [idCheckState, setIdCheckState] = useState({
        status: 'idle', //idle, loading, success, error
        message: '',
    });

    const {signupMutation, checkUsernameMutation} = useAuth();


    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            username: (val) => (val.length > 3 ? null : '아이디는 4자 이상이어야 합니다.'),
            password: (val) => (val.length <= 5 ? '비밀번호는 6자 이상이어야 합니다.' : null),
            confirmPassword: (val, values) =>
                val !== values.password ? '비밀번호가 동일하지 않습니다.' : null,
        },
    });

    const handleSearch = useDebouncedCallback(async (query: string) => {
        if (form.getInputProps('username').error) {
            setIdCheckState({...idCheckState, status: 'error'});
        } else {
            await checkUsernameMutation.mutate(query);
        }
    }, 500);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        checkUsernameMutation.reset()
        setIdCheckState({...idCheckState, status: 'loading'});
        form.getInputProps('username').onChange(event.currentTarget.value);
        form.validate()
        handleSearch(event.currentTarget.value);
    };


    const handleSubmit = (values: typeof form.values) => {
        signupMutation.mutate({username: values.username, password: values.password});
    };

    const createRightSection = () => {
        if (checkUsernameMutation.isError) {
            return (
                <IconX size={16} color={'red'}/>
            );
        }
        if (checkUsernameMutation.isSuccess) {
            return (
                <IconCheck size={16} color="teal"/>
            );
        }
        if (idCheckState.status === 'loading') {
            return <Loader size={20}/>;
        }
        return null;
    };

    const isButtonDisabled = checkUsernameMutation.isError || !form.isValid();

    return (
        <Paper radius="md" p="xl" withBorder style={{maxWidth: 400, margin: 'auto', marginTop: 50}}>
            <Title order={2} ta="center" mt="md" mb={50}>
                회원가입
            </Title>

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="아이디"
                        placeholder="아이디를 입력해주세요"
                        required
                        {...form.getInputProps('username')}
                        onChange={handleChange}
                        rightSection={createRightSection()}
                        error={
                            form.errors.username ||
                            (idCheckState.status === 'error' ? idCheckState.message : null)
                        }
                    />
                    {checkUsernameMutation.isError && <Text ta="center" c="red" size="xs" m={0}>중복된 아이디입니다.</Text>}
                    {checkUsernameMutation.isSuccess && <Text ta="center" c="teal" size="xs" m={0}>사용가능한 아이디입니다.</Text>}

                    <PasswordInput
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요"
                        required
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        label="확인 비밀번호"
                        placeholder="다시 비밀번호를 입력해주세요"
                        required
                        {...form.getInputProps('confirmPassword')}
                    />
                    {
                        signupMutation.isError && <Text ta="center" c="red" size="sm" mt="xs">
                            회원가입이 실패하였습니다.
                        </Text>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        mt="xl"
                        loading={signupMutation.isPending}
                        disabled={isButtonDisabled}
                    >
                        회원가입
                    </Button>
                </Stack>
            </form>

            <Text ta="center" mt="md" size={'xs'} c={'gray'}>
                이미 계정을 가지고있나요?{' '}
                <Link to={ROOT.LOGIN}>
                    로그인 하러 가기
                </Link>
            </Text>
        </Paper>
    );
}