import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginData = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    min-height:100vh;
`;

const InputData = styled.div`
    margin-bottom:10px;
    label{
        margin-right:5px;
        display:inline-block;
    }
    p{
        color:red;
    }
`

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', data);
            if (response.status === 200) {
                router.push('/products');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <LoginData>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputData>
                    <label>Username: </label>
                    <input type="text" {...register('username')} />
                    {errors.username && <p>{errors.username.message}*</p>}
                </InputData>
                <InputData>
                    <label>Password: </label>
                    <input type="password" {...register('password')} />
                    {errors.password && <p>{errors.password.message}*</p>}
                </InputData>
                <button type="submit">Login</button>
            </form>
        </LoginData>
    );
};

export default LoginPage;
