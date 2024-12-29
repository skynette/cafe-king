import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "restaurant name is required"
    }).min(1, "restaurant name is required")
})

type SearchBarProps = {
    searchQuery: string
    onSubmit: (formData: SearchForm) => void
    placeholder: string
    onReset?: () => void
}

export type SearchForm = z.infer<typeof formSchema>

const SearchBar = ({ onSubmit, placeholder, onReset, searchQuery="" }: SearchBarProps) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: searchQuery
        }
    })

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        })

        if (onReset) {
            onReset()
        }
    }

    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])

    return (
        <Form {...form}>
            <form
                className={
                    cn('flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3',
                        { 'border-red-500': form.formState.errors.searchQuery }
                    )}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Search strokeWidth={2.5} size={30} className="ml-1 text-primary hidden md:block" />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => <FormItem className="flex-1">
                        <FormControl>
                            <Input
                                {...field}
                                className="border-none shadow-none focus-visible:ring-0 text-xl"
                                placeholder={placeholder}
                            />
                        </FormControl>
                    </FormItem>}
                />
                <Button
                    onClick={handleReset}
                    type="button"
                    variant={"outline"}
                    className="rounded-full">
                    reset
                </Button>
                <Button
                    type="submit"
                    className="rounded-full bg-primary"
                >
                    search
                </Button>
            </form>
        </Form>
    )
}

export default SearchBar