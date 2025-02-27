'use client'
import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className='w-full bg-gray-100 py-8 mt-auto'>
      <div className='container flex flex-col items-center gap-6'>
        {/* Social Media Icons */}
        <div className='flex gap-6'>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' 
             className='text-2xl text-gray-600 hover:text-gray-900 hover:scale-110 transform transition-all duration-200'>
            <FaFacebookF />
          </a>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'
             className='text-2xl text-gray-600 hover:text-gray-900 hover:scale-110 transform transition-all duration-200'>
            <FaInstagram />
          </a>
          <a href='https://tiktok.com' target='_blank' rel='noopener noreferrer'
             className='text-2xl text-gray-600 hover:text-gray-900 hover:scale-110 transform transition-all duration-200'>
            <FaTiktok />
          </a>
        </div>

        {/* Email Contact */}
        <div className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'>
          <MdEmail className='text-2xl' />
          <a href='mailto:contact@mtnstore.com' className='text-lg'>
            contact@mtnstore.com
          </a>
        </div>

        {/* Copyright */}
        <p className='text-gray-500 text-sm'>
          © {new Date().getFullYear()} MTNstore. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer