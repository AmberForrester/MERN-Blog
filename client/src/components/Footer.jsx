import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from 'react-icons/bs';

// Change Footer to Footer Com to not confuse with Footer from flowbite-react + make appropriate changes in the app.jsx file for connection. 
const FooterCom = () => {

  return (
    <Footer container className='border border-t-2 border-gray '>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>

              <span className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white'>Amber&apos;s</span>
               Blog
              </Link>
          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            
            <div>
              <Footer.Title title='About'/>
              <Footer.LinkGroup col>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'>
                  The Journey
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Follow Me' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/AmberForrester'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href='https://www.linkedin.com/in/amber-forrester-6455a582/'
                  target='_blank'
                  rel='noopener norefferer'>
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Amber's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://github.com/AmberForrester' icon={BsGithub}/>
            <Footer.Icon href='https://www.linkedin.com/in/amber-forrester-6455a582/' icon={BsLinkedin}/>
          </div>
        </div>
      </div>
    </Footer>
  )
};

export default FooterCom;