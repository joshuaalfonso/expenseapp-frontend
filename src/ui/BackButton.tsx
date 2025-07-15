import { useNavigate } from "react-router";





export const BackButton = () => {

    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(-1)} className="group flex items-center gap-2 mb-4 cursor-pointer opacity-60">
            <i className="fi fi-rr-arrow-left grid group-hover:-translate-x-1  duration-200 ease-in-out"></i> 
            <small>Back</small>
        </span>
    )
}