export function Footer() {
  return (
    <footer className="bg-white text-brand-gray py-12 px-8 md:px-16 border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-xl font-serif text-brand-text font-bold tracking-wide">OCEAN SCULPTURE</h2>
          <p className="text-sm font-sans">Empowering women's healthcare.</p>
        </div>

        <div className="text-sm font-sans text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} OCEAN SCULPTURE. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}
