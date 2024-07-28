import { useState, useEffect } from 'react';

export interface CheckboxItem {
  name: string;
  checked: boolean;
}

const useCheckbox = (key: string, initialData: CheckboxItem[]) => {
  const [data, setData] = useState<CheckboxItem[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const newData = initialData.map(item => ({
        ...item,
        checked: parsedData[item.name] !== undefined ? parsedData[item.name] : item.checked,
      }));
      setData(newData);
    } else {
      setData(initialData);
    }
  }, [key, initialData]);

  const handleCheckBoxChange = (index: number, checked: boolean) => {
    const newData = data.map((item, idx) =>
      idx === index ? { ...item, checked } : item
    );
    setData(newData);
    saveToLocalStorage(newData);
  };

  const handleToggleAll = (checked: boolean) => {
    const newData = data.map(item => ({ ...item, checked }));
    setData(newData);
    saveToLocalStorage(newData);
  };

  const saveToLocalStorage = (data: CheckboxItem[]) => {
    localStorage.setItem(
      key,
      JSON.stringify(
        data.reduce((acc, item) => {
          acc[item.name] = item.checked;
          return acc;
        }, {} as Record<string, boolean>)
      )
    );
  };

  return { data, handleCheckBoxChange, handleToggleAll };
};

export default useCheckbox;
