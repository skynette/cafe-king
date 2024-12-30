import { cuisineList } from "@/config/restaurantOptions"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"
import { ChevronUp } from "lucide-react"

type CuisineFilterProps = {
    onChange: (cuisines: string[]) => void
    selectedCuisines: string[]
    isExpanded: boolean
    onExpandedClick: () => void
}

const CuisineFilter = ({ isExpanded, onChange, onExpandedClick, selectedCuisines }: CuisineFilterProps) => {

    const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value
        const isChecked = event.target.checked

        const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)

        onChange(newCuisinesList)
    }

    const handleCuisinesReset = () => onChange([])

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter by cuisine</div>
                <div onClick={handleCuisinesReset} className="text-md font-semibold mb-2 underline cursor-pointer text-primary">Reset Filters</div>
            </div>

            <div className="flex flex-wrap gap-2">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine)
                    return (
                        <div key={cuisine} className="flex">
                            <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisineChange} />

                            <Label htmlFor={`cuisine_${cuisine}`} className={cn(
                                'flex items-center cursor-pointer text-sm rounded-full py-1 px-4 font-semibold border border-slate-300',
                                {
                                    'border-green-600 text-green-600': isSelected
                                }
                            )}>
                                {cuisine}
                            </Label>
                        </div>
                    )
                })}

                <Button onClick={onExpandedClick} variant={'link'} className="mt-4 w-full">
                    {isExpanded ?
                        (<span className="flex flex-row items-center">view less <ChevronUp /></span>)
                        : (<span className="flex flex-row items-center">view more</span>)}
                </Button>
            </div>
        </>
    )
}

export default CuisineFilter
