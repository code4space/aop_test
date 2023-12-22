'use client'
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import LoadingUI from "@/components/loading";
import { fetchJobDetails } from "@/store/actions/jobAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Job } from "@/store/reducers/jobReducer";
type paramScheme = {
    params: { jobID: string };
};

export default function Page({ params }: paramScheme) {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch();

    const jobs = useSelector((state: RootState) => state.jobDetails);

    useEffect(() => {
        dispatch(fetchJobDetails(params.jobID));
        setLoading(false)
    }, [])

    function typeFormated(str: string) {
        let words = str.split('-');

        let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

        let result = capitalizedWords.join(' ');

        return result;
    }

    console.log(jobs);


    if (loading) return <LoadingUI />
    if (!jobs.id) return (
        <div className='pt-5 px-10'>
            <div className='w-full border-b border-gray-500 flex gap-2 pb-3'>
                <button className="text-gray-600 hover:text-gray-800" onClick={() => router.back()}><ArrowBackIcon /> Back</button>
            </div>
            <div className='flex flex-col pt-3 w-full'>
                <h1 className="text-3xl font-bold text-slate-800">COMPANY NOT FOUND</h1>
            </div>
        </div>
    );

    const handleLinkClick = () => {
        window.open(jobs.company_url, '_blank');
    };
    return (
        <div className='pt-5 px-10'>
            <div className='w-full border-b border-gray-500 flex gap-2 pb-3'>
                <button className="text-gray-600 hover:text-gray-800" onClick={() => router.back()}><ArrowBackIcon /> Back</button>
            </div>
            <div className='flex flex-col pt-3 w-full'>
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="w-auto md:w-3/4 mt-10 md:mt-0 md:pr-3">
                        <p className="text-sm text-gray-600">{typeFormated(jobs.type)} / {jobs.location}</p>
                        <h1 className="text-3xl font-bold text-slate-800">{jobs.title}</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, nesciunt ipsum consequatur blanditiis nam cupiditate facilis earum id voluptates ullam tempora fugiat ipsa sint optio totam labore placeat. Molestiae rem, sapiente accusamus deleniti corrupti doloribus optio eius sit dolorum libero dolores a alias laborum, accusantium, suscipit consectetur. Alias reiciendis aperiam tenetur, ratione vitae libero saepe sit dolores, nihil sint voluptatum voluptatibus eos esse. Animi tempore nostrum facere ea deserunt eos minus, obcaecati neque saepe, necessitatibus assumenda atque tempora libero velit aliquid repudiandae. Omnis, assumenda id. Assumenda adipisci earum perspiciatis odio aliquam dolorem officiis delectus voluptas explicabo, tenetur laborum atque voluptatum!</p>
                        <h2 className="text-xl font-bold text-slate-800 mt-7">• Job Description</h2>
                        <p>{jobs.description}</p>
                        <h2 className="text-xl font-bold text-slate-800 mt-4">• How to apply</h2>
                        <p>{jobs.how_to_apply}</p>
                    </div>
                    <div className="w-auto md:w-96 h-60 border-2 border-gray-500 flex items-center flex-col ">
                        <h2 className=" text-center bg-gray-900 text-white w-full">Company Name</h2>
                        <img src={jobs.company_logo} alt="company_logo" className=" object-contain w-40" />
                        <p onClick={handleLinkClick} className="cursor-pointer text-blue-500 p-3 underline">{jobs.company_url}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 