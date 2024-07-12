"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function CouponTypeDetail({ params }: { params: { id: string } }) {
    const id = params.id;
    const router = useRouter()
    const supabase = createClient()
    const [type, setType] = useState<any>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (id) fetchType();
    }, [id]);

    const fetchType = async () => {
        const { data, error } = await supabase
            .from('coupon_types')
            .select(`id, name, description`)
            .eq('id', +id)
            .single();
        if (error) {
            setError(error.message);
            return;
        }
        setType(data);
        setName(data?.name);
        setDescription(data?.description);
    };

    const updateType = async () => {
        const { data, error } = await supabase
            .from('coupon_types')
            .update({ name, description })
            .eq('id', id)
            .single();

        if (!error) {
            router.push(`/protected/coupon-types`);
        } else {
            setError(error.message);
        }
    };

    const deleteType = async () => {
        const { error } = await supabase
            .from('coupon_types')
            .delete()
            .eq('id', id);

        if (!error) {
            router.push(`/protected/coupon-types`);
        } else {
            setError(error.message);
        }
    };
    if (error) return <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
        {error}
    </p>;
    if (!type) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Coupon Type</h1>
            <form onSubmit={updateType}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={deleteType}>Delete</button>
            </form>
            {error && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
