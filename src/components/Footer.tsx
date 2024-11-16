import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <h2 className="text-2xl font-bold">Recipe</h2>
            </div>
            <p className="text-gray-200 max-w-md">
              Discover 1000+ recipes in your hand with the best recipe. Help you
              to find the easiest way to cook.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Menu Links */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Menu</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recipes"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Recipes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/articles"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Help Links */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Help</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Privacy and Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Term of Use
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">Social</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
