import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServiceCards from "./components/ServiceCards";
import ThemeProvider from "./components/ThemeProvider";
import HomeHeroBackground from "./components/HomeHeroBackground";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="relative isolate flex min-h-dvh flex-1 flex-col overflow-x-clip pb-safe sm:overflow-x-visible">
        <HomeHeroBackground />
        <Navbar className="relative z-10" />
        <main className="relative z-10 flex-1">
          <Hero />
          <ServiceCards />
        </main>
        <footer className="relative z-10 border-t border-border bg-background/80 px-3 py-6 text-center text-xs text-foreground-subtle backdrop-blur-sm sm:px-4 sm:py-8 sm:text-sm">
          <span className="text-gradient font-bold">پیشران</span>
          <span className="mx-2">·</span>
          <span className="font-en">© 2026 Pishran</span>
        </footer>
      </div>
    </ThemeProvider>
  );
}
