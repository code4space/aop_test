"use client"

//* ICONS
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

import { fetchJobs } from '@/store/actions/jobAction';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/input';
import LoadingUI from '@/components/loading';
import { RootState } from '@/store/index';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    fulltime: false,
    location: '',
    description: ''
  })

  const dispatch = useDispatch();
  const { jobs, page, totalPages } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
    setLoading(false)
  }, []);

  function getCompanyName(url: string) {
    var match = url.match(/:\/\/(?:www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 1 && typeof match[1] === 'string' && match[1].length > 0) {
      var domainWithoutTLD = match[1].replace(/\..*$/, '').replace(/-/g, ' ');
      return domainWithoutTLD;
    } else {
      return null;
    }
  }

  const memoizedCalculateTimeDifference = useMemo(() => {
    return (targetDate: string) => calculateTimeDifference(targetDate);
  }, []);

  async function navigate(p: number = 1) {
    setLoading(true);
    try {
      await dispatch(fetchJobs({ page: p, ...filter }));
    } finally {
      setLoading(false);
    }
  }


  function calculateTimeDifference(targetDate: string): string {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate);
    const timeDifference = currentDate.getTime() - targetDateTime.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsDifference = Math.floor(daysDifference / 30.44); // Average number of days in a month
    const yearsDifference = Math.floor(monthsDifference / 12);

    if (yearsDifference > 0) {
      return `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
    } else if (monthsDifference > 0) {
      return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
    } else if (daysDifference > 0) {
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    } else {
      return 'Today';
    }
  }

  async function search() {
    setLoading(true);
    try {
      await dispatch(fetchJobs({ ...filter }));
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingUI />
  return (
    <>
      <div className='pt-5 px-10'>
        <div className='w-full border-b border-gray-500 flex gap-2 pb-3 flex-col md:flex-row md:justify-center'>
          <div className=' md:w-1/4'>
            <Input placeHolder='Job Description' state={filter} setState={setFilter} value='description'></Input>
          </div>
          <div className=' md:w-1/4'>
            <Input placeHolder='Location' state={filter} setState={setFilter} value='location'></Input>
          </div>
          <div className='flex items-center gap-2 border border-gray-300 text-gray-700 p-1 rounded'>
            <div className="cntr">
              <input checked={filter.fulltime} type="checkbox" id="cbx" className='hidden'
                onChange={() => setFilter((prev) => ({ ...prev, fulltime: !prev.fulltime }))} />
              <label htmlFor="cbx" className="cbx"></label>
            </div>
            <span>Full Time</span>
          </div>
          <button onClick={search} className='md:ml-9 search inline-block border border-gray-500 rounded transition-all ease-in duration-200 relative overflow-hidden text-gray-600 p-1 text-sm z-10 px-3' >Search</button>
        </div>
        <div className='flex flex-col gap-3 pt-3'>
          {jobs.map((el, i) => {
            return (
              <Link href={`/job/${el.id}`} key={i} className='w-full border rounded border-gray-300 p-3 shadow flex flex-col md:flex-row group hover:border-blue-500 cursor-pointer'>
                <img src={el.company_logo} alt="company_logo" className='bg-contain w-24 h-24 mx-auto md:mx-0' />
                <div className='md:ml-3'>
                  <h1 className=' text-lg text-gray-800 text-center md:text-left group-hover:text-blue-500'><b>{el.title}</b></h1>
                  <p className=' text-slate-800 text-center md:text-left'>PT. {getCompanyName(el.company_url)}</p>
                  <div className='flex mt-4 text-gray-500 gap-1 md:gap-4 flex-col md:flex-row text-sm md:text-base'>
                    <p className=''><LocationOnIcon />{el.location}</p>
                    <p className=''><CalendarMonthIcon />{memoizedCalculateTimeDifference(el.created_at)}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <div className='flex w-full justify-center py-3'>
        <div className='flex items-center bg-white shadow-md rounded-xl text-gray-600 p-1 gap-1'>
          {page > 1 && <>
            <button onClick={() => navigate()}><KeyboardDoubleArrowLeftOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></button>
            <button onClick={() => navigate(page - 1)}><ChevronLeftOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></button>
          </>}
          {totalPages > 5 ?
            <>
              {[...Array(totalPages - 4 >= page ? 3 : 5)].map((_, i) => {
                if (page >= totalPages - 4) return <button onClick={() => navigate(totalPages - 4 + i)} key={i}><span className={`${totalPages - 4 + i === page ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{totalPages - 4 + i}</span></button>
                else if (page > 1) return <button key={i} onClick={() => navigate(page - 1 + i)}><span className={`${page - 1 + i === page ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{page - 1 + i}</span></button>
                else return <button key={i} onClick={() => navigate(i + 1)}><span className={`${i + 1 === page ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{i + 1}</span></button>
              })}
              {totalPages - 4 >= page &&
                <><p>...</p>
                  <button onClick={() => navigate(totalPages)}><span className={`${totalPages === page ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{totalPages}</span></button></>
              }
            </> :
            [...Array(totalPages)].map((_, i) => {
              return <button onClick={() => navigate(i + 1)} key={i}><span className={`${i + 1 === page ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{i + 1}</span></button>
            })
          }
          {page < totalPages && <>
            <button onClick={() => navigate(page + 1)}><KeyboardArrowRightOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></button>
            <button onClick={() => navigate(totalPages)}><KeyboardDoubleArrowRightOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></button>
          </>}
        </div>
      </div>
    </>
  )
}
