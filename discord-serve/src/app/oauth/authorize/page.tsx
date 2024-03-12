"use client"
import { LoginData } from "@sapphire/plugin-api"
import { useEffect } from "react"

export default function AuthorizePoint(){
    useEffect(() => {
        const codeSearchParam = new URL(window.location.href).searchParams.get('code')
        fetch(`/oauth/callback`,{
            method: 'POST',
            body: JSON.stringify({
                code: codeSearchParam
            })
        }).then(data => data.json() as Promise<LoginData>).then(
            data => localStorage.setItem('discord-data',JSON.stringify(data))
        )

        window.location.replace('/')
    },[])
    return <h1 className="text-7xl">認証中</h1>
}