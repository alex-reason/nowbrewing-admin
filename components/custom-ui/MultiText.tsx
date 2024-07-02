"use client"
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({ placeholder, value, onChange, onRemove }) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item)
    setInputValue("")
  }

  return (
    <div className="flex flex-col">
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge
            className="bg-grey-3 text-[.7rem] font-light text-white hover:bg-red-2 pointer-events-none"
            key={`${item}-${index} `}
          >
            {item}
            <button
              className="ml-1 p-[0.2rem] my-0 outline-none pointer-events-auto rounded-full"
              onClick={() => onRemove(item)}
            >
              <MdOutlineClose className="h-3 w-3 " />
            </button>
          </Badge>
        ))}
      </div>

    </div>
  )
}

export default MultiText