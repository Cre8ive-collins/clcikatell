
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { debounce } from '@/utils/debounce';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');


  const debouncedSearch = React.useMemo(
    () => debounce((term: string) => {
      onSearch(term);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search activities..."
        value={inputValue}
        onChange={handleInputChange}
        className="pl-10 bg-secondary border-secondary"
      />
    </div>
  );
};

export default SearchBar;
