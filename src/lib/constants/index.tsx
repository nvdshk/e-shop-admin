
import { FaCircle, FaCommentDots, FaDotCircle } from 'react-icons/fa'
import { IoNotifications } from "react-icons/io5";
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
				path: '/products/list',
				icon: <FaCircle fontSize={8} color='green'/>
			},
			{
				key: 'product-add',
				label: 'Add',
				path: '/products/add',
				icon: <FaCircle fontSize={8} color='green'/>
			},
		]
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />,
		subRoutes: [
			{
				key: 'orders-list',
				label: 'List',
				path: '/orders/list',
				icon: <FaCircle fontSize={8} color='green'/>
			},
			{
				key: 'orders-pending',
				label: 'Pending',
				path: '/orders/pending',
				icon: <FaCircle fontSize={8} color='green'/>
			},
		]
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'notifications',
		label: 'Notifications',
		path: '/notifications',
		icon: <IoNotifications />
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
		path: '/store/update',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]