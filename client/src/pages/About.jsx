export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
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
          <h1 className='p-8 text-center text-2xl text-white italic'> Check back soon to hear more about my journey as a Full Stack Developer!</h1>
        </div>
      </div>
    </div>
  );
}