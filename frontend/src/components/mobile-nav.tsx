import React, { lazy, Suspense } from 'react'
import { CircleUserRound, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { useSheetStore } from '../hooks/useSheetStore'

const MobileNavLinks = lazy(() => import('./mobile-nav-links'))

const MobileNav: React.FC = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()
    const { isOpen, openSheet, closeSheet } = useSheetStore()

    return (
        <Sheet open={isOpen} onOpenChange={(open) => (open ? openSheet() : closeSheet())}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                    <Menu className="text-primary" />
                </Button>
            </SheetTrigger>
            <SheetContent className='space-y-3'>
                <SheetTitle>
                    {isAuthenticated
                        ? <span className='flex items-center font-bold gap-2'>
                            <CircleUserRound className='text-primary' />
                            {user?.email}
                        </span>
                        : <span>Welcome to cafeking.com</span>
                    }
                </SheetTitle>
                <Separator />
                <SheetDescription className='flex flex-col gap-4'>
                    {isAuthenticated
                        ? (
                            <Suspense fallback={<div>Loading...</div>}>
                                <MobileNavLinks />
                            </Suspense>
                        )
                        : <Button onClick={() => {
                            loginWithRedirect()
                            closeSheet()
                        }} className='flex-1 font-bold'>
                            Login
                        </Button>
                    }
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav