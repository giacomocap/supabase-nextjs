import AuthButton from "@/components/AuthButton";
import Link from "next/link";

export default async function ProtectedPage() {

  return (
    <div className="text-center mt-20">
      <AuthButton />
      <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
      <p className="text-lg text-gray-700">Explore tables:</p>
      <div className="mt-6">
        <Link
          href="/protected/coupons"
          className="btn"
        >
          Coupons
        </Link>
        <Link
          href="/protected/coupon-types"
          className="btn ml-4"
        >
          Coupon Types
        </Link>
      </div>
    </div>


  );
}
