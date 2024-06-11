import React from 'react'

const CartItem = () => {
  return (
    <div>
      <div className="flex gap-4">
        <div className="rounded-lg w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] items-baseline overflow-hidden">
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="w-full"
          />
        </div>
        <div>
            <h4>Name</h4>
            
        </div>
      </div>
      <div className="flex flex-col justify-between"></div>
    </div>
  );
}

export default CartItem