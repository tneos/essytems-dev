import * as React from "react";
import {Control, Form} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {Button} from "./ui/button";
import {ChevronDownIcon} from "lucide-react";
import {Label} from "./ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Calendar} from "./ui/calendar";
import {Input} from "./ui/input";

// Define props
type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
};

// type CustomFormDateProps = {
//     open: boolean;
//     date: Date;
// }

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: string[];
  labelText?: string;
};

export function CustomFormField({name, control}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function CustomFormDate() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="date" className="px-1 mt-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="gap-4 mt-3 justify-between font-normal">
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={date => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function CustomFormSelect({name, control, items, labelText}: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => {
        return (
          <FormItem>
            <FormLabel className="capitalize">{labelText || name}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map(item => {
                  return (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
