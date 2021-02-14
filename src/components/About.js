import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div>
            <h4>Version 1.0.0</h4>
            {/* instead of using <a> tags, use Link from react-router-dom to avoid a page reload */}
            <Link to='/'>Go Back</Link>
        </div>
    )
}

export default About
