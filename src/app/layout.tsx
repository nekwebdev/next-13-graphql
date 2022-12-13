// Styles
import '@app/globals.css'
// Components
import Header from '@components/Header'

type Props = {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>
          <div>{children}</div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
