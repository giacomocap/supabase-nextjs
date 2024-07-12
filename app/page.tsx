import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="w-full justify-center flex gap-6">
          {isSupabaseConnected && (
            <div className="flex justify-center flex-wrap gap-2">
              {[
                { href: "/protected/coupons", text: "Coupons" },
                { href: "/protected/coupon-types", text: "Coupon Types" },
              ].map(({ href, text }) => (
                <div
                  key={href}
                  className="bg-white rounded-md shadow-md p-4 w-48 hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <Link href={href}>
                    <span className="text-foreground text-sm">{text} &raquo;</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
