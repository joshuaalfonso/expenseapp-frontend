// components/ThemeToaster.tsx

import { useTheme } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/sonner' // or wherever Toaster is imported from

export const ThemeToaster = () => {
  const { theme } = useTheme();

  return <Toaster richColors theme={theme} position="top-center"/>
}
