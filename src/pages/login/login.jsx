import React, { useState } from 'react';
import { Input } from '@/shadcn/components/ui/input';
import { Button } from '@/shadcn/components/ui/button';
import login1 from '@/assets/IMAGEM LOGIN 1.jpg';
import logo from '@/assets/LOGO CRM 1.png';
import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function login() {
    const { login, isPending, error } = useLogin();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex gap-16 w-full h-screen px-40 py-10">
            <div
                className="w-1/2 bg-muted rounded-lg border border-solid p-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${login1})` }}
            ></div>

            <div className="w-1/2 p-10 flex flex-col justify-center">
                <h1 className="text-2xl font-semibold">Faça o login</h1>
                <p className="text-muted-foreground">
                    Coloque os dados de acesso e logue na sua conta agora
                </p>
                <form className="mt-8" onSubmit={handleLogin}>
                    <p className="text-muted-foreground mb-2.5">E-mail</p>
                    <Input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="mt-4 text-muted-foreground mb-2.5">Senha</p>
                    <Input
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="mt-4 w-full" disabled={isPending} >
                        { isPending ?  <ReloadIcon className='w-4 h-4 mr-4 animate-spin'/> : null }
                        Entrar na minha conta
                    </Button>
                </form>
                <div className="flex gap-2 text-10 justify-center mt-3">
                    <p>Não tem uma conta</p>
                    <Link to="/signup" className="text-primary">
                        Criar agora
                    </Link>
                </div>
            </div>
        </div>
    );
}
