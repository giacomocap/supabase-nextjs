"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import { createClient } from '@/utils/supabase/client';

export default function CreateCoupon() {
    const supabase = createClient()
    const router = useRouter();
    const [typeId, setTypeId] = useState('');
    const [details, setDetails] = useState('');
    const [couponTypes, setCouponTypes] = useState<{
        id: any;
        name: any;
    }[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchCouponTypes = async () => {
        const { data, error } = await supabase
            .from('coupon_types')
            .select(`id, name`);
        if (error)
            setError(error.message);
        setCouponTypes(data ?? []);
    };

    useEffect(() => {
        fetchCouponTypes();
    }, []);

    const createCoupon = async () => {
        if (!typeId) {
            alert("Please select a coupon type");
            return;
          }
        const code = nanoid();
        const { data, error } = await supabase
            .from('coupons')
            .insert([{ code, type_id: typeId, details }]);

        if (!error) {
            router.push(`/protected/coupons`);
        } else {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Create Coupon</h1>
            <div>
                <label>
                    Type:
                    <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
                        {couponTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Details:
                    <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
                </label>
                <button onClick={() => createCoupon()}>Create</button>
            </div>
            {error && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
