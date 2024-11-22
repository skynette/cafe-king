import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { cuisineList } from '@/config/restaurantOptions'
import { useFormContext } from 'react-hook-form'
import CusineCheckbox from './cuisine-checkbox'

const CuisineSection = () => {
    const { control } = useFormContext()
    console.log({ cuisineList })
    return (
        <div className='space-y-2'>
            <div>
                <h2 className='text-2xl font-bold'>Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField
                control={control}
                name='cuisines'
                render={({ field }) => (
                    <FormItem>
                        <div className='grid md:grid-cols-5 gap-1'>
                            {cuisineList.map((cuisineItem) => (
                                <CusineCheckbox key={cuisineItem} cuisine={cuisineItem} field={field} />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default CuisineSection