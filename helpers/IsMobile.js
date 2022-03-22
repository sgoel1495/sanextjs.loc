import dynamic from 'next/dynamic'

const IsMobile = dynamic(() => import('./IsMobileComponent'), {ssr: false})

export default IsMobile