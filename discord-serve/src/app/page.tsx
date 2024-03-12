import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import { Spotlight } from "@/components/ui/Spotlight";
import DiscordOAuthButton from "@/components/DiscordOAuthButton";

export default function Home() {
  return (
    <BackgroundGradientAnimation>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Utakata Kyosui <br /> Discord Bot.
        </h1>
      <main className="flex flex-row justify-center p-5">
        <BackgroundGradient containerClassName="w-96" className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
          <Image
            src={`/utakata.png`}
            alt="jordans"
            height={400}
            width={400}
            className="object-contain"
          />
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Air Jordan 4 Retro Reimagined
          </p>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
            February 17, 2024. Your best opportunity to get these right now is by
            entering raffles and waiting for the official releases.
          </p>
          <DiscordOAuthButton />
          </BackgroundGradient>
      </main>
    </BackgroundGradientAnimation>
  );
}
