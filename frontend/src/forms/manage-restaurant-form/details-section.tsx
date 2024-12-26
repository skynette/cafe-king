import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'


const DetailSection = () => {
    const { control } = useFormContext()

    return (
        <div className='space-y-2'>
            <div>
                <h2 className='text-2xl font-bold'>Details</h2>
                <FormDescription>
                    Enter details about your restaurant
                </FormDescription>
            </div>

            <FormField
                control={control}
                name='restaurantName'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className='bg-white' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className='flex gap-4'>
                <FormField
                    control={control}
                    name='city'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name='country'
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={control}
                name='estimatedDeliveryTime'
                render={({ field }) => (
                    <FormItem className='md:max-w-[25%]'>
                        <FormLabel>Estimated Delivery Time (in mins)</FormLabel>
                        <FormControl>
                            <Input {...field} className='bg-white' placeholder='30' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='deliveryPrice'
                render={({ field }) => (
                    <FormItem className='md:max-w-[25%]'>
                        <FormLabel>Delivery Price (NGN)</FormLabel>
                        <FormControl>
                            <Input {...field} className='bg-white' placeholder='500' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default DetailSection