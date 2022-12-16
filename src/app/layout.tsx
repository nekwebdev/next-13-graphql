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
      <body className="font-poppins">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
