'use client'
import { mock } from '@/utils/test'
import { useEffect, useMemo, useState } from 'react'

export default function Home() {
  const [zoneList, setZoneList] = useState<any>(null)
  const [selectProvince, setSelectProvince] = useState<any>({
    west: [],
    north: [],
    south: [],
  })
  const [finalList, setFinalList] = useState<any>([])
  const [selectFinal, setSelectFinal] = useState<any>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    setZoneList(mock.data)
  }, [mock])

  const onCheckAll = (zone: string, check: boolean) => {
    const all = { ...selectProvince }
    all[zone] = check ? Object.keys(zoneList[zone]).map((item) => item) : []
    setSelectProvince({ ...all })
  }

  const onCheck = (zone: string, province: string) => {
    const all = { ...selectProvince }
    if (all[zone].includes(province)) {
      all[zone] = all[zone].filter((item: string) => item !== province)
      if (selectFinal.length) {
        let finalData = [...selectFinal]
        // console.log('zoneList[zone][province]',zoneList[zone][province])
        zoneList[zone][province].forEach((final: string) => {
          finalData = finalData.filter((v) => v !== final)
        })
        setSelectFinal(finalData)
      }
    } else {
      all[zone].push(province)
    }
    setSelectProvince({ ...all })
  }

  const onCheckFinal = (final: string) => {
    let all = [...selectFinal]
    if (all.find((v) => v === final)) {
      all = all.filter((item: string) => item !== final)
    } else {
      all.push(final)
    }
    setSelectFinal([...all])
  }

  const onCheckFinalAll = () => {
    let all = [...selectFinal]
    if (all.length) {
      all = []
    } else {
      all.push(...finalList)
    }
    setSelectFinal([...all])
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    let result: any = []
    Object.keys(selectProvince).forEach((zone) => {
      selectProvince[zone].forEach((v: any, i: number) => {
        let province = v
        let district = zoneList[zone][province]
        result.push(...district)
      })
    })

    setFinalList([...result])
  }, [selectProvince])

  const renderFinalList = useMemo(() => {
    const list = finalList?.filter((item: string) => {
      return item.toLowerCase().includes(search.toLowerCase())
    })
    return (
      list && (
        <ul className='p-[6px] max-h-[400px]'>
          {!!finalList.length && (
            <li className='flex items-center mb-4'>
              <input
                onChange={(e) => onCheckFinalAll()}
                checked={selectFinal?.length}
                id={`final-all`}
                type='checkbox'
                className='cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor={`final-all`}
                className='cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Select All
              </label>
            </li>
          )}
          {list.map((item: string) => {
            return (
              <li className='flex items-center mb-4' key={`final-${item}`}>
                <input
                  onChange={(e) => onCheckFinal(item)}
                  checked={selectFinal?.includes(item)}
                  id={`final-${item}`}
                  type='checkbox'
                  className='cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor={`final-${item}`}
                  className='cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  {item}
                </label>
              </li>
            )
          })}
        </ul>
      )
    )
  }, [search, finalList, selectFinal])

  return (
    <main className='flex min-h-screen flex-col items-center gap-[20px] p-24'>
      <div className='w-full flex'>
        <div className='w-[50%]'>
          <h1 className='text-gray-900 text-[20px] font-[600]'>
            Zone/Province
          </h1>
          {zoneList && (
            <ul className='mt-[20px]'>
              {Object.keys(zoneList).map((zone) => {
                return (
                  <ul key={`zone-${zone}`}>
                    <li className='flex items-center mb-4'>
                      <input
                        onChange={(e) => onCheckAll(zone, e.target.checked)}
                        checked={selectProvince[zone].length}
                        id={`zone-${zone}`}
                        type='checkbox'
                        className='cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor={`zone-${zone}`}
                        className='cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        {zone}
                      </label>
                    </li>
                    <ul className='ml-[40px]'>
                      {Object.keys(zoneList[zone]).map((province) => {
                        return (
                          <li
                            className='flex items-center mb-4'
                            key={`zone-${zone}province-${province}`}
                          >
                            <input
                              onChange={(e) => onCheck(zone, province)}
                              id={`zone-${zone}province-${province}`}
                              checked={selectProvince[zone].includes(province)}
                              type='checkbox'
                              className='cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            />
                            <label
                              htmlFor={`zone-${zone}province-${province}`}
                              className='cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                            >
                              {province}
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </ul>
                )
              })}
            </ul>
          )}
        </div>
        <div className='w-[50%] bg-[#f3f3f3] max-h-[500px] rounded-lg p-[20px] '>
          <div>
            <input
              onChange={handleInput}
              id='search'
              name='search'
              className='appearance-none rounded-[30px] block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              type='text'
              placeholder='Search...'
            />
          </div>
          <div className='overflow-auto max-h-[400px] mt-[20px]'>
            {renderFinalList}
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h1 className='text-gray-900 text-[20px] font-[600]'>Result</h1>
        <div className='flex gap-[10px] flex-wrap'>
          {selectFinal.map((item: string) => {
            return (
              <span
                className='bg-[#c5ddf4] rounded-[20px] py-[4px] px-[10px]'
                key={`selectFinal-${item}`}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>
    </main>
  )
}
