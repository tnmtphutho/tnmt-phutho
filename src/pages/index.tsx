import { ReactNode } from "react"
import BlankLayout from "src/@core/layouts/BlankLayout"
import Home from "src/views/home"

const HomePage = () => {

  return (
    <Home />
  )
}

HomePage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default HomePage


