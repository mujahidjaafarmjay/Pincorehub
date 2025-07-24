"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchInputProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  debounceTime?: number
}

export default function SearchInput({
  placeholder = "Search...",
  className,
  onSearch,
  debounceTime = 500,
}: SearchInputProps) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""
  const [inputValue, setInputValue] = useState(initialQuery)
  const debouncedQuery = useDebounce(inputValue, debounceTime)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery)
    } else {
      // Update URL if no custom onSearch handler
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      if (debouncedQuery) {
        current.set("query", debouncedQuery)
      } else {
        current.delete("query")
      }
      const query = current.toString()
      router.push(`?${query}`)
    }
  }, [debouncedQuery, onSearch, router, searchParams])

  const handleClear = () => {
    setInputValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 h-4 w-4 text-gray-400" />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-10 pr-8 bg-gray-800/50 border-gray-600 text-white focus:border-orange-500"
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 h-7 w-7 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
