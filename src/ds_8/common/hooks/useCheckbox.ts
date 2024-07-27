import { useState, useEffect } from 'react';

interface CheckboxItem {
  name: string;
  checked: boolean;
}

const useCheckbox = (key: string, initialData: CheckboxItem[]) => {
  const [data, setData] = useState<CheckboxItem[]>(initialData);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const newData = initialData.map(item => ({
        ...item,
        checked: parsedData[item.name] !== undefined ? parsedData[item.name] : item.checked,
      }));
      setData(newData);
    }
  }, [key, initialData]);

  const handleCheckBoxChange = (index: number, checked: boolean) => {
    const newData = [...data];
    newData[index].checked = checked;
    setData(newData);
  };

  const handleToggleAll = (checked: boolean) => {
    const newData = data.map(item => ({ ...item, checked }));
    setData(newData);
  };

  const saveToLocalStorage = () => {
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

  return { data, handleCheckBoxChange, saveToLocalStorage, handleToggleAll };
};

export default useCheckbox;
