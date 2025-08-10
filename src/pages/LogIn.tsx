
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/useLogin';
import { ModeToggle } from '@/ui/ModeToggle';
import { Loader2Icon, ShieldAlertIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import finance from '../assets/finance.png';

export const LogIn = () => {

   const { login, error, loading } = useLogin();

    return (
        <>
            <section className=' w-full px-4'>

                <header className='flex items-center justify-between max-w-7xl mx-auto h-[50px]'>
                    <div className='flex gap-2'>
                        <img src="low-price.png" alt="Logo" className="w-[30px] xl:w-[32px]"/>
                        <p className='flex items-center font-semibold text-sm xl:text-base'>Expense <span>Tracker</span></p>
                    </div>

                    <ModeToggle />
                </header>

                <div className='max-w-7xl mx-auto text-center mt-20'>

                    <div className='space-y-6'>
                        <motion.h1 
                            className='text-3xl xl:text-4xl font-bold'
                            // initial={{ opacity: 0, y: 20 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Take Control of Your <span className='text-[var(--color-primary)]'>Finances</span>
                        </motion.h1>
                        <motion.div 
                            // initial={{ opacity: 0, y: 20 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <p className='opacity-80 max-w-xl mx-auto text-sm md:text-base'>

                            Track expenses, set budgets, and achieve your financial goals with expense tracker app. 
                            Get insights that help you make smarter money decisions.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            // initial={{ opacity: 0, y: 20 }}
                            // animate={{ opacity: 1, y: 0 }}
                            // transition={{ duration: 0.6, delay: 0.4 }}
                        >
                             <Button 
                                variant="secondary"
                                onClick={() => login()}
                                disabled={loading}
                            >
                                { loading ?? 
                                    <Loader2Icon className='animate-spin'/> 
                                }
                                <img src='google.png' width={18}/>
                                    Get Started with Google
                            </Button>
                        </motion.div>
                    </div>

                    {error && (
                        <Alert variant='destructive'>
                            <ShieldAlertIcon />
                            <AlertTitle>
                                {error}
                            </AlertTitle>
                        </Alert>
                    )}

                    {/* bg-[var(--color-primary)]/3 */}
                    <motion.div 
                        className='mt-5 px-4 flex justify-center items-center'
                        // initial={{ opacity: 0, y: 20 }}
                        // animate={{ opacity: 1, y: 0 }}
                        // transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <img src={finance} alt='logo' className='w-70 xl:w-100 '/>
                    </motion.div>

                </div>


                {/* <div className="max-w-7xl mx-auto bg-blue-100">
                    {error && (
                        <Alert variant='destructive'>
                            <ShieldAlertIcon />
                            <AlertTitle>
                                {error}
                            </AlertTitle>
                        </Alert>
                    )}
                     <Button 
                        variant="secondary"
                        onClick={() => login()}
                        disabled={loading}
                    >
                        { loading ? 
                            <Loader2Icon className='animate-spin'/> : 
                            <img src='google.png' width={18}/>
                        }
                            Sign in with Google 
                    </Button>
                </div> */}
            </section>

            <section className='px-4 my-30 max-w-7xl mx-auto'>

                <div className='space-y-3 text-center'>
                    <h1 className='text-2xl xl:text-3xl font-semibold'>What You Need To Know</h1>
                    <p className='opacity-80 text-sm xl:text-base'>Designed to make expense tracking simple, insightful, and effective</p>
                </div>

                <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mt-15 gap-5'>

                    <div className='space-y-5 border border-[var(--color-border)] p-5 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl xl:text-2xl'>📊</span> 
                            <h1 className='font-semibold text-base xl:text-xl'>Financial Insights</h1> 
                        </div>
                        <p className='opacity-80 text-sm xl:text-base'>
                            Get instant insights with total expenses, monthly averages, and interactive charts showing your spending patterns throughout the year.
                        </p>
                    </div>

                    <div className='space-y-5 border border-[var(--color-border)] p-5 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl xl:text-2xl'>💸</span> 
                            <h1 className='font-semibold text-base xl:text-xl'>Easy Expense Entry</h1> 
                        </div>
                        <p className='opacity-80 text-sm xl:text-base'>
                            Add expenses quickly with our emoji integrated interface. Categorize spending with fun icons and never miss a transaction.
                        </p>
                    </div>

                    <div className='space-y-5 border border-[var(--color-border)] p-5 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl xl:text-2xl'>🎯</span> 
                            <h1 className='font-semibold text-base xl:text-xl'>Budget Management</h1> 
                        </div>
                        <p className='opacity-80 text-sm xl:text-base'>
                            Create and track budgets by grouping expenses. Set limits, monitor progress, and stay on top of your financial goals.
                        </p>
                    </div>

                    <div className='space-y-5 border border-[var(--color-border)] p-5 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl xl:text-2xl'>📱</span> 
                            <h1 className='font-semibold text-base xl:text-xl'>Fully Responsive</h1> 
                        </div>
                        <p className='opacity-80 text-sm xl:text-base'>
                            Access your finances anywhere. Our app works seamlessly across mobile phones, tablets, and desktop computers.
                        </p>
                    </div>

                </div>

            </section>
        </>
    )

}