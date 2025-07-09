

// SortSelect.jsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from "@/components/ui/select"; // Update the import path as needed

type Option = {
  value: string;
  label: string;
};

// Define props for the component
interface SortSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const SortSelect = ({ options = [], value, onChange, label = "Filter", placeholder = "Select a sort" }: SortSelectProps) => {
  return (
    <div className="mb-4">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-auto !bg-[var(--color-background)]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            { options.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="cursor-pointer"
                >
                  {item.label}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelect;
