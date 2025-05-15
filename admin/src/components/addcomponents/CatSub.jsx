import { Form } from "radix-ui";
import { Select } from "radix-ui";
import { categories } from "../../lib/constants";
import { ArrowDown } from "lucide-react";

const CatSub = ({ category, subCategory, setCategory, setSubCategory, categoryField}) => {
  return (
    <>
      <div className='flex items-baseline justify-end'>
        <span className={`text-[13px] text-red-500 opacity-80 ${!categoryField && "hidden"}`}>
          Please select a category and sub-category
        </span>
      </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 mt-10 gap-8'>
      <Form.Field
        className='mb-4 flex items-start md:items-center flex-col md:flex-row gap-8'
        name='category'
      >
        <Form.Label className='text-lg font-medium leading-[35px] text-black  dark:text-white'>
          Category
        </Form.Label>
        <Form.Message
          className='text-[13px] text-black dark:text-red-500 opacity-80'
          match='valueMissing'
        >
          Please select a category
        </Form.Message>

        <Form.Control asChild>
          <Select.Root value={category} onValueChange={setCategory} required>
            <Select.Trigger className='flex items-center justify-between w-full md:w-7/10 h-full p-2 border rounded-md dark:text-white outline-none pl-6  border-aquamine-3 dark:border-slate-950  cursor-pointer'>
              <Select.Value placeholder='Select a category' />
              <Select.Icon>
                <ArrowDown />
              </Select.Icon>{" "}
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className='bg-white dark:bg-slate-800 rounded-lg shadow-md p-4'>
                <Select.Viewport>
                  {categories.map((cat, index) => {
                    return (
                      <Select.Item
                        key={index}
                        value={cat.category}
                        className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md'
                      >
                        <Select.ItemText className='font-poppins'>
                          {cat.category}
                        </Select.ItemText>
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Form.Control>
      </Form.Field>
      <Form.Field
        className='mb-4 flex items-start md:items-center flex-col md:flex-row gap-8'
        name='sub-category'
      >
        <Form.Label className='text-lg font-medium leading-[35px] text-black dark:text-white'>
          Sub-Category
        </Form.Label>
        <Form.Message
          className='text-[13px] text-black dark:text-white opacity-80'
          match='valueMissing'
        >
          Please select a Sub-category
        </Form.Message>
        <Form.Control asChild>
          <Select.Root
            value={subCategory}
            onValueChange={setSubCategory}
            required
          >
            <Select.Trigger
              className={`flex justify-between border-aquamine-3 dark:border-slate-950  border-1 items-center w-full md:w-7/10 h-full p-2 pl-6 outline-none rounded-md text-black dark:text-white ${
                category ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              <Select.Value
                placeholder={`${
                  category ? "Select a sub-category" : "Select a category first"
                }`}
              />
              <Select.Icon>
                <ArrowDown />
              </Select.Icon>{" "}
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className='bg-white dark:bg-slate-800 rounded-lg shadow-md p-4'>
                <Select.Viewport>
                  {categories.find((cat) => cat.category === category)
                    ?.subCategories.length > 0 ? (
                    categories
                      .find((cat) => cat.category === category)
                      ?.subCategories.map((subCat, index) => (
                        <Select.Item
                          key={index}
                          value={subCat}
                          className='p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white outline-none rounded-md'
                        >
                          <Select.ItemText>{subCat}</Select.ItemText>
                        </Select.Item>
                      ))
                  ) : (
                    <div className='text-gray-500 p-2'>
                      No sub-categories available
                    </div>
                  )}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Form.Control>
      </Form.Field>
      </div>
      </>
  );
};
export default CatSub;
