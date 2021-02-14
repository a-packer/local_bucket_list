import { Link } from 'react-router-dom'

const footer = () => {
    return (
        <footer>
            <p>Copyright &copy: 2021</p>  
            {/* instead of using <a> tags, use Link from react-router-dom to avoid a page reload */}
            <Link to="/about">About</Link>
        </footer>
    )
}

export default footer
