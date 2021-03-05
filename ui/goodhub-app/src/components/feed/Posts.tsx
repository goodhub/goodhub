import { FC } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa'
import Picture from '../generic/Picture';

export interface PostsProps { }

const Posts: FC<PostsProps> = () => {
  return <div className="flex flex-col flex-grow">
    <div className="bg-gray-100 border border-gray-200 px-6 py-2 mb-3 flex items-center">
      <h2 className="font-semibold text-gray-700">Popular</h2>
    </div>

    <div className="bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col overflow-hidden my-3">
      <Picture image={
        {
          "id": "8d484531-74ee-4e6c-88bb-ba4b96bea29d",
          "alt": "A child holding the photographer's hand in black and white",
          "ratio": 1.498371335504886,
          "original": "https://goodhubdevstorage.blob.core.windows.net/images/8d484531-74ee-4e6c-88bb-ba4b96bea29d-original",
          "standard": "https://goodhubdevstorage.blob.core.windows.net/images/8d484531-74ee-4e6c-88bb-ba4b96bea29d-standard",
          "thumbnail": "https://goodhubdevstorage.blob.core.windows.net/images/8d484531-74ee-4e6c-88bb-ba4b96bea29d-thumbnail",
          "placeholder": {
            "backgroundImage": "linear-gradient(90deg, rgb(26,26,26) 10%,rgb(28,28,28) 10% 20%,rgb(58,58,58) 20% 30%,rgb(36,36,36) 30% 40%,rgb(37,37,37) 40% 50%,rgb(73,73,73) 50% 60%,rgb(83,83,83) 60% 70%,rgb(150,150,150) 70% 80%,rgb(160,160,160) 80% 90%,rgb(98,98,98) 90% 100%),linear-gradient(90deg, rgb(44,44,44) 10%,rgb(28,28,28) 10% 20%,rgb(28,28,28) 20% 30%,rgb(53,53,53) 30% 40%,rgb(109,109,109) 40% 50%,rgb(100,100,100) 50% 60%,rgb(144,144,144) 60% 70%,rgb(170,170,170) 70% 80%,rgb(114,114,114) 80% 90%,rgb(27,27,27) 90% 100%),linear-gradient(90deg, rgb(25,25,25) 10%,rgb(54,54,54) 10% 20%,rgb(30,30,30) 20% 30%,rgb(105,105,105) 30% 40%,rgb(114,114,114) 40% 50%,rgb(78,78,78) 50% 60%,rgb(133,133,133) 60% 70%,rgb(151,151,151) 70% 80%,rgb(80,80,80) 80% 90%,rgb(20,20,20) 90% 100%),linear-gradient(90deg, rgb(37,37,37) 10%,rgb(60,60,60) 10% 20%,rgb(61,61,61) 20% 30%,rgb(131,131,131) 30% 40%,rgb(117,117,117) 40% 50%,rgb(80,80,80) 50% 60%,rgb(82,82,82) 60% 70%,rgb(80,80,80) 70% 80%,rgb(51,51,51) 80% 90%,rgb(17,17,17) 90% 100%),linear-gradient(90deg, rgb(37,37,37) 10%,rgb(38,38,38) 10% 20%,rgb(99,99,99) 20% 30%,rgb(166,166,166) 30% 40%,rgb(143,143,143) 40% 50%,rgb(84,84,84) 50% 60%,rgb(98,98,98) 60% 70%,rgb(59,59,59) 70% 80%,rgb(37,37,37) 80% 90%,rgb(24,24,24) 90% 100%),linear-gradient(90deg, rgb(44,44,44) 10%,rgb(90,90,90) 10% 20%,rgb(149,149,149) 20% 30%,rgb(175,175,175) 30% 40%,rgb(164,164,164) 40% 50%,rgb(120,120,120) 50% 60%,rgb(110,110,110) 60% 70%,rgb(99,99,99) 70% 80%,rgb(62,62,62) 80% 90%,rgb(28,28,28) 90% 100%),linear-gradient(90deg, rgb(73,73,73) 10%,rgb(133,133,133) 10% 20%,rgb(167,167,167) 20% 30%,rgb(167,167,167) 30% 40%,rgb(161,161,161) 40% 50%,rgb(132,132,132) 50% 60%,rgb(123,123,123) 60% 70%,rgb(101,101,101) 70% 80%,rgb(81,81,81) 80% 90%,rgb(45,45,45) 90% 100%)",
            "backgroundPosition": "0 0 ,0 16.666666666666664%,0 33.33333333333333%,0 50%,0 66.66666666666666%,0 83.33333333333334%,0 100%",
            "backgroundSize": "100% 14.285714285714286%",
            "backgroundRepeat": "no-repeat"
          }
        }
      }></Picture>
      <div className="p-6 pb-3 sm:p-6">
        {/* Content */}
        <h1 className="font-semibold text-xl mb-2">Title of post</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque vulputate sapien nulla mauris arcu. Cursus quis tincidunt vestibulum est leo aliquam sed cursus facilisis. Sapien libero, amet tempus sed enim amet, facilisis viverra malesuada.</p>
        <div className="pt-4 mt-5 border-t border-gray-200 flex flex-col items-start sm:items-center justify-between sm:flex-row">
          {/* Author, metadata + buttons */}
          <div className="flex items-center">
            <div className="w-10 h-10 border border-gray-200 rounded-full mr-3"></div>
            <div className="flex flex-col justify-center leading-5">
              <div className="flex items-center">
                <p className="text-gray-800 mr-1">James Williams</p>
                <p className="text-gray-500 text-sm">• 5 hours ago</p>
              </div>
              <p className="text-gray-700 text-sm">On behalf of <span className="font-medium">James’ Biscuit Trust</span></p>
            </div>
          </div>
          <div className="flex w-full sm:w-auto items-center mt-4 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-none border-gray-200">
            <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 sm:mr-1 py-2 px-3">
              <AiOutlineLike className="w-6 h-6 mr-1" />101
            </button>
            <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 py-2 px-3">
              <FaRegCommentAlt className="w-5 h-5 mt-0.5 mr-2" />15
            </button>
          </div>
        </div>
      </div>
    </div>


    <div className="bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col overflow-hidden my-3">
      <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-200">
        {/* Origin and dismissal banner */}
        <p className="text-gray-900 text-sm mr-1">
          You’re seeing this post because it’s about <span className="font-medium">Education</span>
        </p>
      </div>
      <div className="p-6 pb-3 sm:p-6">
        {/* Content */}
        <h1 className="font-semibold text-xl mb-2">Title of post</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque vulputate sapien nulla mauris arcu. Cursus quis tincidunt vestibulum est leo aliquam sed cursus facilisis. Sapien libero, amet tempus sed enim amet, facilisis viverra malesuada.</p>
        <div className="pt-4 mt-5 border-t border-gray-200 flex flex-col items-start sm:items-center justify-between sm:flex-row">
          {/* Author, metadata + buttons */}
          <div className="flex items-center">
            <div className="w-10 h-10 border border-gray-200 rounded-full mr-3"></div>
            <div className="flex flex-col justify-center leading-5">
              <div className="flex items-center">
                <p className="text-gray-800 mr-1">James Williams</p>
                <p className="text-gray-500 text-sm">• 5 hours ago</p>
              </div>
              <p className="text-gray-700 text-sm">On behalf of <span className="font-medium">James’ Biscuit Trust</span></p>
            </div>
          </div>
          <div className="flex w-full sm:w-auto items-center mt-4 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-none border-gray-200">
            <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 sm:mr-1 py-2 px-3">
              <AiOutlineLike className="w-6 h-6 mr-1" />101
            </button>
            <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 py-2 px-3">
              <FaRegCommentAlt className="w-5 h-5 mt-0.5 mr-2" />15
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-sm border border-gray-200 rounded-lg flex flex-col overflow-hidden my-3">
      <div className="p-6 pb-3 sm:p-6">
        {/* Content */}
        <h1 className="font-semibold text-xl mb-2">Title of post</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque vulputate sapien nulla mauris arcu. Cursus quis tincidunt vestibulum est leo aliquam sed cursus facilisis. Sapien libero, amet tempus sed enim amet, facilisis viverra malesuada.</p>
        <div className="pt-4 mt-5 border-t border-gray-200 flex flex-col items-start sm:items-center justify-between sm:flex-row">
          {/* Author, metadata + buttons */}
          <div className="flex items-center">
            <div className="w-10 h-10 border border-gray-200 rounded-lg mr-3"></div>
            <div className="flex flex-col justify-center leading-5">
              <div className="flex items-center">
                <p className="text-gray-800 mr-1">James’ Biscuit Trust</p>
                <p className="text-gray-500 text-sm">• 7 hours ago</p>
              </div>
            </div>
          </div>
          <div className="flex w-full sm:w-auto items-center mt-4 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-none border-gray-200">
            <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 sm:mr-1 py-2 px-3">
              <AiOutlineLike className="w-6 h-6 mr-1" />14
            </button>
            <button className="flex flex-1 items-center justify-center font-semibold text-sm text-gray-800 sm:rounded-lg hover:bg-gray-100 py-2 px-3">
              <FaRegCommentAlt className="w-5 h-5 mt-0.5 mr-2" />2
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>;
}

export default Posts;