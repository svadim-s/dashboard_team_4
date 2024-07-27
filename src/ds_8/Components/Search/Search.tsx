import React, { useEffect, useState } from 'react'
import cls from './Search.module.scss'
import SearchInput from './SearchInput'
import SearchResultsList from './SearchResultsList'
import { useAppDispatch, useAppSelector } from '../../common/hooks/useAppDispatch';
import { UserResponse, fetchUsers } from '../../services/fetchUsers';

interface SearchProps {
  title: string
  storageKey: string
  onChange: (storageKey: string, value: string) => void
  initialData: string
}

const Search = ({ title, storageKey, onChange, initialData }: SearchProps) => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.users)
  const [input, setInput] = useState(initialData)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    const savedInput = localStorage.getItem(storageKey);
    if (savedInput) {
      setInput(JSON.parse(savedInput));
    }
  }, [storageKey]);

  const handleChange = (value: string) => {
    setInput(value)
    setShowResults(true)
  }

  const handleSelect = (value: number) => {
    const stringValue = value.toString();
    setInput(stringValue);
    setShowResults(false);
    onChange(storageKey, stringValue);
  };

  const filteredData = data
    .map((item: UserResponse) => ({ id: item.users_user_id }))
    .filter(item => item.id.toString().includes(input));

  return (
    <div className={cls.Search}>
      <p className={cls.title}>{title}</p>
      <SearchInput input={input} handleChange={handleChange} />
      {showResults && input && (
        <SearchResultsList results={filteredData} handleSelect={handleSelect} />
      )}
    </div>
  )
}

export default Search
