"use client"
export default function DiscordOAuthButton(){
    const DiscordOauthURL = `https://discord.com/oauth2/authorize`;
    const oauthURL = new URL(DiscordOauthURL);
    let RedirectUri: string
    if(process.env.NEXT_PUBLIC_VERCEL_URL === undefined){
        RedirectUri = `${process.env.NEXT_PUBLIC_VERCEL_URL}/oauth/authorize`
    } else {
        RedirectUri = 'http://127.0.0.1:3000/oauth/authorize'
    }
    oauthURL.search = new URLSearchParams([
        ['redirect_uri', RedirectUri],
        ['response_type', 'code'],
        ['scope', ['identify'].join(' ')],
        ['client_id', process.env.NEXT_PUBLIC_CLIENT_ID as string]
    ]).toString();

    function redirect() {
        window.location.replace(oauthURL);
    }
    return <button className="rounded-xl bg-black text-white p-3" onClick={redirect}>Login</button>
}