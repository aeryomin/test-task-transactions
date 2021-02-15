import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TransactionRow from './TransactionRow'
import SortIcon from './SortIcon'
import {
  toggleDateSortOptions,
  setTransactionsToRender
} from '../../../redux/actionCreators/transactionsToRenderActionCreator'

const TransactionsHistory = (props) => {
  const dispatch = useDispatch()
  const { users, setInputUserValue, setInputPWValue } = props
  const { payments } = useSelector((s) => s.transactions.transactions)
  const { sortOption, transactionsToRender } = useSelector(
    (s) => s.transactionsToRender
  )
  const [matches, setMatches] = useState(
    window.matchMedia('(min-width: 768px)').matches
  )
  const scrollElem = useRef(null)
  const [padding, setPadding] = useState('0')
  const [currentEl, setCurrentEl] = useState()

  function getScrollbarWidth(elem) {
    if (elem.current === document.body) {
      return window.innerWidth - document.documentElement.clientWidth
    }
    if (elem.current !== null) {
      return elem.current.offsetWidth - elem.current.clientWidth
    }
    return '0'
  }

  useEffect(() => {
    if (scrollElem.current !== null) {
      setPadding(getScrollbarWidth(scrollElem))
    }
  }, [currentEl])

  useEffect(() => {
    const handler = (e) => setMatches(e.matches)
    window.matchMedia('(min-width: 768px)').addListener(handler)
  }, [])

  useEffect(() => {
    dispatch(setTransactionsToRender(sortOption))
  }, [sortOption, payments])

  return (
    <div className="h-1/3 w-full md:w-1/2 m-2">
      TransactionsHistory
      <div className="w-full h-full border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <div
          className="w-full "
          style={
            matches ? { paddingRight: `${padding}px` } : { paddingRight: '0px' }
          }
        >
          <div className="flex w-full text-blue-500">
            <div className="w-1/3 flex">
              Date{' '}
              <button
                type="button"
                className="ml-6"
                onClick={() => {
                  dispatch(toggleDateSortOptions())
                  // dispatch(setTransactionsToRender(sortOption))
                }}
              >
                <SortIcon />
              </button>
            </div>
            <div className="w-1/4">Name</div>
            <div className="w-1/5">Amount</div>
            <div className="w-1/5">Balance</div>
          </div>
        </div>
        {!!transactionsToRender && (
          <div
            ref={(el) => {
              setCurrentEl(scrollElem.current)
              scrollElem.current = el
            }}
            className="w-full h-5/6 overflow-y-auto"
          >
            {transactionsToRender.map((transaction) => {
              return (
                <TransactionRow
                  key={transaction._id}
                  transaction={transaction}
                  setInputUserValue={setInputUserValue}
                  setInputPWValue={setInputPWValue}
                  users={users}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsHistory
