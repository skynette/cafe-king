import { Loader2 } from 'lucide-react'
import { Button } from './ui/button'

const LoadingButton = () => {
    return (
        <Button disabled>
            <Loader2 className='h-4 w-4 animate-spin' />
            Loading
        </Button>
    )
}

export default LoadingButton