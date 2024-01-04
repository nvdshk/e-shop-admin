import React, { useEffect, useState } from 'react'
import { FcBullish } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS, IRoute, IRouteDashboardSidebar } from '../../lib/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaAngleDown } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authSliceAction } from '../../features/auth/authAction';
import { RootState } from '../../app/store';


const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'


const subMenuLinkClass =
  'flex items-center gap-2 font-light ml-5 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {

  const navigate = useNavigate()

  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
 
  useEffect(() => {
    if (!authState.token) {
       navigate('/login')
    }
}, [authState.token])

  function logout(): void {
     dispatch(authSliceAction.logoutAction());
  }

  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <div><FcBullish fontSize={24} /></div>
        <span className='text-netural-150 text-lg'>E-Shop</span>
      </div>
      <div className='py-8 flex flex-1 flex-col gap-0.5 border-t border-neutral-700'>
        {DASHBOARD_SIDEBAR_LINKS.map((route: IRouteDashboardSidebar) => (
          <SidebarLink key={route.key} route={route} />
        ))}
      </div>
      <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((route: IRouteDashboardSidebar) => (
          <SidebarLink key={route.key} route={route} />
        ))}
      </div>
      <div className={classnames(linkClass, 'cursor-pointer text-red-500')} onClick={logout}>
        <span className='text-xl'><HiOutlineLogout /></span>
        Logout
      </div>
    </div>
  )
}


type LocationState = {
  path: string;
}

function SidebarLink({ route }: { route: IRouteDashboardSidebar }) {
  const { pathname } = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toogleMenu = () => setIsMenuOpen(!isMenuOpen)

  if (route.subRoutes) {

    return (
      <div className='flex flex-col select-none'>

        <div onClick={toogleMenu} className={classnames(pathname === route.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}>
          <span className='text-xl '>{route.icon}</span>
          {route.label}
          <FaAngleDown fontSize={20} />
        </div>

        {isMenuOpen && <div className='py-2 flex flex-1 flex-col gap-0.5 '>
          {route.subRoutes.map((route: IRoute) => (
            <SubMenuLink key={route.key} route={route} />
          ))}
        </div>}


      </div>
    )


  }
  return (
    <Link to={route.path} className={classnames(pathname === route.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}>
      <span className='text-xl'>{route.icon}</span>
      {route.label}
    </Link>
  )
}

function SubMenuLink({ route }: { route: IRoute }) {
  const { pathname } = useLocation();

  return (
    <Link to={route.path} className={classnames(pathname === route.path ? 'bg-neutral-700 text-white' : 'text-neutral-400', subMenuLinkClass)}>
      <span className='text-xl '>{route.icon}</span>
      <h1 className='text-sm'>{route.label}</h1>
    </Link>
  )
}

export default Sidebar