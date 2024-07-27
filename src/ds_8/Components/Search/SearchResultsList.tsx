import React from 'react'
import cls from './SearchResultsList.module.scss'

interface SearchResultsListProps {
  results: { id: number }[]
  handleSelect: (value: number) => void
}

const SearchResultsList = ({ results, handleSelect }: SearchResultsListProps) => {
  return (
    <div className={cls.resultsList}>
      {results.map(item => (
        <div
          key={item.id}
          className={cls.resultItem}
          onClick={() => handleSelect(item.id)}
        >
          {item.id}
        </div>
      ))}
    </div>
  )
}

export default SearchResultsList
