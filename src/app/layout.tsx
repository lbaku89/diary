import type { Metadata } from 'next'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'

// * import contextProvider
import AuthContextProvider from '@/shared/context/AuthContextProvider'

// const inter = Inter({ subsets: ['latin'] })
import Container from '@mui/material/Container'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

export const metadata: Metadata = {
  title: 'Simple Diary',
  description: 'Write your diary easily By Simple Diary',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AuthContextProvider>
          {/* Using other styling solutions */}
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CssBaseline>
              <Container
                maxWidth="lg" // 1200px
                sx={{ minHeight: '100vh', height: '100%', overflow: 'hidden' }}
              >
                {children}
              </Container>
            </CssBaseline>
          </AppRouterCacheProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
