import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ShoppingListProvider } from "@/contexts/ShoppingListContext";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipe Recommendation System",
  description: "Find recipes based on your available ingredients",
};

// Navigation component
function Navigation() {
  const { favorites } = useFavorites();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/recipes" 
              className="flex-shrink-0 flex items-center text-xl font-bold text-blue-600"
            >
              Dishcovery
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/recipes"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-gray-900 text-sm font-medium"
              >
                Recipes
              </Link>
              <Link
                href="/favorites"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 text-sm font-medium"
              >
                Favorites
                {favorites.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <Link
                href="/shopping-list"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 text-sm font-medium"
              >
                Shopping List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <FavoritesProvider>
          <ShoppingListProvider>
            <Navigation />
            <main>{children}</main>
          </ShoppingListProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
