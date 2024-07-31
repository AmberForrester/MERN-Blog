export default function About() {

  return (

    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-4xl mx-auto p-3 flex flex-col md:flex-row items-center md:items-start'>
        <div className='md:w-1/2 p-3'>
          <img src='/images/codingJS_2.jpg' alt='Coding' className='w-full h-auto rounded mt-12' />
        </div>
        <div className='md:w-1/2 p-3'>
          <h1 className='text-3xl font font-semibold text-center md:text-left my-7'>
            About Amber&apos;s Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Amber&apos;s Blog! This blog was created as a personal project to share thoughts and ideas with the
              world from the eyes of a Full Stack Developer. Amber is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you will find articles, tutorials, helpful tips, and so much more. Amber is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              Please, we encourage you to leave comments on the posts and engage with other readers. You can like other people&apos;s comments and reply to them as well. We believe that a community of learners can help each other grow and improve!
            </p>

            <p>
              Thank you for being here!
            </p>
           
          </div>
          <h1 className='text-2xl md:text-center italic mt-3'>
            Check back soon to hear more about my journey as a Full Stack Developer!
          </h1> 
        </div>
      </div>
    </div>
  );
}