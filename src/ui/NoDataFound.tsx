
import noData from '../assets/no-data.png';



export const NoDataFound = () => {
    return (
        <div className="px-3 py-6  grid place-items-center rounded-md">
            <div>
                <img src={noData} alt="no-data" width={200} />
                <p className="text-center text-sm opacity-60">No data found</p>
            </div>
        </div>
    )
}