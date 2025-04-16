import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to='/rq'>
                FetchRQ
            </NavLink>
            <NavLink to='/scrollinfinite'>
                Scroll
            </NavLink>
        </div>
    )
}

export default Header