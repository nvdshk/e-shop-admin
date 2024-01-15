import { OrderStatus } from "../../interface/orderInterface"

export function getOrderStatus(status: string) {
	
	switch (status) {
		case 'PLACED' || 'ordered':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'CONFIRMED' || 'confirmed':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'PACKED' || 'packed':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'SHIPPED' || 'shipped':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'OUT_FOR_DELIVERY' || 'out_for_delivery':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'DELIVERED' || 'delivered':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}

export function getPaymentStatus(status: string) {

	switch (status) {
	
		case 'pending':
			return (
				<span className="capitalize py-1  rounded-md text-xs text-sky-600 ">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)

		case 'completed' :
			return (
				<span className="capitalize py-1  rounded-md text-xs text-green-600">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-red-600 bg-red-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}

export function getCurrentOrderStatus(status: Array<OrderStatus>): OrderStatus{
	
	const currentStatus =  status.filter(
		(item: any) => item.isCompleted === true
	  )

	  

	  console.log(currentStatus[currentStatus.length - 1].type )

	
	  return currentStatus[currentStatus.length - 1]
}

export function toCurrency(value: string) {
    let number = parseFloat(value);
    return number.toLocaleString('USD');
}

export function getSubTotal(price: number, discount: number): number {
    return (price - discount)
}

export function getTaxAmount(taxRate:number, taxAmount: number): number {
return (taxAmount * taxRate) / 100
}

export function getCurrentSymbol(): string{
	return "$"
}

export function getTotalAmount(subTotalAmount:number, taxAmount: number, deliveryFee: number): number {
	return subTotalAmount +  taxAmount + deliveryFee
	}