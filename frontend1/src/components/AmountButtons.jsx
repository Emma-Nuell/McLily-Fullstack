import React from "react"
import PropTypes from 'prop-types'
import { FaMinus, FaPlus } from "react-icons/fa"

const AmountButtons = ({ increase, decrease, quantity }) => {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] items-center gap-6'>
      <button
        type='button'
        className='text-sm p-3 text-text bg-primary-300 hover:bg-primary-400 rounded-md transition-colors'
        onClick={decrease}
      >
        <FaMinus  size={14}/>
      </button>
      <p className='text-base text-text font-semibold mb-0 flex items-center justify-center'>
        {quantity}
      </p>
      <button
        type='button'
        className=' text-sm p-3 text-text bg-primary-300 hover:bg-primary-400 rounded-md transition-colors'
        onClick={increase}
      >
        <FaPlus size={14} />
      </button>
    </div>
  );
};



AmountButtons.propTypes = {
  increase: PropTypes.func,
  decrease: PropTypes.func,
  quantity: PropTypes.number
}


export default AmountButtons;