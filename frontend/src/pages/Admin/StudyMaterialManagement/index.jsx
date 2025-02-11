import React, { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { fetchStudyMaterials } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

// Lazy-loaded components for code splitting
const JeeMaterial = lazy(() =>
  import("@/pages/Admin/StudyMaterialManagement/JeeMaterial")
);
const NeetMaterial = lazy(() =>
  import("@/pages/Admin/StudyMaterialManagement/NeetMaterial")
); // Replace with the correct path
const CuetMaterial = lazy(() =>
  import("@/pages/Admin/StudyMaterialManagement/CuetMaterial")
); // Replace with the correct path
const AddStudyMaterial = lazy(() =>
  import("@/pages/Admin/StudyMaterialManagement/AddStudyMaterial")
); // Replace with the correct path

const StudyMaterialSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  // const { studyMaterials, error } = useStudyMaterial();

  const {
    data: studyMaterials,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studyMaterials"],
    queryFn: fetchStudyMaterials,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  if (isLoading) {
    return <div>...loading</div>;
  }

  console.log(studyMaterials);

  const jeeStudyMaterial = studyMaterials.filter(
    (material) => material.category === "jee"
  );
  const neetStudyMaterial = studyMaterials.filter(
    (material) => material.category === "neet"
  );
  const cuetStudyMaterial = studyMaterials.filter(
    (material) => material.category === "cuet"
  );

  // console.log(jeeStudyMaterial,neetStudyMaterial,cuetStudyMaterial)
  // Tab names and corresponding lazy-loaded components
  const tabs = [
    {
      label: "JEE",
      component: (
        <JeeMaterial jeeStudyMaterial={jeeStudyMaterial} error={isError} />
      ),
    },
    {
      label: "NEET",
      component: (
        <NeetMaterial neetStudyMaterial={neetStudyMaterial} error={isError} />
      ),
    },
    {
      label: "CUET",
      component: (
        <CuetMaterial cuetStudyMaterial={cuetStudyMaterial} error={isError} />
      ),
    },
    { label: "Add Material", component: <AddStudyMaterial /> },
  ];

  return (
    <section className="mx-auto p-4">
      {/* Tabs Container */}
      <motion.div
        className="flex border-b-2"
        style={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "#e5e7eb", // gray-200
          },
        }}
      >
        {tabs.map((tab, index) => (
          <div key={tab.label} className="relative">
            <button
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-300 ${
                activeTab === index
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
            {activeTab === index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                layoutId="activeTab"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Content Section */}
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4">
            <Suspense
              fallback={
                <div className="text-center text-gray-500">Loading...</div>
              }
            >
              {tabs[activeTab].component}
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudyMaterialSection;
