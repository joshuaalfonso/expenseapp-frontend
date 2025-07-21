
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { useLogin } from '@/features/auth/useLogin';
import { ModeToggle } from '@/ui/ModeToggle';
import { Loader2Icon, ShieldAlertIcon } from 'lucide-react';
import { motion } from 'framer-motion';
// import questions from '../assets/questions.png';
import finance from '../assets/finance.png';

export const LogIn = () => {

   const { login, error, loading } = useLogin();

    return (
        <>
            <div className='min-dvh w-full px-4'>

                <header className='flex items-center justify-between max-w-7xl mx-auto h-[50px]'>
                    <div className='flex gap-2'>
                        <img src="low-price.png" alt="Logo" className="w-[30px] xl:w-[32px]"/>
                        <p className='flex items-center font-semibold text-sm xl:text-base'>Expense <span>Tracker</span></p>
                    </div>

                    <ModeToggle />
                </header>

                <section className='max-w-7xl mx-auto text-center mt-20'>

                    <div className='space-y-6'>
                        <motion.h1 
                            className='text-3xl xl:text-4xl font-bold'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Take Control of Your <span className='text-[var(--color-primary)]'>Finances</span>
                        </motion.h1>
                        <motion.p 
                            className='opacity-60 max-w-xl mx-auto text-sm md:text-base'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Track expenses, set budgets, and achieve your financial goals with expense tracker app. 
                            Get insights that help you make smarter money decisions.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <img src={finance} alt='logo' className='w-70 xl:w-100 '/>
                    </motion.div>

                </section>



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
            </div>
        </>
    )

}