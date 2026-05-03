import { Search, ChevronDown } from "lucide-react";

export function NavBar() {
  return (
    <header className="w-full pt-6 pb-4 px-8 md:px-16 border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-serif font-medium tracking-tight">
          OCEAN SCULPTURE
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-sans font-medium text-brand-text">
          <a href="#" className="flex items-center hover:text-brand-gray transition-colors">
            About us <ChevronDown className="ml-1 w-4 h-4" />
          </a>
          <a href="#" className="flex items-center hover:text-brand-gray transition-colors">
            Our work <ChevronDown className="ml-1 w-4 h-4" />
          </a>
          <a href="#" className="flex items-center hover:text-brand-gray transition-colors">
            Ideas <ChevronDown className="ml-1 w-4 h-4" />
          </a>
        </nav>

        {/* Search */}
        <div className="flex items-center space-x-2 text-sm font-sans font-medium cursor-pointer hover:text-brand-gray transition-colors">
          <span>Search</span>
          <Search className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
