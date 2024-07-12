"use client"
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
export default function CouponTypesList() {
    const [types, setTypes] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [supabase] = useState(createClient())

    useEffect(() => {
        if (supabase)
            fetchTypes();
    }, [supabase]);

    const fetchTypes = async () => {
        const { data, error } = await supabase
            .from('coupon_types')
            .select(`id, name, description`);

        setTypes(data ?? []);
    };
    
    return (
        <div>
            <h1>Coupon Types</h1>
            <Link
                href="/protected/coupon-types/create"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                Create
            </Link>
            <ul>
                {types.map((type) => (
                    <li key={type.id}>
                        <a href={`/protected/coupon-types/${type.id}`}>{type.name}</a>
                    </li>
                ))}
            </ul>
            {error && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
