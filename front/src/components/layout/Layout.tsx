import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Loader from "./Loader"
import {Suspense} from "react"
import { Container } from "@mui/material"

export default function Layout() {
    return (
        <>
            <Header />
            <Container>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </Container>
            <Footer />
        </>
    )
}
