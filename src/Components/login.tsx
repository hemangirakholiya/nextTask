import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';

const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const LoginPages = styled.div`
    display:flex;
    height: 100vh;
    overflow: hidden;
`

const LoginImg = styled.div`
    width:50%;
    height: 100%; 
    img{
        width:100%;
        height:100%;
        object-fit:cover;
        
    }
`

const LoginData = styled.div`
    width:50%;
    background-color:#fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;    
`;

const LoginBox = styled.div`
   
    // box-shadow:0 0 5px rgba(0,0,0,0.3);
    width:500px;
    border-radius:10px;
    padding:0px 30px;
    h1{
        margin-bottom:5px;
        margin-top:0;
}
    button{
        width:100%;
        background-color:#e9b102;
        border:0;
        color:#fff;
        padding:15px 30px;
        border-radius:5px;
        cursor:pointer;
        font-weight:600;
        letter-spacing:1px;
        font-size:16px;
        margin-top:30px;
    }
`

const LoginText = styled.div`
    margin-bottom:50px;
`

const InputData = styled.div`
    margin-bottom: 30px;    
    position:relative;
    p {
        color: red;
    }
    input{
        width:100%;
        padding:20px 10px;
        border:0;
        border-bottom:1px solid #dee2e6;
        outline:none;        
    }
    input:focus{
        border-bottom-color:#e9b102;
    }
    input::placeholder{
        color: #6c757d;
        font-size:16px;
    }
`;

const Icon = styled.div`
    position:absolute;
    top:12px;
    right:5px;
    color:#6c757d;
`

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', data);
            if (response.status === 200) {
                toast.success('Login successful!');
                router.push('/products');
            }
        } catch (error) {
            toast.error('Login failed: Invalid username or password');
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginPages>
            <LoginImg>
                <img src="/images/back-img.jpg" alt="" />
            </LoginImg>
            <LoginData>
                <LoginBox>
                    <h1>Login</h1>
                    <LoginText>Enter your username and password to login!</LoginText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputData>
                            <input type="text" placeholder='Username' {...register('username')} />
                            <Icon><PersonOutlineOutlinedIcon fontSize="small" /></Icon>
                            {errors.username && <p>{errors.username.message}*</p>}
                        </InputData>
                        <InputData>
                            <input type="password" placeholder='Password' {...register('password')} />
                            <Icon><LockOutlinedIcon fontSize="small" /></Icon>
                            {errors.password && <p>{errors.password.message}*</p>}
                        </InputData>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'LOGIN'}
                        </button>
                    </form>
                </LoginBox>
                <ToastContainer />
            </LoginData>
        </LoginPages>
    );
};

export default LoginPage;
