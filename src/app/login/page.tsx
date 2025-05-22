'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    async function handleFormSubmit(ev: { preventDefault: () => void; }) {
        ev.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', {email, password});
        setLoginInProgress(false);
    }
    return (
        <section>
            <h1 className="text-center text-primary text-4xl mb-4 font-bold mt-8">
                Login
            </h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email}
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" name="password" placeholder="password" value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)} />
                <button className="text-white bg-primary px-6 py-2 rounded-xl w-full" type="submit" 
                    disabled={loginInProgress}>
                    Login
                </button>
            </form>
        </section>
    );
}