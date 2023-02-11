import { OrderService } from "@/entities/order/model/order.service";
import Order from "@/screens/order/Order";
import { NextAuthPage } from "@/shared/types/auth.types";
import { GetServerSideProps, GetStaticProps } from "next";


const OrderPage: NextAuthPage<{order: any}> = ({order}) => {
	return <Order order={order} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const id = ctx.params!.id;

		const { data: order } = await OrderService.getOrder(String(id));
		return {
			props: { order },
		};
	} catch (e) {

		return {
			props: {},
			notFound: true,
		};
	}
};

OrderPage.isOnlyUser = true;

export default OrderPage;