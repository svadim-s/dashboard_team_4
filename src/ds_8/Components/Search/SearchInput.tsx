import React from 'react'
import cls from './SearchInput.module.scss'

interface SearchInputProps {
  input: string
  handleChange: (value: string) => void
}

const SearchInput = ({ input, handleChange }: SearchInputProps) => {
  return (
    <>
      <input
        placeholder='Введите id сотрудника'
        className={cls.input}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  )
}

export default SearchInput
