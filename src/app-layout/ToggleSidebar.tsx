import { useState } from "react"
import { NavLink } from "react-router";

import { createPortal } from 'react-dom';
import { AdminOnly } from "@/features/auth/AdminOnly";


export const ToogleSidebar = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = () => {
        setOpen(!open)
    }

   return (
        <>
            {/* <button onClick={handleToggle} className="block xl:hidden">toggle</button> */}
            <div 
                className="block xl:hidden cursor-pointer hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] p-2 rounded-full duration-300 ease-out"
                onClick={handleToggle}
            >
                <i className="fi fi-rr-bars-staggered flex text-lg"></i>
            </div>

            {createPortal(
                <div 
                    onClick={handleToggle}
                    className={`fixed left-0 top-0 z-20 w-full h-dvh transition-opacity duration-300
                        backdrop-blur-xs ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
                    }
                >
                     <aside
                         onClick={(e) => e.stopPropagation()} 
                        className={`
                            fixed left-0 top-0 z-50 h-full w-[276px] px-4 py-8
                            bg-[var(--color-background)] border-r border-[var(--color-border)]
                            transform transition-transform duration-230 space-y-8
                            ${open ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >

                        <div className='flex gap-2'>
                            <img src="low-price.png" alt="Logo" width={35}/>
                            <p className='flex items-center font-semibold xl:text-xl'>Expense <span>Tracker</span></p>
                        </div>

                        <ul className="space-y-2">
                            <li>
                                <NavLink to="/" onClick={handleToggle}>
                                    <i className="fi fi-rr-objects-column flex"></i>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/expenses" onClick={handleToggle}>
                                    <i className="fi fi-rs-expense flex"></i>
                                    Expenses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/budgets" onClick={handleToggle}>
                                    <i className="fi fi-rr-piggy-bank-budget flex "></i>
                                    Budgets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/categories" onClick={handleToggle}>
                                    <i className="fi fi-rr-tags flex "></i>
                                    Categories
                                </NavLink>
                            </li>
                            <AdminOnly>
                                <li>
                                    <NavLink to="/users"  onClick={handleToggle}>
                                        <i className="fi fi-rr-users flex "></i>
                                        Users
                                    </NavLink>
                                </li>
                            </AdminOnly>
                        </ul>
                    </aside>
                </div>,
                document.body
            )}
        </>
    );
}