import React from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const CategorySidebar = ({toggleCategorySidebar}) => {
  
  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col p-5"
      >
        <div className="flex justify-start items-center mb-5 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCategorySidebar}
            className="text-2xl "
          >
            <ArrowLeft />
          </motion.button>
        </div>
        

       

        <Separator />
        <div className="p-2  cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
          <a href="/mentors">JEE</a>
        </div>
        <Separator />
        <div className="p-2  cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
          <a href="#">NEET</a>
        </div>
        <Separator />
        <div className="p-2  cursor-pointer  hover:translate-x-2 hover:text-green-500 transition-all duration-300">
          <a href="#">CUET</a>
        </div>
        <Separator />

      </motion.div>
    </>
  );
};

export default CategorySidebar;
