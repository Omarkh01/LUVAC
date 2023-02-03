import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="">
            <Outlet />
        </main>
    )
}

export default Layout