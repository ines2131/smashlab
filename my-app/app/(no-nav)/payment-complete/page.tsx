import Link from "next/link";

export default function PaymentComplete() {
  // 👉 나중에 DB에서 가져올 데이터
  const order = {
    orderId: "SM123456",
    date: new Date().toLocaleDateString(),
    name: "Nana",
    phone: "+852 1234 5678",
    email: "nana@example.com",
    total: 360,
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
        {/* ✅ 성공 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            ✅
          </div>
        </div>

        {/* ✅ 제목 */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Your order has been successfully placed.
        </p>

        {/* ✅ 주문 정보 */}
        <div className="border rounded-lg p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{order.orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Date</span>
            <span className="font-medium">{order.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{order.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span className="font-medium">{order.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium">{order.email}</span>
          </div>

          <hr />

          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Link
            href="/"
            className="flex-1 text-center bg-primary text-white py-2 rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
