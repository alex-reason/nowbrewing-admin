"use client";
import { useState } from "react";

import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { MdOutlineClose } from "react-icons/md";

interface MultiSelectProps {
    placeholder: string;
    value: string[];
    data: CollectionType[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, value, data, onChange, onRemove }) => {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);

    let selected: CollectionType[];

    if (value.length === 0) {
        selected = []
    } else {
        selected = value.map((id) => data.find((c) => c._id === id)) as CollectionType[]
    };

    const selectables = data.filter((collection) => !selected.includes(collection))

    return (
        <Command className="overflow-visible bg-white">
            <div>
                <div className="flex gap-1 flex-wrap rounded-md">
                    {selected.map((collection) => (
                        <Badge key={collection._id} className="bg-grey-3 text-[.7rem] font-light text-white hover:bg-red-2 pointer-events-none">
                            {collection.title}
                            <button className="ml-1 p-[0.2rem] outline-none pointer-events-auto rounded-full" onClick={() => onRemove(collection._id)}>
                                <MdOutlineClose className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>

                <CommandInput
                    placeholder={placeholder}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                />
            </div>
            <div className="mt-2 relative">

                {open && selectables.length > 0 &&
                    <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
                        {selectables.map(item => (
                            <CommandItem
                                key={item._id}
                                onSelect={() => {
                                    onChange(item._id)
                                    setInputValue("")
                                }}
                                className="hover:bg-grey-2 cursor-pointer"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {item.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                }

            </div>
        </Command>
    )
}

export default MultiSelect