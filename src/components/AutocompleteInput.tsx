import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface AutocompleteInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder: string;
  required?: boolean;
  filterFunction: (query: string) => string[];
  onAdd?: (value: string) => void;
  onMoveNext?: () => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  filterFunction,
  onAdd,
  onMoveNext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    if (inputValue.trim()) {
      const filtered = filterFunction(inputValue);
      setFilteredSuggestions(filtered);
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    setFilteredSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleAddCustom = () => {
    if (value.trim() && onAdd) {
      onAdd(value.trim());
      setIsOpen(false);
      setFilteredSuggestions([]);
      setHighlightedIndex(-1);
      
      // Move to next field if callback provided
      if (onMoveNext) {
        setTimeout(() => onMoveNext(), 100);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredSuggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        // Show all suggestions when arrow down is pressed
        const allSuggestions = filterFunction(value || '');
        if (allSuggestions.length > 0) {
          setFilteredSuggestions(allSuggestions);
          setIsOpen(true);
        }
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          handleSelect(filteredSuggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    if (value.trim()) {
      const filtered = filterFunction(value);
      setFilteredSuggestions(filtered);
      if (filtered.length > 0) {
        setIsOpen(true);
      }
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      const filtered = filterFunction(value || '');
      setFilteredSuggestions(filtered.slice(0, 10)); // Show top 10 initially
      setIsOpen(true);
      inputRef.current?.focus();
    } else {
      setIsOpen(false);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && wrapperRef.current) {
      const listItem = wrapperRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      );
      listItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder={placeholder}
          required={required}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              data-index={index}
              onClick={() => handleSelect(suggestion)}
              className={`w-full text-left px-4 py-2.5 hover:bg-purple-50 transition-colors flex items-center justify-between ${
                index === highlightedIndex ? 'bg-purple-50' : ''
              } ${value === suggestion ? 'bg-purple-100' : ''}`}
            >
              <span className="text-sm text-gray-700">{suggestion}</span>
              {value === suggestion && (
                <Check className="h-4 w-4 text-purple-600" />
              )}
            </button>
          ))}
          
          {/* Add custom entry button - only show if value doesn't exactly match any suggestion (case-insensitive) */}
          {onAdd && value.trim() && !filteredSuggestions.some(s => s.toLowerCase() === value.trim().toLowerCase()) && (
            <div className="border-t border-gray-200 p-2">
              <button
                type="button"
                onClick={handleAddCustom}
                className="w-full text-left px-3 py-2 bg-gradient-to-r from-purple-50 to-emerald-50 hover:from-purple-100 hover:to-emerald-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-purple-700">
                  ➕ Add "{value.trim()}" and continue
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {isOpen && filteredSuggestions.length === 0 && value.trim() && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-600 mb-2">
            No matches found for "{value.trim()}"
          </p>
          {onAdd && (
            <button
              type="button"
              onClick={handleAddCustom}
              className="w-full text-left px-3 py-2 bg-gradient-to-r from-purple-50 to-emerald-50 hover:from-purple-100 hover:to-emerald-100 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium text-purple-700">
                ➕ Add "{value.trim()}" and continue
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;

