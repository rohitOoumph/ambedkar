'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, ContactShadows, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Preload the model for better performance
useGLTF.preload('/images/ambedkar-model.glb')

function AmbedkarModel() {
  // Load the 3D model
  const { scene } = useGLTF('/images/ambedkar-model.glb')
  const { viewport, size } = useThree()
  const scaleRef = useRef<number>(1)
  const positionRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
  
  // Calculate bounding box and scale to fill canvas height - only once
  useEffect(() => {
    if (scaleRef.current === 1) {
      const box = new THREE.Box3().setFromObject(scene)
      const modelSize = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      // Scale to fill 85% of viewport height to prevent cutting
      const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z)
      const targetHeight = viewport.height * 0.85
      const calculatedScale = targetHeight / maxDim
      
      scaleRef.current = calculatedScale
      scene.scale.setScalar(calculatedScale)
      
      // Center the model vertically with slight offset upward to prevent bottom cutoff
      const scaledCenter = center.multiplyScalar(calculatedScale)
      positionRef.current.set(
        -scaledCenter.x,
        -scaledCenter.y + (viewport.height * 0.05), // Slight upward offset
        -scaledCenter.z
      )
      scene.position.copy(positionRef.current)
    }
  }, [scene, viewport.height])
  
  return (
    <primitive 
      object={scene} 
      rotation={[0, 0, 0]}
    />
  )
}

export default function Hero3D() {
  return (
    <div className="relative min-h-screen h-screen w-full bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content Container - Side by Side Layout */}
      <div className="relative h-full w-full flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-3 lg:py-0">

        {/* Left Side - 3D Model */}
        <div className="relative w-full md:w-1/2 h-[400px] sm:h-[500px] max-h-[500px] md:h-full flex items-center justify-center z-10 mb-4 md:mb-0 order-1 md:order-1">
          <div className="w-full h-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <Canvas
              style={{ width: '100%', height: '100%', display: 'block' }}
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.2} />
                <pointLight position={[-10, -10, -10]} intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />

                <AmbedkarModel />
                <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2} />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className="relative w-full md:w-[75%] h-auto md:h-full flex flex-col items-center md:items-start justify-center z-10 px-2 sm:px-4 md:px-6 lg:px-12 order-2 md:order-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full text-center md:text-left"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-lora font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight md:whitespace-nowrap">
              Dr. B.R. Ambedkar
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              1891 - 1956
            </p>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-md sm:max-w-lg mx-auto md:mx-0 italic mb-4 sm:mb-6 md:mb-8 lg:mb-12 leading-relaxed px-2 sm:px-0">
              "I measure the progress of a community by the degree of progress which women have achieved."
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex justify-center md:justify-start w-full sm:w-auto"
            >
              <a href="#explore" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                  Begin the Journey
                </button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

