import PaymentCompleteClient from "@/components/payment/PaymentCompleteClient";

export default async function PaymentCompletePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <PaymentCompleteClient orderId={id} />;
}
