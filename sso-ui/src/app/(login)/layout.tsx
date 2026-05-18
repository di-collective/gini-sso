import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Lato } from "next/font/google";
import { ReactNode, Suspense } from "react";
import ThemeSwitch from "@/components/theme-switch";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return { title: "GINI Auth" };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900`}
                >
                  <div className="flex-1 flex flex-col">
                    <div className="h-20"></div>
                    <div className="flex-1 flex items-center justify-center">
                      <Skeleton>
                        <div className="h-96 w-[1000px]"></div>
                      </Skeleton>
                    </div>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900`}
                >
                  {/* Header - No Background */}
                  <div className="py-6">
                    <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">GINI SSO</div>
                      <div className="flex items-center space-x-8">
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Support</a>
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</a>
                        <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2.5 rounded-full font-medium">Help</button>
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Card Container */}
                  <div className="flex-1 flex items-center justify-center px-8 py-8">
                    <div className="w-full max-w-5xl">
                      {/* Large Rounded Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row min-h-[550px]">
                          {/* Left Side - Blue Branding Panel with Pattern */}
                          <div className="lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-12 lg:p-16 relative overflow-hidden">
                            {/* Decorative Pattern */}
                            <div className="absolute inset-0 opacity-10">
                              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <circle cx="20" cy="20" r="1.5" fill="white" />
                                  </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                              </svg>
                            </div>
                            
                            {/* Diagonal Lines Pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div className="absolute top-0 left-0 w-full h-full" style={{
                                backgroundImage: `repeating-linear-gradient(
                                  45deg,
                                  transparent,
                                  transparent 35px,
                                  rgba(255, 255, 255, 0.5) 35px,
                                  rgba(255, 255, 255, 0.5) 70px
                                )`
                              }}></div>
                            </div>

                            {/* Content */}
                            <div className="text-center relative z-10">
                              <div className="text-7xl font-bold text-white mb-6">GINI</div>
                              <p className="text-blue-200 text-xl">Login with your GINI account</p>
                            </div>
                          </div>

                          {/* Right Side - Form */}
                          <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                            <div className="w-full max-w-md">
                              {children}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - No Background */}
                  <div className="py-8">
                    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div>© 2024 GINI. All rights reserved.</div>
                      <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white">Cookie Settings</a>
                      </div>
                    </div>
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
