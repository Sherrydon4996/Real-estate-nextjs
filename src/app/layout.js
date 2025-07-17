// app/layout.js
import "./globals.css";

export const metadata = {
  title: "PrestigeProperty",
  description: "Your glam destination in Nairobi",
  icons: {
    icon: "/landingPage3.jpg", // This can also be PNG if you prefer
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children} {/* Only layout wrapper */}
      </body>
    </html>
  );
}
