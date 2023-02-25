import { GetServerSideProps, GetStaticProps } from "next"

import { NextAuthPage } from "@/shared/types/auth.types"
import OrderScreen from "@/screens/order/Order"
import { OrderService } from "@/entities/order/model/order.service"


const OrderPage: NextAuthPage<{order: any}> = ({order}) => {
	return <OrderScreen order={order} />
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const id = ctx.params!.id

		const { data: order } = await OrderService.getOrder(String(id))
		return {
			props: { order },
		}
	} catch (e) {

		return {
			props: {},
			notFound: true,
		}
	}
}

OrderPage.isOnlyUser = true

export default OrderPage