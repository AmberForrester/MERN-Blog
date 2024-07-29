import { Button } from "flowbite-react";

const CallToAction = () => {

  return (
    
    <div className="flex flex-col sm:flex-row p-3 border justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-white dark:bg-gray-800">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">Checkout these resources with 100 JavaScript Projects</p>

        <Button
          className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline dark:bg-gradient-to-r dark:from-indigo-700 dark:via-blue-500 dark:to-cyan-500'
          href="https://www.100jsprojects.com"
          target="_blank"
          rel="noopener noreferrer"
          outline
        >
          100 JavaScript Projects
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;