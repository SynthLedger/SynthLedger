import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SynthLedger - Integrating advanced AI multi-agent technology with blockchain infrastructure",
  description:
    "SynthLedger combines AI-powered multi-agent technology with blockchain infrastructure to streamline smart contract creation, auditing, and deployment.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

