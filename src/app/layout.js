import "./globals.css";
import AOSInit from "@/components/AOSInit";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

export const metadata = {
  title: "CONSTRUCTIONS SUPPLIERS",
  description: "CONSTRUCTIONS SUPPLIERS",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased overflow-x-hidden w-full max-w-full font-sans"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                // Prevent Bitdefender / extensions from setting bis_* attributes that cause React hydration mismatch
                if (typeof Element !== 'undefined' && Element.prototype.setAttribute) {
                  var origSetAttr = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, value) {
                    if (typeof name === 'string' && name.startsWith('bis_')) return;
                    return origSetAttr.apply(this, arguments);
                  };
                }
                function clean() {
                  var nodes = document.querySelectorAll('*');
                  for (var i = 0; i < nodes.length; i++) {
                    var attrs = nodes[i].attributes;
                    for (var j = attrs.length - 1; j >= 0; j--) {
                      if (attrs[j].name.startsWith('bis_')) {
                        nodes[i].removeAttribute(attrs[j].name);
                      }
                    }
                  }
                }
                clean();
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && m.attributeName && m.attributeName.startsWith('bis_')) {
                        m.target.removeAttribute(m.attributeName);
                      }
                    }
                  });
                  observer.observe(document.documentElement, {
                    attributes: true,
                    subtree: true
                  });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full max-w-full bg-[#F9FAFC]" suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <NotificationsProvider>
              <AOSInit />
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
