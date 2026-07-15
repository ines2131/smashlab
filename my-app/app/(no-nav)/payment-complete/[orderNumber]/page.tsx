import PaymentCompleteClient from "@/components/payment/PaymentCompleteClient";

export default async function PaymentCompletePage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const { orderNumber } = await params;
  return <PaymentCompleteClient orderNumber={orderNumber} />;
}
