
import { FaCircle, FaCommentDots, FaDotCircle } from 'react-icons/fa'
import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiOutlineViewList,
	HiOutlineDocumentAdd,
	HiOutlineDotsVertical,
	HiOutlineStatusOnline
} from 'react-icons/hi'

export interface IRoute {
		key: string,
		label: string,
		path: string,
		icon: JSX.Element,
	
}

export interface IRouteDashboardSidebar {
	key: string,
	label: string,
	path: string,
	icon: JSX.Element,
	subRoutes?: IRoute[]
}

export const DASHBOARD_SIDEBAR_LINKS: Array<IRouteDashboardSidebar> = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'categories',
		label: 'Categories',
		path: '/categories',
		icon: <HiOutlineCube />,
		subRoutes: [
			{
				key: 'category-add',
				label: 'Category',
				path: '/category/add',
				icon: <FaCircle fontSize={6} color='green'/>
			},
			{
				key: 'sub-category-add',
				label: 'Sub Category',
				path: '/sub-category/add',
				icon: <FaCircle fontSize={6} color='green'/>
			},
		]
	},
	{
		key: 'products',
		label: 'Products',
		path: '/products',
		icon: <HiOutlineCube />,
		subRoutes: [
			{
				key: 'product-list',
				label: 'List',
				path: '/product/list',
				icon: <FaCircle fontSize={8} color='green'/>
			},
			{
				key: 'product-add',
				label: 'Add',
				path: '/product/add',
				icon: <FaCircle fontSize={8} color='green'/>
			},
		]
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS: Array<IRouteDashboardSidebar> = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]