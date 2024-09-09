import React, { useState } from 'react';
import { Input } from '@/shadcn/components/ui/input';
import { Button } from '@/shadcn/components/ui/button';
import login1 from '@/assets/IMAGEM LOGIN 1.jpg';
import logo from '@/assets/LOGO CRM 1.png';
import { Link } from 'react-router-dom';
import { useSignup } from '@/hooks/useSignup';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function signup() {
    const [fullName, setFullName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const { signup, error, isPending } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, fullName);
    };

    return (
        <div className="flex gap-16 w-full h-screen px-40 py-10">
            <div
                className="w-1/2 bg-muted rounded-lg border border-solid p-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${login1})` }}
            ></div>

            <div className="w-1/2 p-10 flex flex-col justify-center">
                <h1 className="text-2xl font-semibold">Crie sua conta</h1>
                <p className="text-muted-foreground">
                    Sua conta criada em 1 minuto, apenas colocando os dados
                    abaixo
                </p>
                <form className="mt-8">
                    <p className="text-muted-foreground mb-2.5">
                        Nome completo
                    </p>
                    <Input
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <p className="mt-4 text-muted-foreground mb-2.5">E-mail</p>
                    <Input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="mt-4 text-muted-foreground mb-2.5">Senha</p>
                    <Input
                        type="password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button className="mt-4 w-full" onClick={handleSubmit} disabled={isPending} >
                        {isPending ? (
                            <ReloadIcon className="w-4 h-4 mr-4 animate-spin" />
                        ) : null}
                        Criar conta agora
                    </Button>
                </form>
                <div className="flex gap-2 text-10 justify-center mt-3">
                    <p>Já tem uma conta?</p>
                    <Link to="/login" className="text-primary">
                        Entre agora
                    </Link>
                </div>
            </div>
        </div>
    );
}
