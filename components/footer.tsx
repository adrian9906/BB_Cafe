import Image from 'next/image'
import { useLanguage } from './language-provider';
import Link from 'next/link';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage()
  
  return (
   <footer className="bg-black dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/bb-cafe-logo.jpg"
                    alt="BB Café Logo"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-amber-400">BB Café</h3>
              </div>
              <p className="text-gray-300">{t("footer.description")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.products")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/products?category=coffee" className="hover:text-amber-400">
                    {t("footer.coffee-drinks")}
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=sweets" className="hover:text-amber-400">
                    {t("footer.sweets")}
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-amber-400">
                    {t("footer.all-products")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.service")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#delivery" className="hover:text-amber-400">
                    {t("footer.delivery")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-amber-400">
                    {t("footer.contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-400">
                    {t("footer.about")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
              <div className="space-y-2 text-gray-300">
                <p>📞 (555) 123-4567</p>
                <p>📧 info@bbcafe.com</p>
                <p>📍 3ra e/ b y c, Vedado, Plaza de la revolución</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {currentYear} BB Café. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>
  )
}
