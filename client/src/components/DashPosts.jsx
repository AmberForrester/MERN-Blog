import { Table, Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  
  console.log(userPosts);



  useEffect(() => {
    
    const fetchPosts = async () => {

      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();

        console.log(data.posts.length);

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);


  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleDeletePost = async (req, res, next) => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      next(error);
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto md:mx-auto p-8'>

      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>

          {userPosts.map((post) => (
                <Table.Body className="divide-y" key={post._id}>
                  <Table.Row className="bg-white dark:border-gray-700  dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <Link
                        to={`/post/${post.slug}`}
                        className="fond-medium text-gray-900 dark:text-white"
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>

                    <Table.Cell>{post.category}</Table.Cell>

                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`}>
                        <span className="text-cyan-500 hover:underline cursor-pointer">
                          Edit
                        </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
        </Table>

        {showMore && (
              <button
                className="w-full text-teal-500 self-center text-sm py-7"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
        </>
      ) : ( 
        <p>You have not created any posts yet.</p>
      )}
      
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I am sure.
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, please cancel deletion.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default DashPosts;