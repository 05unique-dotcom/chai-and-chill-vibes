import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Coffee, Menu, X, ShoppingCart, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import heroImage from "@/assets/hero-chai.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Chai & Chill — Authentic Indian Street Food" },
      {
        name: "description",
        content:
          "Your favorite street food, one sip away. Order cutting chai, vada pav, samosas, and poha from Chai & Chill.",
      },
      { property: "og:title", content: "Chai & Chill — Authentic Indian Street Food" },
      {
        property: "og:description",
        content:
          "Your favorite street food, one sip away. Cutting chai, vada pav, samosas, and poha delivered fresh.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
});

const IMG = "https://images.unsplash.com/";

const menuItems = [
  {
    id: 1,
    name: "Cutting Chai",
    emoji: "☕",
    image: `${IMG}photo-1571934811356-5cc061b6821f?w=800&q=80&auto=format&fit=crop`,
    description: "Strong Mumbai-style tea brewed with ginger, cardamom, and a whole lot of love.",
    price: 25,
  },
  {
    id: 2,
    name: "Vada Pav",
    emoji: "🍔",
    image: `${IMG}photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop`,
    description: "Spicy potato fritter tucked inside a soft bun with chutneys and fried green chili.",
    price: 40,
  },
  {
    id: 3,
    name: "Samosa",
    emoji: "🥟",
    image: `${IMG}photo-1601050690117-94f5f6fa8bd7?w=800&q=80&auto=format&fit=crop`,
    description: "Crispy golden pastry filled with seasoned potatoes, peas, and aromatic spices.",
    price: 30,
  },
  {
    id: 4,
    name: "Poha",
    emoji: "🍛",
    image: `${IMG}photo-1589301760014-d929f3979dbc?w=800&q=80&auto=format&fit=crop`,
    description: "Light, fluffy flattened rice tempered with mustard seeds, peanuts, and curry leaves.",
    price: 50,
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function MenuCard({ item, index, onAdd }: { item: (typeof menuItems)[number]; index: number; onAdd: () => void }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={inView ? "animate-fade-in-up opacity-100" : "opacity-0"}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <Card className="group h-full overflow-hidden border-border/60 bg-card pt-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={item.image}
            alt={`${item.name} — Indian street food served at Chai & Chill`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background/85 text-xl backdrop-blur-sm">
            {item.emoji}
          </span>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-xl">{item.name}</CardTitle>
          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="font-display text-2xl font-bold text-primary">₹{item.price}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Button type="button" onClick={onAdd} className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
    toast.success("Added to cart! 🛒");
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Chai & Chill
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollTo("menu")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Menu
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </button>
            <button
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/50 bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollTo("menu")}
                className="text-left text-base font-medium text-muted-foreground hover:text-foreground"
              >
                Menu
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="text-left text-base font-medium text-muted-foreground hover:text-foreground"
              >
                About
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="text-left text-base font-medium text-muted-foreground hover:text-foreground"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Steaming glass of cutting chai on a rustic Mumbai street food stall"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-clay/85 via-clay/70 to-spice/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_40%)]" />
        </div>

        {/* Animated floating elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[18%] text-4xl opacity-20 animate-float sm:text-5xl">
            ☕
          </div>
          <div className="absolute right-[12%] top-[25%] text-3xl opacity-15 animate-float-slow sm:text-4xl">
            🍃
          </div>
          <div className="absolute bottom-[22%] left-[8%] text-3xl opacity-15 animate-float-slow sm:text-4xl">
            🌶️
          </div>
          <div className="absolute bottom-[28%] right-[10%] text-4xl opacity-20 animate-float sm:text-5xl">
            🥟
          </div>
        </div>

        {/* Steam animation */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[120%] flex gap-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="h-12 w-1 rounded-full bg-gradient-to-t from-white/0 via-white/30 to-white/0 animate-steam"
              style={{
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              Est. 1985 · Mumbai Style
            </span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-primary-foreground drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in-up">
            Chai & Chill
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-white/90 sm:text-xl md:text-2xl animate-fade-in-up">
            Your favorite street food, one sip away
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
            <Button
              size="lg"
              onClick={() => scrollTo("menu")}
              className="min-w-[10rem] bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("about")}
              className="min-w-[10rem] border-white/30 bg-white/10 text-primary-foreground backdrop-blur-sm hover:bg-white/20 hover:text-primary-foreground"
            >
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section id="menu" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Fan Favorites
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Street Food That Feels Like Home
            </h2>
            <p className="mt-4 text-muted-foreground">
              Handpicked classics, served fresh with the same recipe we perfected on the streets of Mumbai.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <CardHeader className="pb-2">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl transition-transform duration-300 group-hover:scale-110">
                    {item.emoji}
                  </div>
                  <CardTitle className="font-display text-xl">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-display text-2xl font-bold text-primary">
                    ₹{item.price}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button onClick={addToCart} className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative overflow-hidden bg-secondary py-20 sm:py-28">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Story
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                From Mumbai Streets to Your Heart
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Made with love since 1985, straight from Mumbai streets to your heart. What started
                as a tiny stall near Dadar station has grown into a beloved kitchen that ships
                nostalgia across the city.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Every cup of chai is slow-boiled, every vada pav is hand-assembled, and every
                samosa is folded the way our grandmother taught us — crispy, spicy, and
                unforgettable.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <p className="font-display text-3xl font-bold text-primary">40+</p>
                  <p className="text-sm text-muted-foreground">Years of taste</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-primary">1M+</p>
                  <p className="text-sm text-muted-foreground">Cups served</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Average rating</p>
                </div>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-md rounded-3xl bg-gradient-to-br from-primary/20 to-accent/30 p-2 sm:max-w-lg">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-card p-8 text-center">
                <span className="text-7xl sm:text-8xl">🇮🇳</span>
                <p className="mt-6 font-display text-2xl font-bold text-foreground">
                  Taste the Tradition
                </p>
                <p className="mt-2 text-muted-foreground">
                  Authentic recipes. Fresh ingredients. Zero compromise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border/60 bg-background py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <a href="/" className="flex items-center gap-2">
                <Coffee className="h-6 w-6 text-primary" />
                <span className="font-display text-xl font-bold text-foreground">Chai & Chill</span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Serving Mumbai's favorite street food with warmth, spice, and a whole lot of love since 1985.
              </p>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold text-foreground">Visit Us</h3>
              <address className="mt-4 not-italic text-sm leading-relaxed text-muted-foreground">
                42 Dadar Chowpatty Lane
                <br />
                Mumbai, Maharashtra 400028
                <br />
                <a href="tel:+912212345678" className="hover:text-foreground">
                  +91 22 1234 5678
                </a>
              </address>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold text-foreground">Follow Us</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://instagram.com/chaiandchill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/chaiandchill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/chaiandchill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Chai & Chill. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground">Privacy Policy</button>
              <button className="hover:text-foreground">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
