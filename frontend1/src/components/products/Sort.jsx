import { useFilterContext } from "../../context/filter-context";
import { Select } from "radix-ui";
import { ChevronDown, Check, ChevronUp } from "lucide-react";
import React from "react";

const Sort = () => {
  const {
    grid_view,
    setGridView,
    setListView,
    sort,
    updateSort,
  } = useFilterContext();

  return (
    <div className='flex items-center dark:bg-background w-full px-5 mt-4 gap-4 mb-8 py-4 overflow-x-auto whitespace-nowrap scrollbar-hidden  text-text'>
      {/* View Mode Select */}
      <div className='flex items-center gap-4 bg-primary-50 dark:bg-surface p-5 rounded-md'>
        <label htmlFor='view-mode' className='text-sm font-medium'>
          View:
        </label>
        <Select.Root
          value={grid_view ? "grid" : "list"}
          onValueChange={(value) => {
            value === "grid" ? setGridView() : setListView();
          }}
        >
          <Select.Trigger
            id='view-mode'
            className='flex items-center justify-between gap-2 text-sm text-text rounded px-3 py-2 bg-transparent hover:bg-primary-100 dark:hover:bg-gray-700 transition-colors outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-gray-800'
          >
            <Select.Value placeholder='Select view...' />
            <Select.Icon>
              <ChevronDown className='opacity-60' size={18} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className='bg-background-white rounded-md text-text  p-2 shadow-lg border border-gray-200 z-50'>
              <Select.Viewport className='p-1'>
                <Select.Group>
                  <Select.Label className='px-2 py-1 text-xs text-gray-600 dark:text-gray-400'>
                    View Mode
                  </Select.Label>
                  <Select.Item
                    value='grid'
                    className='relative flex items-center px-2 py-2 pl-10 rounded text-sm hover:bg-primary-200 dark:hover:bg-gray-800 outline-none cursor-pointer'
                  >
                    <Select.ItemText>Grid</Select.ItemText>
                    <Select.ItemIndicator className='absolute left-0  inline-flex items-center justify-center'>
                      <Check className='text-primary-500' size={12} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item
                    value='list'
                    className='relative flex items-center px-2 py-2 pl-10 rounded text-sm hover:bg-primary-200 dark:hover:bg-gray-800 outline-none cursor-pointer'
                  >
                    <Select.ItemText>List</Select.ItemText>
                    <Select.ItemIndicator className='absolute left-0  inline-flex items-center justify-center'>
                      <Check className='text-primary-500' size={12} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton className='flex items-center justify-center h-6 bg-white cursor-default'>
                <ChevronDown className='h-4 w-4' />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className='border border-gray-200 h-16 mx-2'></div>

      {/* Sorting Options */}
      <div className='flex items-center gap-4 text-text  bg-primary-50 dark:bg-surface p-5 rounded-md'>
        <span className='text-sm font-medium'>Sort by:</span>
        <div className='flex gap-2'>
          <button
            type='button'
            className={`text-sm px-3 py-2 rounded-md  ${
              sort === "price-low"
                ? "bg-primary-600/60 dark:bg-gray-700/50 text-text"
                : "bg-transparent border border-primary-600 dark:border-gray-600"
            }`}
            onClick={() => updateSort({ target: { value: "price-low" } })}
          >
            Price (Lowest)
          </button>
          <button
            type='button'
            className={`text-sm px-3 py-2 rounded-md ${
              sort === "price-high"
                ? "bg-primary-600/60 dark:bg-gray-700/50 text-text"
                : "bg-transparent border border-primary-600 dark:border-gray-600"
            }`}
            onClick={() => updateSort({ target: { value: "price-high" } })}
          >
            Price (Highest)
          </button>
          <button
            type='button'
            className={`text-sm px-3 py-2 rounded-md ${
              sort === "name-az"
                ? "bg-primary-600/60 dark:bg-gray-700/50 text-text"
                : "bg-transparent border border-primary-600 dark:border-gray-600"
            }`}
            onClick={() => updateSort({ target: { value: "name-az" } })}
          >
            Name (A-Z)
          </button>
          <button
            type='button'
            className={`text-sm px-3 py-2 rounded-md ${
              sort === "name-za"
                ? "bg-primary-600/60 dark:bg-gray-700/50 text-text"
                : "bg-transparent border border-primary-600 dark:border-gray-600"
            }`}
            onClick={() => updateSort({ target: { value: "name-za" } })}
          >
            Name (Z-A)
          </button>
          <button
            type='button'
            className={`text-sm px-3 py-2 rounded-md ${
              sort === "newest"
                ? "bg-primary-600/60 dark:bg-gray-700/50 text-text"
                : "bg-transparent border border-primary-600 dark:border-gray-600"
            }`}
            onClick={() => updateSort({ target: { value: "newest" } })}
          >
            Newest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;
