import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
    const supabase = createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/");
    }
    return (
        <div className="h-screen flex overflow-hidden">
            <Head>
                <title>My App</title>
            </Head>
            <aside className="bg-gray-200 w-64 h-screen p-4 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Menu</h2>
                <ul className="list-none mb-4">
                    <li>
                        <Link href="/protected/coupons" legacyBehavior>
                            <a className="block py-2 px-4 hover:bg-gray-300 text-gray-600">
                                Coupons
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/protected/coupon-types" legacyBehavior>
                            <a className="block py-2 px-4 hover:bg-gray-300 text-gray-600">
                                Coupon Types
                            </a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
