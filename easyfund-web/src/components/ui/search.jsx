import * as React from "react"
import { Search } from "lucide-react"

export function SearchCommand() {
  return (
    <div className="search-wrapper">
      <Search className="search-icon" />
      <input 
        type="text" 
        placeholder="Search..." 
        className="search-input"
      />
    </div>
  )
} 