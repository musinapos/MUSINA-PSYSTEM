import "./globals.css";

export const metadata = {
  title: "MUSINA POS SYSTEMS - Smart Solutions for Your Business",
  description: "Spaza POS, Tavern POS, Restaurant POS, Customer Food App, Head Office Admin - Works Offline - Musina, Limpopo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, background:'#031a33', fontFamily:'Arial, sans-serif'}}>
        {children}
      </body>
    </html>
  );
}
