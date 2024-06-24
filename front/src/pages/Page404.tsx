import { Link } from "react-router-dom"

export default function Page404() {
    return (
        <div className="page-404">
            <h1 className="title">404 - Página não encontrada</h1>
            <p className="not-found-message">Essa página não existe</p>
            <Link to="/" className={"back-to-home"}>Voltar para página inicial</Link>
        </div>
    )
}
