"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function CreateCouponType() {
    const supabase = createClient()
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);

    const createType = async () => {
        const { data, error } = await supabase
            .from('coupon_types')
            .insert([{ name, description }]);

        if (!error) {
            router.push(`/protected/coupon-types`);
        } else {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Create Coupon Type</h1>
            <div>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button onClick={() => createType()}>Create</button>
            </div>
            {error && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
