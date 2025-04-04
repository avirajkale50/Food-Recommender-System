import React, { useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Home, Utensils, Apple, Menu, X } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import HomePage from "./pages/HomePage";
import DietRecommendation from "./pages/DietRecommendation";
import CustomFood from "./pages/CustomFood";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
          {/* Navigation */}
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <span className="text-gray-900 dark:text-white text-xl font-bold">
                    NutriGuide
                  </span>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                  <Link
                    to="/diet"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Utensils className="w-4 h-4 mr-2" />
                    Diet Recommendation
                  </Link>
                  <Link
                    to="/custom"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <Apple className="w-4 h-4 mr-2" />
                    Custom Food
                  </Link>
                  <ThemeToggle />
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                  <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <button
                      onClick={toggleMenu}
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md"
                      aria-label="Toggle menu"
                    >
                      {isMenuOpen ? (
                        <X className="w-6 h-6" />
                      ) : (
                        <Menu className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
              <div className="px-2 pt-2 pb-3 space-y-1 border-t dark:border-gray-700 border-gray-200">
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Home className="w-5 h-5 mr-3" />
                    Home
                  </div>
                </Link>
                <Link
                  to="/diet"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Utensils className="w-5 h-5 mr-3" />
                    Diet Recommendation
                  </div>
                </Link>
                <Link
                  to="/custom"
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Apple className="w-5 h-5 mr-3" />
                    Custom Food
                  </div>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diet" element={<DietRecommendation />} />
              <Route path="/custom" element={<CustomFood />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
