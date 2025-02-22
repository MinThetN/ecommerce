'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
    const variants = {
        hidden: {x:0, y: 70, opacity: 0,},
        visible: {x:0, y:-10, opacity: 1, transition:{delay:0.1, duration:1.5}},
    }
    const variants2 = {
        hidden: { x: 0, y: -70, opacity: 0 }, // Start from above the view
        visible: {x: 0, y: 0, opacity: 1, transition: { delay: 0.1, duration: 1.5 }
    },
    }

  return (
    <div className='hero-section'>
        <div className='hero-container'>
            <div className='object-cover'>
                <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={variants2}
                >
                    <Image src='/heroBanner.png' 
                        alt='banner' 
                        width={1024} height={100} />
                </motion.div>
                
            </div>
            <div className='hero-framer'>
                <motion.div 
                    initial='hidden'
                    animate='visible'
                    variants={variants}
                    >
                    <Image src='/hero_airpods.png' 
                        alt='airpods' 
                        width={500} 
                        height={100}  />
                </motion.div>
                
            </div>
        </div>
    </div>
  )
}

export default Hero