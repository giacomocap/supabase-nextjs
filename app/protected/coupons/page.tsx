"use client"
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';

export default function CouponList() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [supabase] = useState(createClient())

    useEffect(() => {
        if (supabase)
            fetchCoupons();
    }, [supabase, sortOrder]);

    const fetchCoupons = async () => {
        const { data, error, status } = await supabase
            .from('coupons')
            .select(`id, code, created_at, type_id, used`)
            .order('created_at', { ascending: sortOrder === 'asc' });

        setCoupons(data ?? []);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Table 1</h2>
            <button onClick={toggleSortOrder}>
                Sort by date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <Link
                href="/protected/coupons/create"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                Create
            </Link>
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Used</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((coupon) => (
                        <tr>
                            <td>{coupon.code}</td>
                            <td>{coupon.used}</td>
                            <td><Link href={`/protected/coupons/${coupon.id}`} className="btn">
                                Detail
                            </Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul>

            </ul>
        </div>
    );
}
