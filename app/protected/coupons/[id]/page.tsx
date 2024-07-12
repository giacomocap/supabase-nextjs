"use client"
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function CouponDetail({ params }: { params: { id: string } }) {
    const id = params.id;
    const [coupon, setCoupon] = useState<any | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const [supabase] = useState(createClient())

    useEffect(() => {
        if (supabase && id && !coupon)
            fetchCoupon();
    }, [supabase, id]);

    const fetchCoupon = async () => {
        const { data, error } = await supabase
            .from('coupons')
            .select(`id, code, created_at, type_id, used, details`)
            .eq('id', id)
            .single();
        if (error) {
            setError(error.message);
            return;
        }
        setCoupon(data);
    };

    const toggleUsedStatus = async () => {
        const { data, error } = await supabase
            .from('coupons')
            .update({ used: !coupon.used })
            .eq('id', id)
            .single();

        if (!error) {
            fetchCoupon()
        } else {
            setError(error.message);
        }
    };

    if (error) return <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
        {error}
    </p>;
    if (!coupon) return <div>Loading...</div>;

    return (
        <div>
            <h1>Coupon Detail</h1>
            <p>Code: {coupon.code}</p>
            <p>Created At: {coupon.created_at}</p>
            <p>Used: {coupon.used ? 'Yes' : 'No'}</p>
            <p>Details: {coupon.details}</p>
            <button onClick={toggleUsedStatus}>
                Mark as {coupon.used ? 'Not Used' : 'Used'}
            </button>
            {error && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
