import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset } from '../redux/counterSlice';
import { RootState } from '../redux/store';

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  const counterRef = useRef<HTMLDivElement | null>(null);

  const getBackgroundColor = () => {
    const intensity = Math.min(255, Math.max(0, Math.abs(count) * 2));
    return `rgb(${255 - intensity}, ${255 - intensity / 2}, ${255 - intensity / 4})`;
  };
  

  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.style.backgroundColor = getBackgroundColor();
    }
  }, [count]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        ref={counterRef}
        className="p-6 rounded-lg shadow-lg text-center transition-all duration-[400ms] ease-in-out"
      >
        <h2 className="text-xl font-bold">Counter</h2>
        <p className="text-2xl font-bold my-4">{count}</p>
        <div className="flex gap-4">
          <button onClick={() => dispatch(increment())} className="bg-green-500 text-white px-4 py-2 rounded">
            Increment
          </button>
          <button onClick={() => dispatch(decrement())} className="bg-red-500 text-white px-4 py-2 rounded">
            Decrement
          </button>
          <button onClick={() => dispatch(reset())} className="bg-gray-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;