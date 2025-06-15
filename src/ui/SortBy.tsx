import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "react-router"



// const options: SortOptions[] = [
//     {
//         value: 'date-desc', 
//         label: "Sort by date (recent first)"
//     },
//     {
//         value: 'date-asc', 
//         label: "Sort by date (old first)"
//     }
// ]

export const SortBy = ({options}: {options: SortOptions[]}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const sortValue = String(searchParams.get('sort') || String(options[0]?.value));

    const handleclick = (value: string) => {
        searchParams.set("sort", value);
        setSearchParams(searchParams);
    }

    return (
        <>

            <Select  defaultValue={sortValue} onValueChange={(e) => handleclick(e)}>
                <SelectTrigger className="w-auto !bg-[var(--color-background)]" >
                    <SelectValue placeholder="Select a sort"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Filter</SelectLabel>

                        {options.map(item => (
                            <SelectItem
                                key={item.value} 
                                value={item.value}
                                className="cursor-pointer"
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                   
                    </SelectGroup>
                </SelectContent>
            </Select>
        
        </>
    )
}

export interface SortOptions {
    value: string,
    label: string
}
