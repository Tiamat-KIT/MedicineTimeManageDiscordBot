"use client"
import { createEffect, createSignal } from 'solid-js'
import { BackgroundGradient } from './components/ui/background-gradient';

function App() {
    const [count, setCount] = createSignal(0)
    const DiscordOAuthURL = `https://discord.com/api/oauth2/authorize`
    const OAuthURL = new URL(DiscordOAuthURL)
    OAuthURL.search = new URLSearchParams([
        ['client_id', process.env.CLIENT_ID!],
        ['redirect_uri', 'http://localhost:3000/oauth/authorize'],
        ['response_type', 'code'],
        ['scope', ['identify', 'guilds', 'bot'].join(' ')]
    ]).toString()

    function redirect(){
        window.location.replace(OAuthURL)
    }
  return (
    <>  
      <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        
        <p class="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Air Jordan 4 Retro Reimagined
        </p>

        <p class="text-sm text-neutral-600 dark:text-neutral-400">
          The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
          February 17, 2024. Your best opportunity to get these right now is by
          entering raffles and waiting for the official releases.
        </p>
        <button onClick={redirect} class="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>Login</span>
          <span class="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span>
        </button>
      </BackgroundGradient>
    </div>
    </>
  )
}

export default App