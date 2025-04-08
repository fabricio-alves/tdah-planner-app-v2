export const metadata = {
  title: "TDAH Planner",
  description: "Planner diário para foco com TDAH",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>{children}</body>
    </html>
  );
}
