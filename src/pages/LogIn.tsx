
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { useLogin } from '@/features/auth/useLogin';
import { ModeToggle } from '@/ui/ModeToggle';
import { Loader2Icon, ShieldAlertIcon } from 'lucide-react';

export const LogIn = () => {

   const { login, error, loading } = useLogin();

    return (
        <>
            <div className='min-h-screen w-full px-4'>

                <header className='flex items-center justify-between max-w-7xl mx-auto h-[50px]'>
                    <div className='flex gap-2'>
                        <img src="low-price.png" alt="Logo" className="w-[30px] xl:w-[32px]"/>
                        <p className='flex items-center font-semibold text-sm xl:text-base'>Expense <span>Tracker</span></p>
                    </div>

                    <ModeToggle />
                </header>

                <section className='max-w-7xl mx-auto text-center mt-20'>

                    <div className='space-y-6'>
                        <h1 className='text-3xl xl:text-4xl font-bold'>Take Control of Your <span className='text-[var(--color-primary)]'>Finances</span></h1>
                        <p className='opacity-60 max-w-xl mx-auto text-sm md:text-base'>
                            Track expenses, set budgets, and achieve your financial goals with expense tracker app. 
                            Get insights that help you make smarter money decisions.
                        </p>
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
                    </div>

                    {error && (
                        <Alert variant='destructive'>
                            <ShieldAlertIcon />
                            <AlertTitle>
                                {error}
                            </AlertTitle>
                        </Alert>
                    )}


                    {/* <div className='bg-[var(--color-primary)]/3  mt-20 p-4'>
                        
                    </div> */}

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