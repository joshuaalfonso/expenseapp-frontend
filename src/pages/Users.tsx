import { LoadingSpinner } from "@/components/LoadingSpinner"
import { fetchUsers } from "@/services/apiUsers"
import { useQuery } from "@tanstack/react-query"




export const Users = () => {


    const {data: users, isPending, error} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    if (isPending) {
        return <LoadingSpinner />
    }

    if (error) {
        return <span>{error.message || 'Unable to fetch users'}</span>
    }


    return (
        <>
            <h1 className="text-xl font-semibold mb-10">Users</h1>

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">

                {users?.map((item) => (
                    <div className="flex flex-col items-center justify-center gap-4 border border-[var(--color-border)] p-4 rounded-[var(--radius-sm)] w-full">
                        <img 
                            className="rounded-full"
                            src={item.picture} 
                            width={50}
                        />
                        <span className="text-xl">{item.name}</span>
                        <small className="opacity-60">{item.email}</small>
                    </div>
                ))}

           </div>
           
        </>
    )
}