'use client';
import { AutoComplete } from '@libs/ui';
import { Gps, MagnifyingGlass } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Size = 'sm' | 'md' | 'lg'; // Define the size type

interface SearchProps {
  size?: Size; // Add size prop to the interface
}

export default function Search({ size = 'lg' }: SearchProps) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]); // Store search results
  const [loading, setLoading] = useState(false); // Show loading state

  // Function to fetch search results based on input query
  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://vcall.aairavx.com/api/search?q=${query}`); // Use the API endpoint
      const data = await response.json();
      setSearchResults(data); // Set search results based on API response
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row shadow-md">
      {/* Location Input */}
      <AutoComplete
        inputProps={{
          leftIcon: <Gps />,
          className: 'rounded-r-none bg-white border-gray-400 dark:border-gray-500',
          size: size,
        }}
        placeholder="Location.."
        options={[
          { label: 'Bengaluru', value: 'bengaluru' },
          { label: 'Mumbai', value: 'mumbai' },
          { label: 'Delhi', value: 'delhi' },
          { label: 'Hyderabad', value: 'hyderabad' },
        ]}
      />
      
      {/* Search Input */}
      <div className="flex-grow">
        <AutoComplete
          onSelect={(item) => {
            router.push(`/search/${item.value}`);
          }}
          inputProps={{
            leftIcon: <MagnifyingGlass />,
            size: size,
            className: 'rounded-l-none border-l-0 border-gray-400 dark:border-gray-500',
          }}
          withSection
          placeholder="Search Doctors, Clinics, Hospitals.."
          onChange={(e) => {
            const query = e.target.value;
            if (query.length > 2) { // Start searching after 3 characters
              fetchSearchResults(query);
            }
          }}
          options={loading ? [{ label: 'Loading...', value: '' }] : searchResults.map(result => ({
            label: result.name, // Adjust based on the API response structure
            value: result.id, // Adjust based on the API response structure
          }))}
        />
      </div>
    </div>
  );
}
