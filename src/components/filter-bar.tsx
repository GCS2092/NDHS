"use client"

import { Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

interface FilterBarProps {
  onSearch?: (query: string) => void
  onFilter?: (filter: string) => void
  filters?: string[]
  placeholder?: string
}

export function FilterBar({ 
  onSearch, 
  onFilter, 
  filters = [], 
  placeholder = "Rechercher..." 
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) onSearch(query)
  }

  const handleFilter = (filter: string) => {
    setActiveFilter(filter)
    if (onFilter) onFilter(filter)
  }

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-4 mb-8 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Filter Buttons */}
        {filters.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <button
              onClick={() => handleFilter('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 hover:bg-muted text-foreground'
              }`}
            >
              Tous
            </button>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 hover:bg-muted text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
